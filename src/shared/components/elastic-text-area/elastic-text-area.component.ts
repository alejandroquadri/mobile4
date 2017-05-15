import {Component, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'elastic-textarea',
  // inputs: ['placeholder', 'lineHeight'],
  template:
  `{{ _lineHeight }}
  <ion-textarea class="textArea" #ionTxtArea
    placeholder='{{placeholder}}'
    [(ngModel)]="content"
    (ngModelChange)='onChange($event)'>
  </ion-textarea>
  `,
  // templateUrl:'./elastic-text-area.component.html',
  styles: [`
    .textArea {
      background-color: white;
      border-radius: 10px;
    }
    
    textarea {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      margin-left: 0.8rem;
    }
  `]
})

// @Component({
//   selector: 'week-calendar',
//   templateUrl: 'week-calendar.html'
// })
export class ChatUiTextCompnent {

  content;
  txtArea;
  viewInit = false;
  @ViewChild('ionTxtArea') ionTxtArea;
  @Input() placeholder;
  @Input() lineHeight;

  constructor() {
    this.content = "";
    // this.lineHeight = "26px";
  }

  ngAfterViewInit(){
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    this.txtArea.style.height = this.lineHeight + "px";
    this.viewInit = true;
  }

  onChange(newValue){
    this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.style.height =  this.txtArea.scrollHeight + "px";
    console.log('cambio', newValue, this.txtArea.style.height);
  }

  clearInput(){
    this.content = "";
    this.txtArea.style.height = this.lineHeight + "px";
  }

}