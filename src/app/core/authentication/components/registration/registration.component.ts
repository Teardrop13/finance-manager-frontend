import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password2: new FormControl('', [Validators.required]),
  }, { validators: this.customValidatorForm });

  constructor(private authentication: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      this.authentication.register(this.registerForm.value)
        .subscribe(
          {
            next: res => {
              if (res.error) {
                alert('Failed to register');
              } else {
                this.router.navigateByUrl('/login');
              }
            },
            error: () => alert('Failed to register')
          }
        )
    }
  }

  customValidatorForm() {
    return (form: FormGroup) => {
      return form.get('password')?.value !== form.get('password2')?.value
        ? { notmatched: true }
        : null;
    };
  }

}

