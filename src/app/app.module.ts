import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule,Routes} from '@angular/router';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { ExpenseModModule } from './expense-mod/expense-mod.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    SnotifyModule,
    UserModule,
    ExpenseModModule,
    RouterModule.forRoot([
      {path:'',component:LoginComponent},
      { path: '*', component: NotFoundComponent},
      { path: '**', component: NotFoundComponent},
      {path:'login',component: LoginComponent},
      {path:'signup',loadChildren:'./user/user.module'},
      {path:'passwordReset/:resetToken',loadChildren:'./user/user.module'},
      {path: 'expense',loadChildren:'./expense-mod/expense-mod.module', pathMatch: 'full', canActivate: [AuthGuard] }   
    ])
  ],
  providers: [ { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
  SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
