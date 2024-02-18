import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { IRequestUserResetPassword } from '@core/models/request/IRequestUserResetPassword';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: FormGroup;
    isProcessing = false;
    isSubmitted = false;

    forgotPasswordEvent = new EventEmitter<void>();

    resetCode: string;

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        this.resetCode = null;
        this.getQueryParams();

        this.resetPasswordForm = new FormGroup({
            resetCode: new FormControl(this.resetCode),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    private getQueryParams() {
        this.route.queryParams
            .subscribe(params => {
                this.resetCode = params.resetCode;
            });
    }

    get controlsValues() {
        return this.resetPasswordForm.controls;
    }

    onResetPassword() {
        this.isSubmitted = true;

        if (!this.resetPasswordForm.valid) {
            return;
        }

        this.resetPasswordForm.disable();
        this.isProcessing = true;

        let resetRequest: IRequestUserResetPassword = {
            ResetCode: this.resetPasswordForm.value.resetCode,
            Email: this.resetPasswordForm.value.email,
            NewPassword: this.resetPasswordForm.value.password,
        }

        this.authService.resetPassword(resetRequest).then((result) => {
            if (result.IsSuccess) {
                this.isProcessing = false;
                this.resetPasswordForm.enable();
                this.resetPasswordForm.reset();
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
