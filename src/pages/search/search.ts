import { Component } from '@angular/core';

import {Config, NavController,AlertController,NavParams} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { CompanyService } from '../../providers/company-service-mock';
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
  first = true;
  second = false;;
  companies: Array<any>;
  prices = ["$522","$637","$578","$485"];
  cover = [["checkmark","checkmark","close","checkmark","close"],
           ["close","checkmark","checkmark","checkmark","close"],
           ["close","checkmark","close","checkmark","checkmark"],
           ["checkmark","checkmark","close","checkmark","close"]
          ];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: Config,
              public alertCtrl: AlertController,
              public service: CompanyService,
              public actionSheetCtrl: ActionSheetController) {

              //this.companies = this.service.companies.slice();
              //this.doAlert("Success",this.companies["companiesArr"][0]["name"]);
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
  showResults(){
    this.first = false;
    this.second = true;
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
