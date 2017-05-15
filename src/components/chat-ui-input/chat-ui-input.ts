import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'chat-ui-input',
  templateUrl: 'chat-ui-input.html'
})
export class ChatUIInput {

  content;
  txtArea;
  lineHeight;
  viewInit = false;
  @ViewChild('ionTxtArea') ionTxtArea;
  @Input() placeholder;
  @Output() sendMes = new EventEmitter();

  constructor() {
    this.content = "";
    this.lineHeight = 12;
  }

  ngAfterViewInit(){
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    this.txtArea.style.height = this.lineHeight + "px";
    this.viewInit = true;
  }

  onChange(newValue){
    this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.style.height =  this.txtArea.scrollHeight + "px";
  }

  send(){
  	const mes = this.content;
  	this.sendMes.emit(mes);
    this.content = "";
    this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.focus();
  }

}
