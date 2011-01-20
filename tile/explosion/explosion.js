YUI.add("explosion", function (Y) {

    var Explosion = Y.Base.create("explosion", Y.Tile.Tile, [], {

        initializer: function () {
            this._sprite = new Y.Tile.Sprite({
                playing: true,
                looping: false,
                image: "images/explosion.png",
                frames: 4,
                speed: 0.25
            });
            this.on("engage", this._onEngage);
            this.after("explosionDirectionChange", this._afterExplosionDirectionChange);
            this.after("explosionEndChange", this._afterExplosionEndChange);
            this._syncSpriteRow(this.get("explosionDirection"), this.get("explosionEnd"));
        },

        _syncSpriteRow: function (explosionDirection, explosionEnd) {
            var row = 0;

            switch (explosionDirection) {
            case Y.Tile.Tile.UP:
                row = explosionEnd ? 3 : 1;
                break;
            case Y.Tile.Tile.RIGHT:
                row = explosionEnd ? 4 : 2;
                break;
            case Y.Tile.Tile.DOWN:
                row = explosionEnd ? 5 : 1;
                break;
            case Y.Tile.Tile.LEFT:
                row = explosionEnd ? 6 : 2;
                break;
            }

            this._sprite.set("row", row);
        },

        _afterExplosionDirectionChange: function (event) {
            this._syncSpriteRow(event.newVal, this.get("explosionEnd"));
        },

        _afterExplosionEndChange: function (event) {
            this._syncSpriteRow(this.get("explosionDirection"), event.newVal);
        },

        _onEngage: function (event) {
            event.source.set("alive", false);
        }

    }, {

        ATTRS: {

            ttl: {
                value: 16
            },

            explosionDirection: {

            },

            explosionEnd: {
                value: false
            }

        }

    });

    Y.namespace("Tile").Explosion = Explosion;

}, "0", { requires: ["base-build", "tile", "sprite"] });
