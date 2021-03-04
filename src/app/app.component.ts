import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isVisibleHeader: boolean;
  constructor(
    private router:Router
    ) {}

  ngOnInit() {
    this.router.events
        .pipe(filter((data: any) => data.url))
        .subscribe(({url}) => this.isVisibleHeader = !url?.includes('login'));
  }
}
