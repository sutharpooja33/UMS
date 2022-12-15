import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertService } from '../utils/alert/alert/alert.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../utils/guards/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _alertService: AlertService,
    private authService: AuthService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      },
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    const payload = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this._userService.login(payload)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (res) => {
          if (res) {
            this.submitted = true;
            this._alertService.success('Sucessfully Login!!');
            localStorage.setItem('currentUserId', res.id);
            localStorage.setItem('currentUser', res.email);
            localStorage.setItem('currentUserType', res.type);
            this.authService.login(res);
            if (res.type === 'admin') {
              this._router.navigate(['../user']);
            }
            else {
              this._router.navigate(['../current-user']);
            }

          }
          else {
            this._alertService.error('Login failed!!');
          }
        },
        error: () => {
          this._alertService.error('Login failed!!');
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
