class Coords {
    constructor(public x: number, public y: number) {

    }
}

export class MyMap {
    tileSets: MyTileSet[] = [];
    tiles: MyMapTile[] = [];
    width: number;
    height: number;

    constructor() {
        let mapData = require('./tileset/MyMap.json');
        for (let tileSet of mapData.tilesets) {
            this.tileSets.push(new MyTileSet(tileSet));
        }
        this.width = mapData.width;
        this.height = mapData.height;
        for (let i = 0; i < mapData.layers[0].data.length; i++) {
            let tileSet = this.tileSets[this.tileSets.length - 1];
            for (let j = this.tileSets.length - 1; j >= 0; j--) {
                if (this.tileSets[j].hasGid(mapData.layers[0].data[i])) {
                    tileSet = this.tileSets[j];
                    break;
                }
            }
            this.tiles.push(new MyMapTile(new Coords(i % this.width, Math.floor(i / this.width)), tileSet, tileSet.findTile(tileSet.getLocalId(mapData.layers[0].data[i]))));
        }
    }
}

export class MyTileSet {
    columns: number;
    firstgid: number;
    image: HTMLImageElement;

    constructor(public data: any) {
        this.firstgid = data.firstgid;
        let src = require("./tileset/" + data.source);
        this.columns = src.columns;
        this.image = new Image();
        this.image.src = "./tileset/" + src.image;

    }

    getLocalId(gid: number): number {
        return gid - this.firstgid;
    }

    hasGid(gid: number): boolean {
        return this.firstgid <= gid;
    }

    findTile(tileId: number): Coords {
        return new Coords(tileId % this.columns, Math.floor(tileId / this.columns));
    }
}

export class MyMapTile {
    constructor(public coords: Coords, public tileSet: MyTileSet, public tileSetCoords: Coords) {

    }
}