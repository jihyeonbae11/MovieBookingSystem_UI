import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
} from './shared/components';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {DevExtremeModule} from 'devextreme-angular';
import {EmployeeComponent} from "./pages/employee/employee.component";
import {CommonModule} from "@angular/common";
import {EmployeeEditComponent} from "./pages/employee/edit/employee-edit.component";
import {BookingListComponent} from "./pages/bookinglist/bookingList.component";
import {BookingListEditComponent} from "./pages/bookinglist/edit/bookingList-edit.component";

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'movie',
    component: BookingListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'movie/:genre',
    component: BookingListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'bookinglist/:userId',
    component: BookingListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'bookinglist',
    component: BookingListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'bookinglist/:bookingId',
    component: BookingListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DevExtremeModule, CommonModule],
  providers: [AuthGuardService],
    exports: [RouterModule, EmployeeEditComponent],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    BookingListComponent,
    BookingListEditComponent
  ]
})
export class AppRoutingModule { }
