import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from '@core/authentication/models/authentication.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerRequest: RegisterRequest = {
    username: "",
    password: "",
    email: ""
  };

  @ViewChild("usernameError")
  usernameError: ElementRef;

  @ViewChild("emailError")
  emailError: ElementRef;

  @ViewChild("passwordError")
  passwordError: ElementRef;

  constructor(private authentication: AuthenticationService,
    private router: Router,
    private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  register() {
    if (this.validateRequest()) {
      this.authentication.register(this.registerRequest)
        .subscribe(
          {
            next: res => {
              if (res.error) {
                this.renderer.setProperty(this.usernameError.nativeElement, "innerHTML", res.error);
              } else {
                this.router.navigateByUrl('/login');
              }
            },
            error: () => alert('Failed to register')
          }
        )
    }
  }

  private validateRequest(): boolean {
    let valid = true;
    const fieldRequired = "Field required.";

    this.resetErrors()

    if (!this.registerRequest.username) {
      this.renderer.setProperty(this.usernameError.nativeElement, "innerHTML", fieldRequired);
      valid = false;
    }
    if (!this.registerRequest.email) {
      this.renderer.setProperty(this.emailError.nativeElement, "innerHTML", fieldRequired);
      valid = false;
    }
    if (!this.registerRequest.password) {
      this.renderer.setProperty(this.passwordError.nativeElement, "innerHTML", fieldRequired);
      valid = false;
    }
    return valid;
  }

  private resetErrors() {
    this.renderer.setProperty(this.usernameError.nativeElement, "innerHTML", "");
    this.renderer.setProperty(this.emailError.nativeElement, "innerHTML", "");
    this.renderer.setProperty(this.passwordError.nativeElement, "innerHTML", "");
  }

}
