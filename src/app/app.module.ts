import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {AlertsPage} from "../pages/alerts/alerts";
import {AccountPage} from "../pages/account/account";
import {NavigationDetailsPage} from "../pages/account/account";
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {SearchPage} from '../pages/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ItemService } from "../providers/item-service-mock";

import {CognitoUtil} from "../providers/cognito.service";
import {AwsUtil} from "../providers/aws.service";
import {EventsService} from "../providers/events.service";
import {LoginComponent} from "../pages/auth/login.component";
import {RegisterComponent} from "../pages/auth/register.component";

import {RegisterNewUserComponent} from "../pages/auth/registerNewUser.component";
import {RegisterFromInsuranceComponent} from "../pages/auth/registerFromInsurance.component";
import {ConfirmRegistrationComponent} from "../pages/auth/confirmRegistration.component";
import {ResendCodeComponent} from "../pages/auth/resendCode.component";
import {ForgotPasswordStep1Component} from "../pages/auth/forgotPassword1.component";
import {ForgotPasswordStep2Component} from "../pages/auth/forgotPassword2.component";
import {UserLoginService} from "../providers/userLogin.service";
import {UserParametersService} from "../providers/userParameters.service";
import {UserRegistrationService} from "../providers/userRegistration.service";
import {LogoutComponent} from "../pages/auth/logout.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    AlertsPage,
    TabsPage,
    AccountPage,
    NavigationDetailsPage,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RegisterNewUserComponent,
    RegisterFromInsuranceComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    AlertsPage,
    AccountPage,
    NavigationDetailsPage,
    TabsPage,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RegisterNewUserComponent,
    RegisterFromInsuranceComponent,
    ConfirmRegistrationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPasswordStep2Component
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ItemService,
    CognitoUtil,
    AwsUtil,
    UserLoginService,
    UserParametersService,
    UserRegistrationService,
    EventsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
