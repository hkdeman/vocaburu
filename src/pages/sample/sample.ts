import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

/**
 * Generated class for the SamplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sample',
  templateUrl: 'sample.html',
})
export class SamplePage {
  samples : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.samples=[];
    for(let i=1;i<=100;i++)
    {
      this.samples.push({"title":"Quiz "+i,"link":i});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SamplePage');
  }

  navigateToHomePage(link)
  {
    this.navCtrl.push(HomePage, {"link" : link});
  }

}
