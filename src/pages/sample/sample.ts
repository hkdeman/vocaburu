import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

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
  score : any;
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
   }

  initSetup()
  {
    let score = "";
    this.samples=[];
    this.storage.set("totalScore",0);

    for(let i=1;i<=100;i++)
    {
      this.storage.get(String(i)).then((val) => {
        if(val!=null)
        {
          score = "score_"+val.latest.score;
          this.score += i;
          this.storage.get("totalScore").then((total)=>{
            if(total!=null)
            {
              this.storage.set("totalScore",Number(total)+Number(val.latest.score));
            }
            else
            {
              this.storage.set("totalScore",val.latest.score);
            }
          });
        }
        else
        {
         score = "";
        }

        if(i<=25)
        { 
          this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});          
        }
        else if(i<=50)
        {
              this.storage.get("totalScore").then((totalScore)=>{
                if(totalScore!=null)
                {
                  if(Number(totalScore)/25<80)
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":false}); 
                  }
                  else
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                     
                  }
                }
                else
                {
                  this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                                       
                }
              });        
        }
        else if(i<=75)
        {
              this.storage.get("totalScore").then((totalScore)=>{
                if(totalScore!=null)
                {
                  if(Number(totalScore)/50<85)
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":false}); 
                  }
                  else
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                     
                  }
                }
                else
                {
                  this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                     
                  
                }
              });       
        }
        else if(i<=90)
        {
              this.storage.get("totalScore").then((totalScore)=>{
                if(totalScore!=null)
                {
                  if(Number(totalScore)/75<90)
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":false}); 
                  }
                  else
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                                         
                  }
                }
                else
                {
                  this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                                       
                }
              });
            }
            else
            {
              this.storage.get("totalScore").then((totalScore)=>{
                if(totalScore!=null)
                {
                  if(Number(totalScore)/90<95)
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":false}); 
                  }
                  else
                  {
                    this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                                         
                  }
                }
                else
                {
                  this.samples.push({"title":"Quiz "+i,"link":i,"score":score,"access":true});                                       
                }
              });
            }
          });      
    }
    console.log(this.score);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SamplePage');
  }

  navigateToHomePage(link)
  {
    this.navCtrl.push(HomePage, {"link" : link});
  }

  ionViewWillEnter()
  {
    this.initSetup();
  }

}
