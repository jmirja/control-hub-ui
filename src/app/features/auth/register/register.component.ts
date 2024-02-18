import { FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;
  @Output() sendRegisterForm = new EventEmitter<void>();


  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get controlsValues() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      return;
    }
    this.registerForm.disable();
    this.isProcessing = true;
    this.sendRegisterForm.emit(this.registerForm.value);
    this.authService.isRegisteredIn.subscribe((val: any) => {
      if (val == true) {
        this.isProcessing = false;
        this.registerForm.enable();
        this.registerForm.reset();
      }
    });
  }
}
