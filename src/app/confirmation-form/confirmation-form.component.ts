import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrls: ['./confirmation-form.component.css']
})
export class ConfirmationFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userDataService: UserDataService, private dialogRef: MatDialogRef<ConfirmationFormComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  deleteUser(): void {
    if (this.data) {
      this.userDataService.deleteUser(this.data); // Pass the entire user object for deletion
      this.dialogRef.close(true); // Close the dialog with a true value to indicate successful deletion
    }
  }




}
