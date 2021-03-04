import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-manager';
  constructor(
    private client: ClientService
  ) {}

  ngOnInit() {
    // this.client.loginUser().subscribe(res => {
    //   this.client.getAllUsers(res['result'].token).subscribe(res => {
    //     console.log(res);
        
    //   });
    // }, err => console.log(err));
  }
}
