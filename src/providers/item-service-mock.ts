import {Injectable} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
@Injectable()
export class ItemService {

  favoriteCounter: number = 0;
  favorites: Array<any> = [];
  public items: Array<any>;
  public nearbyItems: Array<any>;
  constructor(public http: Http,public alertCtrl: AlertController) {}

  getNearby(lat:number, long:number){
    return this.http.get("https://nfjywcqtn6.execute-api.eu-west-1.amazonaws.com/beta/closest?lat=" +lat + "&" + "lng=" + long + "&k=4");
  }

  getAllItems(){
    return this.http.get("https://nfjywcqtn6.execute-api.eu-west-1.amazonaws.com/beta/all");
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
