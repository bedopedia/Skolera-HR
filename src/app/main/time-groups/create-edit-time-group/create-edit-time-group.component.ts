import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-create-edit-time-group',
  templateUrl: './create-edit-time-group.component.html',
  styleUrls: ['./create-edit-time-group.component.scss']
})
export class CreateEditTimeGroupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal(language: any) {
    this.dialogRef.close(language);
  }

}
