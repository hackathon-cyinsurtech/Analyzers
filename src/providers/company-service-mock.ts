import {Injectable} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
@Injectable()
export class CompanyService {

  public companies: Array<any>;
  constructor(public http: Http,public alertCtrl: AlertController) {}

  getAllCompanies(){
    return this.http.get("http://ec2-34-216-159-143.us-west-2.compute.amazonaws.com/html/api/company/read.php");
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
