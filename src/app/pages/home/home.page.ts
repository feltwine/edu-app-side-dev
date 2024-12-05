import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ClientService} from '../../services/client/client.service'
import {HexMapModel} from "../../models/hex-map.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class HomePage implements OnInit {
  mapData: HexMapModel | null = null;

  constructor(private router: Router, private clientService: ClientService) {
  }

  startGame() {
    this.clientService.hideMenu(); // Hides app component

    // Generate new map, save it locally and checkout to game page
    this.clientService.startNewGame().subscribe((map: HexMapModel) => {
      this.clientService.setMapData(map)
      this.router.navigate(['/game']);
    });
  }


  ngOnInit() {
    return 0;
  }


  /**
   * // Retrieve the saved map data as an observable
   *   getMapData(): Observable<HexMapModel> {
   *     if (this.hexMap) {
   *       // If hexMap is already set, return it as an observable
   *       return of(this.hexMap);
   *     } else {
   *       // If hexMap is not set, fetch a new map and save it
   *       return this.startNewGame();
   *     }
   *   }
   */
}
