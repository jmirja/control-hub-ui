import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ResetPasswordComponent, ForgotPasswordComponent, VerifyEmailComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule { }
