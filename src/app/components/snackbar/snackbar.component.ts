import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatesService } from './../../services/states.service';
import { takeUntil } from 'rxjs/operators';
import { SnackbarParams } from '../../models/snackbar-params.model';
import { Subject } from 'rxjs';
import { snackbarAnimation } from '../../animations/snackbar.animations';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [snackbarAnimation.snackbarState]
})
export class SnackbarComponent implements OnInit, OnDestroy {

  params: SnackbarParams;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private states: StatesService
  ) { }

  ngOnInit() {
    this.states.snackbarParams$
        .pipe(takeUntil(this.destroy$))
        .subscribe((params: SnackbarParams) => {
          this.params = params;
          this.params && setTimeout(() => this.states.setSnackbarParams(undefined), this.params.timeout);
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
