import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAuth from './reducers';
import { AuthEffects } from './auth.effects';

import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth.service";
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    };
  }
}
