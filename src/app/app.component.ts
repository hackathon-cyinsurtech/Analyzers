import {Component, ViewChild} from '@angular/core';
import {Nav,Events, MenuController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SearchPage} from '../pages/search/search';
import {HomePage} from '../pages/home/home';
import {LoginComponent} from "../pages/auth/login.component";
import {LogoutComponent} from "../pages/auth/logout.component";
import {AwsUtil} from "../providers/aws.service";
import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = TabsPage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public menu: MenuController,
                public events: Events,
                public awsUtil: AwsUtil) {
        this.initializeApp();

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
}
