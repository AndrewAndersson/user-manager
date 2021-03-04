import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(
    private client: ClientService
  ) { }

  ngOnInit(): void {
    this.client.getAllUsers().subscribe(usersList => {
      console.log(usersList);
      
    });
  }

}
