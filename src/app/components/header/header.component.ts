import { StatesService } from './../../services/states.service';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private state: StatesService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authSrv.logout().subscribe(res => {
      localStorage.removeItem('access_token');
      this.router.navigate(['login']);
    });
  }

  onInput() {
    this.state.setQuery(this.query);
  }

}
