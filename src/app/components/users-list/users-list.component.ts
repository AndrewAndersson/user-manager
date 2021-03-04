import { takeUntil } from 'rxjs/operators';
import { StatesService } from './../../services/states.service';
import { UserData } from './../../models/user-data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  usersList: UserData[];
  sourceList: UserData[];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private client: ClientService,
    private state: StatesService
  ) { }

  ngOnInit(): void {
    this.client.getAllUsers().subscribe(usersList => {
      this.usersList = usersList;
      this.sourceList = usersList;
    });

    this.state.searchUser$
        .pipe(takeUntil(this.destroy$))
        .subscribe((query: string) => {
          this.usersList = this.sourceList.filter((item: UserData) => item.firstName && (item.firstName.includes(query)));
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
