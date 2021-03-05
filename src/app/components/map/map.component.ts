import { UserData } from './../../models/user-data.model';
import { StatesService } from './../../services/states.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  lng = 30.40;
  lat = 50.272;

  userData: UserData[];

  constructor(
    private client: ClientService,
    private router: Router,
    private states: StatesService
  ) { }

  ngOnInit(): void {

    this.client.getAllUsers().subscribe(usersList => {
      this.userData = usersList;
    });
  }

  

  onclick(user: UserData) {
    this.states.selectUser(user);
    this.router.navigate(["profile/" + user.id]);
  }

}
