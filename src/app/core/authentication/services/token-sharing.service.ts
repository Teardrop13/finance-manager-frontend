import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

const TOKEN_SHARING_CHANNEL = "token-sharing";
const REQUESTING_TOKEN = "requesting-token";

@Injectable()
export class TokenSharing implements OnDestroy {

  private bc = new BroadcastChannel(TOKEN_SHARING_CHANNEL);


  constructor(private authentication: AuthenticationService,
    private router: Router) {
    this.addBroadcastChannelListener();
  }

  ngOnDestroy(): void {
    this.bc.close();
  }

  public requestToken() {
    this.bc.postMessage(REQUESTING_TOKEN);
  }

  private addBroadcastChannelListener() {
    this.bc.addEventListener("message", (event) => {
      if (event.data === REQUESTING_TOKEN) {
        new BroadcastChannel(TOKEN_SHARING_CHANNEL).postMessage({
          token: this.authentication.getToken()
        });
      } else {
        const { token } = event.data;
        if (token) {
          this.authentication.saveToken(token);
          this.router.navigateByUrl("home/summary");
        }
      }
    });
  }

}