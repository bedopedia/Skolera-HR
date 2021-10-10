import { Component, Injectable, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable()
@Component({
    selector: 'skolera-confirmation',
    templateUrl: './skolera-confirmation.component.html',
    styleUrls: ['./skolera-confirmation.component.scss']
})

export class SkoleraConfirmationComponent implements OnInit {
    ngOnInit() {
    }
    ngOnDestroy() {

    }
    closeModal(actionCallback?: string){
        this.dialogRef.close(actionCallback);
    }
    constructor(
        public dialogRef: MatDialogRef<SkoleraConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        ) {}
}
