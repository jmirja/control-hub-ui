import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { IRequestUserVerifyEmail } from '@core/models/request/IRequestUserVerifyEmail';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

    verifyEmailForm: FormGroup;
    isProcessing = false;
    isSubmitted = false;

    forgotPasswordEvent = new EventEmitter<void>();

    verificationToken: string;

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        this.verificationToken = null;
        this.getQueryParams();

        this.verifyEmailForm = new FormGroup({
            verificationToken: new FormControl(this.verificationToken)
        });
    }

    private getQueryParams() {
        this.route.queryParams
            .subscribe(params => {
                this.verificationToken = params.verificationToken;
            });
    }


    get controlsValues() {
        return this.verifyEmailForm.controls;
    }

    onVerifyEmail() {
        this.isSubmitted = true;

        if (!this.verifyEmailForm.valid) {
            return;
        }

        this.verifyEmailForm.disable();
        this.isProcessing = true;

        let verifyEmailRequest: IRequestUserVerifyEmail = {
            Token: this.verifyEmailForm.value.verificationToken,
        }

        this.authService.verifyEmail(verifyEmailRequest).then((result) => {
            if (result.IsSuccess) {
                this.isProcessing = false;
                this.verifyEmailForm.enable();
                this.verifyEmailForm.reset();
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
