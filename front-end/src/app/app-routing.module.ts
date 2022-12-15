import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { AuthGuard } from './utils/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    //path: 'current-user',
    matcher: (segments: UrlSegment[]) => {
      if (localStorage.getItem('currentUserType') === "user") {
        return {
          consumed: segments,
          posParams: {
            type: new UrlSegment(segments[0].path, {})
          }
        };
      }
      return null;
    },
    component: UserDetailComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
