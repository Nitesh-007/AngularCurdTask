import { Component, ViewChild, OnInit } from '@angular/core';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserDataService } from './user-data.service';
import { ConfirmationFormComponent } from './confirmation-form/confirmation-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularCurd';

  displayedColumns: string[] = ['name', 'email', 'mobileNo','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private userDataService: UserDataService) { }


  ngOnInit(): void {
    

    this.getStoredUserData();
   
   








  }

  getStoredUserData() {

  this.userDataService.userData$.subscribe((userData) => {
    this.dataSource = new MatTableDataSource(userData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}
 

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  openDialog() {
    this.dialog.open(AddUserFormComponent, {
      width: "30%",

    });


  }


  editUser(row:any){
    this.dialog.open(AddUserFormComponent, {
      width: "30%",
      data:row,
    });
  }


  deleteUser(row:any){
    this.dialog.open(ConfirmationFormComponent,{
      data:row
    });
    
  }
}
