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

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public diaryData: DiaryData,
    private sortAddPipe: SortAddPipe,
    private objectToArray: ObjectToArrayPipe
  ) {
    this.getData();
  }

  ionViewDidLoad() {
  }

  getData() {
    this.diaryData.getDiary()
    .subscribe(data => {
      this.completeDiary = data;
      this.diary = this.dateDiary()
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


}
