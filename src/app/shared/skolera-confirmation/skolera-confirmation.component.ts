import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-skolera-confirmation',
    templateUrl: './skolera-confirmation.component.html',
    styleUrls: ['./skolera-confirmation.component.scss']
})
export class SkoleraConfirmationComponent implements OnInit {

    ngOnInit() {
    }
    closeModal(actionCallback) {
        this.dialogRef.close(actionCallback);
    }
    constructor(
        public dialogRef: MatDialogRef<SkoleraConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
