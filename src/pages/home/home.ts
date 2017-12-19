import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { SamplePage } from '../sample/sample';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chosenWord : any;
  words : any;
  guesses : any;
  correct : any;
  globalData : any;
  sampleLink : any;
  checkboxes : any;
  currentWord: any;
  keyToDelete : any;
  unchangedGlobalData : any;
  score : any;
  done: any;
  unCorrectAnswers:any;

  constructor(public navCtrl: NavController,public navParams : NavParams, public http:Http, public alertCtrl: AlertController) {
    this.initSetup();
  }
   
  initSetup()
  {
    this.unCorrectAnswers = [];
    this.checkboxes = ['c-box-1','c-box-2','c-box-3','c-box-4','c-box-5','c-box-6','c-box-7','c-box-8','c-box-9','c-box-10'];
    this.guesses = [];
    this.words = [];
    this.currentWord = 1;
    this.score = 0 ;
    this.done= false;
     this.sampleLink = this.navParams.get('link')*10;
    this.http.get("./assets/gre_words.json").map(res => res.json()).subscribe(data=>{
      this.globalData = data.slice(this.sampleLink-10,this.sampleLink);
      this.unchangedGlobalData = data.slice(this.sampleLink-10,this.sampleLink);
      this.randomWord();
  }
, e => {
      this.presentError();
    });
  }

  randomWord()
  {
    this.words=[];
    this.guesses=[];
    let keyValuesToHelpDelete = [];
    let i=0;
    let lastFourElements = false;
    while(this.words.length<=3)
    {
      let randomNumber = Math.floor(Math.random()*this.globalData.length);
      if(this.globalData.length<=4 && this.globalData.length>=1)
      {
        let rN = Math.floor(Math.random()*this.unchangedGlobalData.length);
        if(i==0)
        {
          //last four elements ensuring the words from reduced word list taken
          this.words.push(this.globalData[randomNumber].word);
          this.guesses.push({"i":i,"meaning":this.globalData[randomNumber].meaning});
          this.keyToDelete = randomNumber;
          this.chosenWord = this.globalData[randomNumber].word;
          this.correct = 0;
          i+=1;
          lastFourElements = true;
        }
        else if(this.words.indexOf(this.unchangedGlobalData[rN].word)==-1)
        {
          this.guesses.push({"i":i,"meaning":this.unchangedGlobalData[rN].meaning})          
          this.words.push(this.unchangedGlobalData[rN].word);
          i+=1;
        }
      }
      else if(this.words.indexOf(this.globalData[randomNumber].word)==-1)
      {
        this.guesses.push({"i":i,"meaning":this.globalData[randomNumber].meaning});
        this.words.push(this.globalData[randomNumber].word);
        keyValuesToHelpDelete.push(randomNumber);        
        i+=1;
      }
    }
    if(!lastFourElements)
    {
      this.correct = Math.floor(Math.random()*4);
      this.chosenWord = this.words[this.correct];
      this.keyToDelete = keyValuesToHelpDelete[this.correct];
    }

  }
  
  checkAnswer(i)
  {
    if(i == this.correct)
    {
      this.presentCorrect(this.chosenWord,this.guesses[this.correct].meaning);
      //make the checkbox green
      this.globalData.splice(this.keyToDelete ,1);
      this.checkboxes[this.currentWord-1] = "correct";
      this.score+=1;
    }
    else
    {
      this.presentWrong(this.chosenWord,this.guesses[this.correct].meaning);
      //make the checkbox green
      this.unCorrectAnswers.push({"word":this.chosenWord,"meaning":this.guesses[this.correct].meaning})
      this.globalData.splice(this.keyToDelete,1);
      this.checkboxes[this.currentWord-1] = "incorrect";
    }
    this.currentWord+=1;
    console.log(this.globalData.length);
    if(this.globalData.length!=0)
    {
      this.randomWord();  
    }
    else
    {
      this.presentScore();
      this.done= true;
    }
  }

  presentCorrect(word,meaning) {
    const alert = this.alertCtrl.create({
      title: 'Correct Answer!',
      subTitle: word+" does means "+meaning,
      buttons: ['Next']
    });
    alert.present();
  }

  presentWrong(word,meaning) {
    const alert = this.alertCtrl.create({
      title: 'Oops! Wrong Answer!',
      subTitle: word+" means "+meaning,
      buttons: ['Next']
    }); 
    alert.present();
  }

  presentError()
  {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'There was an error in loading data',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentScore()
  {
    const alert = this.alertCtrl.create({
      title:'Score!',
      subTitle:'You scored :'+this.score+' out of 10 questions.',
      buttons: ["Dismiss"
      ,{
        text: "Other Quizes",
        handler: ()=>{
          this.navCtrl.push(SamplePage);
        }
      }
      ]
    });
    alert.present();
  }

}
