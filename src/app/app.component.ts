import {Component, ViewChild} from '@angular/core';
import {Nav,Events, MenuController, Platform,AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SearchPage} from '../pages/search/search';
import {HomePage} from '../pages/home/home';
import {LoginComponent} from "../pages/auth/login.component";
import {LogoutComponent} from "../pages/auth/logout.component";
import {AwsUtil} from "../providers/aws.service";
import { TabsPage } from '../pages/tabs/tabs';
import { CompanyService } from '../providers/company-service-mock';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = TabsPage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public menu: MenuController,
                public events: Events,
                public service: CompanyService,
                public alertCtrl: AlertController,
                public awsUtil: AwsUtil) {
        this.initializeApp();
        this.findAll();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.awsUtil.initAwsService();
            this.listenToLoginEvents();
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }
    
    listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
        });


        this.events.subscribe('user:logout', () => {
        });
    }

    findAll() {
        if (this.service.companies !== undefined) {
            return;
        }
          this.service.getAllCompanies().subscribe(data => {
              this.service.companies = data.json();
              this.doAlert("Success",this.service.companies["companiesArr"][0]["name"])
              }, error => {
                  this.doAlert("Error!",JSON.stringify(error));
            });
              /*.then(data =>{
                 this.items = data;
                 this.doAlert("Error!",JSON.stringify(this.items));
              })
              .catch(error => alert(error));*/
    }
    doAlert(title: string, message: string) {

        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

}
