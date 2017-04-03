import { Component } from '@angular/core';

import { DiaryPage } from '../diary/diary';
import { ChatPage } from '../chat/chat';
import { MePage } from '../me/me';
import { ConfigPage } from '../config/config';

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

  constructor() {
  }
}
