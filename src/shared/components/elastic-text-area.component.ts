import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'elastic-textarea',
  inputs: ['placeholder', 'lineHeight'],
  template:
  `
  <ion-textarea class="textArea" #ionTxtArea
    placeholder='{{placeholder}}'
    [(ngModel)]="content"
    (ngModelChange)='onChange($event)'>
  </ion-textarea>
  `,
  styles: [`
    .textArea {
      background-color: white;
      border-radius: 10px;
    }
    
    textarea {
      height: 22px;
      padding-left: 1vh;
      padding-top: 0.5vh;
      margin-top: 1vh;
      margin-bottom: 1vh;
      margin-left: 8px;
    }
  `]
})

export class ElasticTextarea {

  content;
  lineHeight;
  txtArea;
  @ViewChild('ionTxtArea') ionTxtArea;

  constructor() {
    this.content = "";
    this.lineHeight = "22px";
  }

  ngAfterViewInit(){
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    this.txtArea.style.height = this.lineHeight + "px";
  }

  onChange(newValue){
    this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.style.height =  this.txtArea.scrollHeight + "px";
  }

  clearInput(){
    this.content = "";
    this.txtArea.style.height = this.lineHeight + "px";
  }
}