import { UserData } from './../models/user-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SnackbarParams } from '../models/snackbar-params.model';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private snackbarParamsSource = new Subject<SnackbarParams>();
  snackbarParams$ = this.snackbarParamsSource.asObservable();

  private searchUserSource = new Subject<string>();
  searchUser$ = this.searchUserSource.asObservable();

  private selectedUserSource = new BehaviorSubject<UserData>(undefined);
  selectedUser$ = this.selectedUserSource.asObservable();
  
  constructor() { }

  setSnackbarParams(params: SnackbarParams) {
    this.snackbarParamsSource.next(params);
  }

  setQuery(query: string) {
    this.searchUserSource.next(query);
  }

  selectUser(user: UserData) {    
    this.selectedUserSource.next(user);
  }
}
