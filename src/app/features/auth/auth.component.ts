import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/auth/auth.service';
import { IRequestUserLogin } from '@core/models/request/IRequestUserLogin';
import { IRequestUserRegister } from '@core/models/request/IRequestUserRegister';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public todayDate: Date = new Date();
  isProcessing = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }

  public sendLoginForm($event: any) {
    const request: IRequestUserLogin = {
      UserName: String($event.userName),
      Password: String($event.password),
    };

    this.authService.login(request);
  }

  public sendRegisterForm($event: any): void {
    const request: IRequestUserRegister = {
      FullName: String($event.fullname),
      UserName: String($event.username),
      Email: String($event.email),
      Password: String($event.password),
    };
    this.authService.register(request).then((result) => {
      const text = `${result.Data}`;
      this.snackBar.open(text, 'Close', { duration: 8000 });
    });
  }
}

