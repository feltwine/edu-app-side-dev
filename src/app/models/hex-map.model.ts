export interface HexMapModel {
  mapID: string;
  tileCount: number;
  columnsCount: number;
  rowsCount: number;

  columns: {
    rows: {
      tile: {
        tileID: string;
        ownerID: string;
        typeID: string;
      };
    }[];
  }[];
}
