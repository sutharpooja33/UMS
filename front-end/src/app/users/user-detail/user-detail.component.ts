import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userDetail!: User;
  constructor(
    private _userService: UserService,

  ) { }

  ngOnInit(): void {
    const id = localStorage.getItem('currentUserId');
    this._userService.getUser(id)
      .subscribe({
        next: (data) => {
          this.userDetail = data;
        },
        error: (e) => console.error(e)

      });
  }

}
