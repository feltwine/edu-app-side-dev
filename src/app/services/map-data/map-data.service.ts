import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HexMapModel} from "../../models/hex-map.model";

@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  private currentMap: HexMapModel | null = null;

  constructor() {
  }

  // Provisional generator of map
  generateMapData(): Observable<HexMapModel> {
    const tileCount = 5000;

    const hexMap: HexMapModel = {
      mapID: '01' + Math.floor(Math.random() * tileCount),
      tileCount: tileCount,
      columnsCount: 0,
      rowsCount: 0,

      columns: []
    };

    // Set width and height ratios based on a 4:3 aspect ratio
    const gridWidth: number = Math.ceil(Math.sqrt((tileCount * 4) / 3));
    const gridHeight: number = Math.ceil(tileCount / gridWidth);

    hexMap.columnsCount = gridWidth;
    hexMap.rowsCount = gridHeight;

    // Generate dynamically
    for (let col: number = 0; col < gridWidth; col++) {
      const column = {
        rows: [] as {
          tile: {
            tileID: string,
            ownerID: string,
            typeID: string
          };
        }[]
      };

      for (let row: number = 0; row < gridHeight; row++) {
        const colPadded: string = col.toString().padStart(3, '0'); // Pad col to 3 digits
        const rowPadded: string = row.toString().padStart(3, '0'); // Pad row to 3 digits
        column.rows.push({
          tile: {
              tileID: `02${colPadded}${rowPadded}`, // Unique tile ID
              ownerID: '10' + '0001',       // ID of the tile owner
              typeID: '03' + '0001'         // ID for the type of tile
          }
        });
      }

      hexMap.columns.push(column);
    }

    this.currentMap = hexMap;
    return of(hexMap);
  }

  getMap(): Observable<HexMapModel | null> {
    return of(this.currentMap);
  }
}
