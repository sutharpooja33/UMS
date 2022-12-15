import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './utils/guards/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'front-end';
  isLoggedIn$: Observable<boolean> | undefined;
  isadminloggedIn$: Observable<boolean> | undefined;
  constructor(
    private _router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isadminloggedIn$ = this.authService.isadminloggedIn;
  }

  logout() {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserType');
    this.authService.logout();
    this._router.navigate(['']);
  }
}
