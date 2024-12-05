import { Injectable } from '@angular/core';
import { HexMapModel } from "../../models/hex-map.model";
import { MapDataService } from "../map-data/map-data.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private hexMap: HexMapModel | undefined;
  public showMenuSubject: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  showMenu$: Observable<boolean> = this.showMenuSubject.asObservable();

  constructor(private mapDataService: MapDataService) { }

  hideMenu(): void {
    this.showMenuSubject.next(true);
  }

  // Request a new game map from the server simulator
  startNewGame(): Observable<HexMapModel> {
    return this.mapDataService.generateMapData().pipe(
      switchMap((map: HexMapModel) => {
        this.setMapData(map); // Save the new map locally
        return of(map);       // Return the new map as an observable
      })
    );
  }

  // Save map locally
  setMapData(map: HexMapModel): void {
    this.hexMap = map;
  }

  // Retrieve the saved map data as an observable
  getMapData(): Observable<HexMapModel> {
    if (this.hexMap) {
      // If hexMap is already set, return it as an observable
      return of(this.hexMap);
    } else {
      // If hexMap is not set, fetch a new map and save it
      return this.startNewGame();
    }
  }
}
