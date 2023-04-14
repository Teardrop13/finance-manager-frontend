import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '@core/authentication/models/authentication.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = { username: "", password: "" };

  constructor(private authentication: AuthenticationService) {}

  ngOnInit(): void {
  }

  login() {
    this.authentication.login(this.loginRequest);
  }

}
