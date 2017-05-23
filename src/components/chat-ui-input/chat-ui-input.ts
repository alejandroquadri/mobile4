import { Component, ViewChild, Input, Output, EventEmitter, Renderer } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'chat-ui-input',
  templateUrl: 'chat-ui-input.html'
})
export class ChatUIInput {

  content;
  txtArea;
  // lineHeight;
  // textAreaHeight;
  viewInit = false;
  @ViewChild('ionTxtArea') ionTxtArea;
  @Input() placeholder;
  @Output() sendMes = new EventEmitter();

  constructor(
    public keyboard: Keyboard,
    private renderer: Renderer
  ) {
    this.content = "";
    // this.lineHeight = 12;
  }

  ngAfterViewInit(){
    // console.log(this.ionTxtArea);
    // this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    // this.txtArea = this.ionTxtArea.nativeElement;
    // this.textAreaHeight = this.txtArea.style.height
    // this.textAreaHeight = this.lineHeight + "px";
    this.viewInit = true;
  }

  onChange(newValue){
    // this.textAreaHeight = this.lineHeight + "px";
    // this.textAreaHeight =  this.txtArea.scrollHeight + "px";
  }

  send(){
  	const mes = this.content;
  	this.sendMes.emit(mes);
    this.content = "";
    // this.textAreaHeight = this.lineHeight + "px";
    // this.focus();
    // this.keyboard.show();
  }

  touchSendButton(event: Event) {
    console.log('touchSendButton, event type:', event.type);
    event.preventDefault();
    this.send();
  }

}
