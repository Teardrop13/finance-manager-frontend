import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subscription, debounce, fromEvent, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  windowWidth: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  ngOnInit(): void {
    this.windowWidth = window.innerWidth

    this.resizeObservable$ = fromEvent(window, 'resize')

    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounce(() => timer(200)))
      .subscribe(evt => {
        const window = evt.target as Window;
        if (window.innerWidth != this.windowWidth) {
          this.windowWidth = window.innerWidth
        }
      })
  }

  getMode(): MatDrawerMode {
    return this.windowWidth < 800 ? 'over' : 'side';
  }
}
