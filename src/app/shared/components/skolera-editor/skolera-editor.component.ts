import { Component, Injectable, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Globals } from '@core/globals';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UploadFilesWithPreSignedUrlService } from '@skolera/services/upload_files_with_presigned_Url.service';
import { Router } from '@angular/router';
declare var tinyMCE: any;
@Injectable({
    providedIn: 'root'
})

@Component({
    selector: 'skolera-editor',
    template: `
        <tinymce *ngIf="editorInitiated" [(ngModel)]="model" [config]="config"></tinymce>
    `,
    styleUrls: ['./skolera-editor.component.scss'],
})

export class SkoleraEditorComponent implements OnInit {
    editorInitiated = false;
    editorLang = 'en';
    courseId;
    @Input() model = null;
    @Input() id: string;
    @Input() editorId;
    @Output() modelChange = new EventEmitter();
    @Input() editorType: string = 'complex';
    editor: any = {};
    enableWiris;
    config: any = {
        skin: 'lightgray/',
        document_base_url: "",
        branding: false,
        resize: false,
        Words: false,
        menubar: false,
        min_height: 150,
        menu: {},
        media_alt_source: false,
        statusbar: false,
        theme_advanced_toolbar_align: "right",
        language: this.editorLang,
        media_dimensions: false,
        rtl_ui: false,
        browser_spellcheck: true,
        plugins: ['lists media image link paste table directionality charmap textcolor preview fullscreen', 'autolink', 'tiny_mce_wiris'],
        paste_as_text: true,
        inline_styles: false,
        extended_valid_elements : "a[href|target=_blank]",
        /* without images_upload_url set, Upload tab won't show up*/
        images_upload_url: `${baseUrl}api/uploaded_files/upload_public`,

        /* we override default upload handler to simulate successful upload*/
        images_upload_handler: (blobInfo, success, failure) => {
            let formData = new FormData();
            formData.append('file', blobInfo.blob());
            let file = blobInfo.blob();
            this.uploadFilesWithPreSignedUrlService.getPreSignedUrl({
                presigned_url: {
                    model_name: 'Public',
                    file_name: file.name
                }
            }).subscribe(
                (presignedUrlResponse: any) => {
                    this.uploadFilesWithPreSignedUrlService.putFileToS3(file, presignedUrlResponse.presigned_url).subscribe(
                        (s3Response: any) => {
                            success(presignedUrlResponse.public_url);
                        }, error => {
                            failure(error)
                        }
                    );
                }, error => {
                    failure(error)
                }
            )
        },
        toolbar: 'visualchars| advlist |mobileequationeditor|equationeditor| undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor | a11ycheck ltr rtl | table',
        setup: editor => {
            editor.on('keyup, ExecCommand, blur, focusout', () => {
                this.modelChange.emit(this.model);
            })
        }
    }
    ngOnInit() {
        if (this.editorType == 'simple') {
            this.config.toolbar = 'ltr rtl | image | alignleft aligncenter alignright alignjustify  | fullscreen';
        }
        this.AddWirisPlugin();
        this.globals.updateUserLanguage.subscribe(
            lang => {
                this.config.language = lang;
                this.updateEditorLanguage();
            }
        )
    }
    resetEditor() { }
    constructor(
        public globals: Globals,
        private http: HttpClient,
        private uploadFilesWithPreSignedUrlService: UploadFilesWithPreSignedUrlService,
        private router: Router
    ) {
        this.editorLang = this.globals.currentUser.locale;
        this.config.language = this.editorLang;
        this.updateEditorLanguage();
        if (this.router.url.includes('courses')) {
            const urlParts = this.router.url.split('/');
            this.courseId = urlParts[urlParts.findIndex(x => x == "courses") + 1];
        }
    }
    updateEditorLanguage() {
        this.editorInitiated = false;
        setTimeout(() => {
            this.editorInitiated = true;
        }, 500);
    }
    AddWirisPlugin() {
        this.globals.enabledWirisCourse.subscribe(params => {
            const allowedActor = (!['hod', 'parent'].includes(this.globals.currentUser.user_type));
            if (params.enabledWiris && allowedActor && this.courseId) {
                if(!this.config.toolbar.includes('tiny_mce_wiris_formulaEditor,tiny_mce_wiris_formulaEditorChemistry')) {
                    this.config.toolbar = (this.editorType == 'simple' ? 'tiny_mce_wiris_formulaEditor,tiny_mce_wiris_formulaEditorChemistry | ' :
                    'tiny_mce_wiris_formulaEditor,tiny_mce_wiris_formulaEditorChemistry  | ') + this.config.toolbar;
                     this.updateEditorLanguage();
                }
              
            }
        });
    }
}
