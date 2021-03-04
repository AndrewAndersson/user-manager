import { trigger, transition, style, animate } from '@angular/animations';

export const snackbarAnimation = {
    snackbarState:  trigger(
        'inOutSnackBar',
        [
          transition(
            ':enter',
            [
              style({ transform: 'translateY(100vh)' }),
              animate('250ms ease', style({ transform: 'translateY(0vh)' }))
            ]
          ),
          transition(
            ':leave',
            [
              style({ transform: 'translateY(0vh)' }),
              animate('250ms ease', style({ transform: 'translateY(100vh)' }))
            ]
          )
        ]
      )
};
