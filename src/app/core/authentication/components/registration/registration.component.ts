import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private authentication: AuthenticationService,
    private router: Router) {}

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
    if (this.registerForm.valid) {
      this.subscriptions.push(this.authentication.register(this.registerForm.value)
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
        ));
    }
  }

  isNotMatched() {
    return this.registerForm.get('password2')?.hasError('notmatched');
  }
}
