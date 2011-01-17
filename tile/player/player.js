YUI.add("player", function (Y) {

    var Player = Y.Base.create("player", Y.Tile.Tile, [], {

        initializer: function () {
            this._sprite = new Y.Tile.Sprite({ frames: 8, playing: false, image: "/images/player1d.png", speed: 0.5, frameHeight: 48 });
            this.after("movingChange", this._afterMovingChange);
            this.after("animationDirectionChange", this._afterAnimationDirectionChange);
        },

        _afterMovingChange: function (event) {
            this._sprite.setAttrs({ playing: event.newVal });
        },

        _afterAnimationDirectionChange: function (event) {
            switch (event.newVal) {
            case Y.Tile.Tile.UP:
                this._sprite = new Y.Tile.Sprite({ frames: 8, image: "/images/player1u.png", speed: 0.5, frameHeight: 48, playing: this.get("moving") });
                break;
            case Y.Tile.Tile.RIGHT:
                this._sprite = new Y.Tile.Sprite({ frames: 8, image: "/images/player1r.png", speed: 0.5, frameHeight: 48, playing: this.get("moving") });
                break;
            case Y.Tile.Tile.DOWN:
                this._sprite = new Y.Tile.Sprite({ frames: 8, image: "/images/player1d.png", speed: 0.5, frameHeight: 48, playing: this.get("moving") });
                break;
            case Y.Tile.Tile.LEFT:
                this._sprite = new Y.Tile.Sprite({ frames: 8, image: "/images/player1l.png", speed: 0.5, frameHeight: 48, playing: this.get("moving") });
                break;
            }
        },

        draw: function (context) {
            this._sprite.draw(context, 0, 0);
        }

    }, {

        ATTRS: {

            number: {

            }

        }

    });

    Y.namespace("Tile").Player = Player;

}, "0", { requires: ["base-build", "tile", "sprite"] });
