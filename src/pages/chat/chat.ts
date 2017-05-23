import { Component, ViewChild, Renderer } from '@angular/core';
import { Content, NavController, Platform } from 'ionic-angular';
import { AngularFire,  } from 'angularfire2';
import { Keyboard } from '@ionic-native/keyboard';
import * as moment from 'moment';

import { ProfileData, ChatService, ActivityService } from '../../providers';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  // public preventBlur: boolean = false;

  messages: any;
  profile: any;
  profileObject: any
  coachProfile: any;
  chat: any;
  mesContent;

  // para que funcione el teclado
  @ViewChild(Content) content: Content;
  inputElement: any;
  millis = 200;
  scrollTimeout = this.millis + 50;
  textareaHeight
  scrollContentElement: any;
  footerElement: any;
  initialTextAreaHeight;
  keyboardHideSub: any;
  keybaordShowSub: any;

  //agrego
  tabBar: any
  tabsHeight: any;
  headerElement: any;
  footerHeight: any;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    public profileData: ProfileData,
    public chatService: ChatService,
    public activityService: ActivityService,
    public platform: Platform,
    private keyboard: Keyboard,
    public renderer: Renderer
) {}

  ionViewDidLoad() {
    this.profileObject = this.profileData.current;
    this.profileData.getCoachProfileOnce()
    .then( coach => {
      this.coachProfile = coach.val()
    })
    this.chat = this.chatService.getChat(this.profileObject.coach , this.profileObject.$key)

    this.addKeyboardStyle();
    
  }

  ionViewDidEnter(){
    this.profileObject = this.profileData.current;
    this.chatService.mesRead();
    if (this.platform.is('ios')) {
      console.log('es ios agrega listeners');
      this.addKeyboardListeners()
    }
    this.keyboard.disableScroll(true);
  }

  ionViewDidLeave() {
    // console.log('salio');
    this.chatService.offCheckRead();
    this.removeKeyboardListeners();
    this.keyboard.disableScroll(false);
  }

  addKeyboardStyle() {

    this.scrollContentElement = this.content.getScrollElement();
    this.footerElement = document.getElementsByTagName('page-chat')[0].getElementsByTagName('ion-footer')[0];
    this.headerElement = document.getElementsByTagName('page-chat')[0].getElementsByTagName('ion-header')[0];
    this.inputElement = document.getElementsByTagName('page-chat')[0].getElementsByTagName('textarea')[0];
    this.tabBar = document.getElementsByClassName('tabbar')[0]
   
    console.log(this.scrollContentElement);
    console.log(this.inputElement);
    console.log(this.footerElement);
    console.log(this.tabBar);

    this.footerElement.style.cssText = this.footerElement.style.cssText +
      "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElement.style.cssText = this.scrollContentElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.tabsHeight = this.tabBar.offsetHeight;
    this.footerHeight = this.footerElement.offsetHeight;
    this.initialTextAreaHeight = this.textareaHeight;

    this.updateScroll('load', 500)
  }

  addKeyboardListeners() {

    this.keyboardHideSub = this.keyboard.onKeyboardHide().subscribe(() => {
      let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44 + this.tabsHeight;
      let marginBottom = newHeight + 'px';
      console.log('marginBottom', marginBottom, this.textareaHeight, this.initialTextAreaHeight, 44);

      this.renderer.setElementStyle(this.tabBar, 'display', 'flex');
      this.renderer.setElementClass(this.footerElement, 'footerNoTab', false);

      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      // this.renderer.setElementStyle(this.footerElement, 'marginBottom', this.tabsHeight)
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
    });

    this.keybaordShowSub = this.keyboard.onKeyboardShow().subscribe((e) => {

      let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight //- this.tabsHeight;
      let marginBottom = newHeight + 44 + 'px';
      console.log('marginBottom', marginBottom, (e['keyboardHeight']), this.textareaHeight, this.initialTextAreaHeight, 44);

      this.renderer.setElementStyle(this.tabBar, 'display', 'none');
      this.renderer.setElementClass(this.footerElement, 'footerNoTab', true);

      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
      this.updateScroll('keybaord show', this.scrollTimeout);
    });

  }

  removeKeyboardListeners() {
    console.log('salen los listeners');
    this.keyboardHideSub.unsubscribe();
    this.keybaordShowSub.unsubscribe();
  }

  updateScroll(from, timeout) {
    setTimeout(() => {
      console.log('updating scroll -->', from)
      this.content.scrollToBottom();
    }, timeout);
  }

  send() {
    const mes = this.mesContent;
    if (mes) {
      this.mesContent = null;
      let currentHeight = this.scrollContentElement.style.marginBottom.replace('px', '');
      let newHeight = currentHeight - this.textareaHeight + this.initialTextAreaHeight;
      let top = newHeight + 'px';
      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', top);
      this.updateScroll('sendMessage', this.scrollTimeout);
      this.textareaHeight = this.initialTextAreaHeight;

      let form = {
        content: mes,
        uid: this.profileObject.$key,
        read: false,
        displayName: this.profileObject.displayName,
        timestamp: moment().format(),
      }
      this.chatService.pushMsg(this.profileObject.coach, this.profileObject.$key, form)
      .then (
        (ret) => {
          this.activityService.updateUnreadMsgCoach(true);
        },
        (err) => console.log('error', err)
      );

    }
  }

  footerTouchStart(event) {
    console.log('footerTouchStart: ', event.type, event.target.localName, '...')
    if (event.target.localName !== "textarea") {
      event.preventDefault();
      console.log('preventing')
    }
  }

  contentMouseDown(event) {
    console.log('blurring input element :- > event type:', event.type);
    this.inputElement.blur();
  }

  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElement.style.marginBottom.replace('px', '')) + diffHeight;

      let marginBottom = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.updateScroll('textAreaChange', this.scrollTimeout);
    }
  }

  touchSendButton(event: Event) {
    console.log('touchSendButton, event type:', event.type);
    event.preventDefault();
    this.send();;
  }

  textAreaFocus() {
    console.log('hice focus en el textara');
  }

}
