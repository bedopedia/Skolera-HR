import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-skolera-edit',
    templateUrl: './skolera-edit.component.html',
    styleUrls: ['./skolera-edit.component.scss']
})
export class SkoleraEditComponent implements OnInit {

    editInput = '';
    ngOnInit() {
        this.editInput = this.data.editInput;
    }
    closeModal(actionCallback) {
        if(actionCallback == null) this.dialogRef.close(null);
        this.dialogRef.close(this.editInput);
    }
    constructor(
        public dialogRef: MatDialogRef<SkoleraEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

}
