import { Component } from '@angular/core';

import {Config, NavController,AlertController,NavParams} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
// import { InfoPage } from '../info/info';

@Injectable()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  typeOfInsurance: string;
  isMotor = false;
  isHealth = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: Config,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController) {


  }

  enableMenu(type:string){
    if (type == "0"){
      this.isMotor = true;
      this.isHealth = false;
    }else if (type == "1"){
      this.isMotor = false;
      this.isHealth = true;
    }
    
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
