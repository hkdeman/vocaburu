import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';


/**
 * Generated class for the DictPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dict',
  templateUrl: 'dict.html',
})
export class DictPage {

  globalData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http :Http) {

    this.http.get("./assets/gre_words.json").map(res => res.json()).subscribe(data=>{
      this.globalData = data;
      
  }
, e => {
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DictPage');
  }

}
