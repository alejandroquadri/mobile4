import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';

// pages
import { MealDetailPage} from '../meal-detail/meal-detail';

// servicios
import { DiaryData } from '../../providers/diary-data';

// pipes
import { SortAddPipe } from '../../shared/pipes/sort-add.pipe';
import { ObjectToArrayPipe } from '../../shared/pipes/object-to-array.pipe';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})
export class DiaryPage {

  day: any = moment()
  completeDiary;
  diary;
  commented: Array<string>

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public diaryData: DiaryData,
    private sortAddPipe: SortAddPipe,
    private objectToArray: ObjectToArrayPipe
  ) {
    this.getData()
  }

  ionViewDidLoad() {
  }

  getData() {
    this.diaryData.getDiary()
    .subscribe(data => {
      this.completeDiary = data;
      this.diary = this.dateDiary()
      this.commented = this.commentedDates();
    })
  }

  setDay(day){
    this.day = day.date;
    this.diary = this.dateDiary();
  }

  detail(meal: any) {
    meal['date'] = this.day.format("YYYYMMDD")
    this.navCtrl.push(MealDetailPage, meal);
  }

  private dateDiary(){
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
