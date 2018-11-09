"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class MyMap {
    constructor() {
        this.tileSets = [];
        this.tiles = [];
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
exports.MyMap = MyMap;
class MyTileSet {
    constructor(data) {
        this.data = data;
        this.firstgid = data.firstgid;
        let src = require("./tileset/" + data.source);
        this.columns = src.columns;
        this.image = new Image();
        this.image.src = "./tileset/" + src.image;
    }
    getLocalId(gid) {
        return gid - this.firstgid;
    }
    hasGid(gid) {
        return this.firstgid <= gid;
    }
    findTile(tileId) {
        return new Coords(tileId % this.columns, Math.floor(tileId / this.columns));
    }
}
exports.MyTileSet = MyTileSet;
class MyMapTile {
    constructor(coords, tileSet, tileSetCoords) {
        this.coords = coords;
        this.tileSet = tileSet;
        this.tileSetCoords = tileSetCoords;
    }
}
exports.MyMapTile = MyMapTile;
//# sourceMappingURL=myMap.js.map