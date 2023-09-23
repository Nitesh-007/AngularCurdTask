import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {
  addUserForm!: FormGroup;
  isEdit = false;
  user: any;
  actionbtn:string="save"

  constructor(private formBuilder: FormBuilder, private DilogRef: MatDialogRef<AddUserFormComponent>, private userDataService: UserDataService, @Inject(MAT_DIALOG_DATA) private data: any) {
    
   }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({

      name: ["", [Validators.required, Validators.maxLength(32)]],

      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[A-Za-z0-9.]{2,}@[a-zA-Z]{3,}[.]{1}[com, in, org]{2,3}$"
          ),
        ],
      ],
      mobileNo: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],


    });


    console.log(this.data);


    if (this.data) {
      this.actionbtn="Update";
      this.addUserForm.patchValue({
        // Populate the form controls with existing user data
        name: this.data.name,
        email: this.data.email,
        mobileNo: this.data.mobileNo,
      });
    }
  }

  addUser(){

    if(!this.data){
      const userData = this.addUserForm.value;
      const currentData = this.userDataService.getUserData();

      // Add the new user data to the existing data array
      currentData.push(userData);

      // Store the updated data in localStorage
      localStorage.setItem('usersData', JSON.stringify(currentData));

      // Update the user data in the UserDataService
      this.userDataService.updateUserData(currentData);
      this.addUserForm.reset();

      this.DilogRef.close("save");

    }else{

      this.updateUser()

    }
   


    
  }





  updateUser() {
    const updatedUserData = this.addUserForm.value;
    const currentData = this.userDataService.getUserData();

    

    // Find the index of the user based on user email
    const index = currentData.findIndex((user) => user.email === this.data.email);

    if (index !== -1) {
      currentData[index].name = updatedUserData.name;
      currentData[index].email = updatedUserData.email;
      currentData[index].mobileNo = updatedUserData.mobileNo;

      // Update the user data in localStorage
      localStorage.setItem('usersData', JSON.stringify(currentData));

      // Update the user data in UserDataService
      this.userDataService.updateUserData(currentData);

      this.addUserForm.reset();
      this.DilogRef.close('Update');
    }
  }




  


  
  public allowAlphabetsAndSpaces(event: any) {
    let inputValue = event.keyCode;
    console.log(inputValue);

    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0) || (inputValue >= 91 && inputValue <= 96)) {
      event.preventDefault();
    }
  }
  get formControl() {
    return this.addUserForm.controls;
  }

}
