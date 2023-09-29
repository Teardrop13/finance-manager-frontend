import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  submitted = false;
  registerForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  register() {
    if (!this.registerForm.valid) {
      return
    }

    this.submitted = true;
    this.subscriptions.push(this.authentication.register(this.registerForm.value)
      .subscribe(
        {
          next: res => {
            if (res.error) {
              alert('Failed to register');
              this.submitted = false;
            } else {
              this.snackBar.open("Your account has been successfully created! Now you can log in.", "Close", {
                duration: 5000
              });
              this.router.navigateByUrl('/login');
            }
          },
          error: () => {
            this.submitted = false;
            return alert('Failed to register');
          }
        }
      ));
  }

  isNotMatched() {
    return this.registerForm.get('password2')?.hasError('notmatched');
  }
}
