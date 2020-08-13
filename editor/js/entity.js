
'use strict';

let Entity = {

    init(id, tilesetName, data) {
        this.id             = id;
        this.tilesetName    = tilesetName;
        this.data           = data.reduce((a, b) => a.concat(b), []);
        this.scaleValue     = 3;

        this.sprite         = Utils.getTilesetByName(tilesetName);

        // I’m lazy
        Pattern.extrapolateEndPoints.call(this);

        this.WIDTH          = this.TILES_WIDE * Global.TILE_SIZE;
        this.HEIGHT         = this.TILES_HIGH * Global.TILE_SIZE;

        this.canvas         = document.createElement('canvas');
        this.context        = this.canvas.getContext('2d');

        this.canvas.width   = this.WIDTH;
        this.canvas.height  = this.HEIGHT;

        // So very lazy
        Pattern.scale.call(this, 3);

        return this;
    },

    render() {
        let coords          = {};
        let spriteCoords    = {};

        for (let row = 0; row < this.TILES_HIGH; row++) {
            for (let col = 0; col < this.TILES_WIDE; col++) {

                let cell        = (row * this.TILES_WIDE) + col;
                let tile        = this.data[cell];
                spriteCoords    = this.sprite.cellToPx(tile);

                this.context.drawImage(this.sprite.img, spriteCoords.x, spriteCoords.y, 8, 8, (col * 8), (row * 8), 8, 8);
            }
        }
    }
}
