import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ModalController, App } from 'ionic-angular';
import * as moment from 'moment';

// servicios
import { DiaryData, ActivityService } from '../../providers';

// pipes
import { SortAddPipe } from '../../shared/pipes/sort-add.pipe';
import { ObjectToArrayPipe } from '../../shared/pipes/object-to-array.pipe';

@IonicPage()
@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})
export class DiaryPage {

  day: any = moment()
  completeDiary;
  diary;
  commented: Array<string>
  activity: any

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public diaryData: DiaryData,
    public activityService: ActivityService,
    private sortAddPipe: SortAddPipe,
    private objectToArray: ObjectToArrayPipe,
    public modalCtrl: ModalController,
    public app: App
  ) {
    this.getData();
    this.getActivity();
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    let today = {date: moment()};
    this.setDay(today);
  }

  getData() {
    // this.diaryData.getDiary()
    this.diaryData.diaryObs
    .subscribe(data => {
      this.completeDiary = data;
      this.diary = this.dateDiary()
      this.commented = this.commentedDates();
    })
  }

  getActivity() {
    this.activity = this.activityService.activityObs;
  }

  presentActivity() {
    this.app.getRootNav().push('ActivityPage');
  }

  setDay(day){
    this.day = day.date;
    this.diary = this.dateDiary();
  }

  detail(meal: any) {
    console.log(meal);
    meal['date'] = this.day.format("YYYYMMDD")
    this.app.getRootNav().push('MealDetailPage', meal);
    // estoy llamando getRootNav devuelve NavController lo que me permite navegar desde ahi sin mostrar las tabs
  }

  private dateDiary() {
    let dayDiary = this.completeDiary[this.day.format("YYYYMMDD")]
    if (!dayDiary) { dayDiary = []}
    let primero  = this.objectToArray.transform(dayDiary);
    let segundo = this.sortAddPipe.transform(primero, 'order', true);
    return segundo;
  }

  private commentedDates() {
    let commented = [];

    const days = this.objectToArray.transform(this.completeDiary);
    days.forEach( item => {
      // console.log(item);
      const day = this.objectToArray.transform(item);
      // console.log(day);
      day.forEach( meal => {
        if ( meal[0] === '$') { return; }
        // console.log(meal, meal.rate, meal. reviews);
        if (meal.rate || meal.reviews) {
          // console.log('pasa el primero');
          if (commented.indexOf(item.$key) === -1) {
            // console.log('pasa el ultimo', item.$key);
            commented.push(item.$key);
          } else { return; }
        }
      })
    })
    // console.log(commented);
    return commented;
    
  }


}
