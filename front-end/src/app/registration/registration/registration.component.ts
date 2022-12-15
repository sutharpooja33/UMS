import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/utils/alert/alert/alert.service';
import Validation from 'src/app/utils/validation';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private _unsubscribe = new Subject<void>();
  options: any[] = [{type: 'admin', name: 'Admin'},
                    {type: 'user', name: 'User'},
                    ];
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    userType: new FormControl('')
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _alertService: AlertService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        userType: [null, Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
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
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,  
      type: this.form.value.userType   
    };
    this._userService.register(payload)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: () => {
          this.submitted = true;
          this._alertService.success('Sucessfully Register User!!');
          this._router.navigate(['../login']);
        },
        error: (e) => console.error(e)
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}

