import { Component } from '@angular/core';

import { DiaryPage } from '../diary/diary';
import { ChatPage } from '../chat/chat';
import { MePage } from '../me/me';
import { ConfigPage } from '../config/config';

import { ChatService, ProfileData, PresenceService } from '../../providers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DiaryPage;
  tab2Root: any = ChatPage;
  tab3Root: any = MePage;
  tab4Root: any = ConfigPage;
  unread: any;
  chats: any;
  profile: any

  constructor(
  	public chatService: ChatService,
  	public profileData: ProfileData,
    public presenceService: PresenceService
  ) {}

  ionViewDidLoad() {
  	this.countUnread();
  }

  countUnread() {
  	this.profile = this.profileData.current;
		this.chats = this.chatService.getChat(this.profile.coach, this.profile.$key)
		.subscribe( chat => {
  		this.unread = 0;
    	chat.forEach( msg => {
    		if (this.profile.$key !== msg.uid) {
    			if (!msg.read) {
    				this.unread += 1;
            console.log(this.unread);
    			}
    		}
    	});
    });
	}
}
