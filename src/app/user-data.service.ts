import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  userData$: Observable<any[]> = this.userDataSubject.asObservable();

  constructor() {
    // Initialize userData from localStorage
    const storedData = localStorage.getItem('usersData');
    if (storedData) {
      this.userDataSubject.next(JSON.parse(storedData));
    }
  }

  getUserData(): any[] {
    return this.userDataSubject.value;
  }

  updateUserData(data: any[]): void {
    this.userDataSubject.next(data);
  }


  deleteUser(user: any): void {
    const currentData = this.getUserData();
    const index = currentData.findIndex((u) => u.email === user.email);

    if (index !== -1) {
      currentData.splice(index, 1); // Remove the user from the array
      this.updateUserData(currentData); // Update the data in the service
      localStorage.setItem('usersData', JSON.stringify(currentData)); // Update data in local storage
    }
  }



}
