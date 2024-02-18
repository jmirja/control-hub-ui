import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { routes } from '@core/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  hidePassword = true;
  isProcessing = false;

  public routers: typeof routes = routes;
  @Output() sendLoginForm = new EventEmitter<any>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get controlsValues() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.loginForm.disable();
    this.isProcessing = true;
    this.sendLoginForm.emit(this.loginForm.value);
    this.authService.isLoggedIn.subscribe((val) => {
      if (val == true) {
        this.isProcessing = false;
        this.loginForm.enable();
        this.router.navigate([this.routers.DASHBOARD]);
      }
    });
  }
}
