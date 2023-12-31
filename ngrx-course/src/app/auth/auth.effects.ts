import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.login),
      tap(action => localStorage.setItem(`user`, JSON.stringify(action.user)))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem(`user`);
        this.router.navigate(['login']);
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) { }
}