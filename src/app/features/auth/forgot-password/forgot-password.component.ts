import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { IRequestUserForgotPassword } from '@core/models/request/IRequestUserForgotPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;

  forgotPasswordEvent = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get controlsValues() {
    return this.forgotPasswordForm.controls;
  }

  onLinkSend() {
    this.isSubmitted = true;

    if (!this.forgotPasswordForm.valid) {
      return;
    }

    this.forgotPasswordForm.disable();
    this.isProcessing = true;

    let forgotPassword: IRequestUserForgotPassword = {
      email: this.forgotPasswordForm.value.email,
    };


    this.authService.forgotPassword(forgotPassword).then((result) => {

      if (result.IsSuccess) {
        this.isProcessing = false;
        this.forgotPasswordForm.enable();
        this.forgotPasswordForm.reset();
        this.router.navigate(['home']);
        const text = `${result.Data}`;
        this.snackBar.open(text, 'Close', { duration: 8000 });
      }
      else {
        const text = `${result.Data}`;
        this.snackBar.open(text, 'Close', { duration: 8000 });
      }
    });
  }
}
