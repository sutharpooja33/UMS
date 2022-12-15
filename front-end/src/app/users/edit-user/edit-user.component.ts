import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/utils/alert/alert/alert.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/users';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  options: any[] = [{ type: 'admin', name: 'Admin' },
  { type: 'user', name: 'User' },
  ];
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    userType: new FormControl('')
  });
  submitted = false;
  User!: User;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _alertService: AlertService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userType: [null, Validators.required]
      }
    );
    this._userService.getUser(this._route.snapshot.paramMap.get('id'))
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (res) => {
          this.form.setValue({
            name: res.name,
            email: res.email,
            userType: res.type
          })
        },
        error: (e) => {
          console.error(e)
        }
      });
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
    const payload = {
      name: this.form.value.name,
      email: this.form.value.email,
      type: this.form.value.userType
    };
    this._userService.update(this._route.snapshot.paramMap.get('id'), payload)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: () => {
          this.submitted = true;
          this._alertService.success('Sucessfully update user!!');
          this._router.navigate(['../user']);
        },
        error: (e) => {
          this._alertService.error(e.error.message);
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
