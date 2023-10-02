import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  submitted = false;
  loginForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private authentication: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = createForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.submitted = true;

    this.subscriptions.push(this.authentication.login(this.loginForm.value)
      .subscribe(
        {
          next: () => {
            this.router.navigateByUrl('summary');
          },
          error: () => {
            this.submitted = false;
            this.snackBar.open("Failed to log in!", "Close", {
              duration: 5000
            });
          }
        }
      ));
  }

}
function createForm(): FormGroup {
  return new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
}

