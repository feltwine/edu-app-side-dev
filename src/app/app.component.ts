import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp
} from 'ionicons/icons';
import {ClientService} from "./services/client/client.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    {title: 'Home', url: '/home', icon: 'mail'},
    {title: 'Inbox', url: '/folder/inbox', icon: 'mail'},
    {title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane'},
    {title: 'Favorites', url: '/folder/favorites', icon: 'heart'},
    {title: 'Archived', url: '/folder/archived', icon: 'archive'},
    {title: 'Trash', url: '/folder/trash', icon: 'trash'},
    {title: 'Avatar Settings', url: '/avatar-settings', icon: 'warning'},
    {title: 'Login', url: '/login-screen', icon: 'warning'},

  ];
  showMenu: boolean = true;

  constructor(private clientService: ClientService) {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
    });
    this.clientService.showMenu$.subscribe(isOn =>{
      this.showMenu = !isOn;
    });
  }
}
