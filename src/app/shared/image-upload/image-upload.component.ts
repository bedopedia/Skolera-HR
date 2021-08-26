import { Component, Injectable, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Injectable()
@Component({
    selector: 'image-upload',
    template: `
        <div class="skolera-image-upload-container" [class.force-overlay]="!(transformedSrc || imageSrc)">
            <div class="remove-image" (click)="removeImage()" *ngIf="transformedSrc || imageSrc">
                <i class="fa fa-trash-o"></i>
            </div>
            <input accept="image/x-png,image/gif,image/jpeg" type="file" (change)="showFile($event)" />
            <img *ngIf="transformedSrc || imageSrc" [src]="transformedSrc || imageSrc" />
            <div class="upload-overlay ptb-2 plr-2 flex flex-center flex-middle">
            <div class="text-center">
                 <img class="upload-icon mb-2" src="assets/images/upload-image.svg">
                 <div class="weight-bold text-link size-small"> Upload image </div>
            </div>
            </div>
        </div>
    `,
    styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit {
    @Input() imageSrc;
    @Output() imageRemove: EventEmitter<any> = new EventEmitter();
    @Output() imageChange: EventEmitter<any> = new EventEmitter();
    transformedSrc;
    validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    ngOnInit() {

    }
    showFile(event) {
        if (event.target.files && event.target.files[0] && this.validImageTypes.includes(event.target.files[0].type)) {
            let reader = new FileReader();
            reader.onload = e => this.transformedSrc = reader.result;
            reader.readAsDataURL(event.target.files[0]);
            this.imageChange.emit(event.target.files[0]);
        }
    }
    removeImage(){
        this.transformedSrc = '';
        this.imageSrc = '';
        this.imageRemove.emit();
    }
    ngOnDestroy() {

    }
    constructor(
    ) { }
}

