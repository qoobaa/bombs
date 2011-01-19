YUI.add("bomb", function (Y) {

    var Bomb = Y.Base.create("bomb", Y.Tile.Tile, [], {

        initializer: function () {
            this._sprite = new Y.Tile.Sprite({
                playing: true,
                image: "/images/bomb.png",
                frames: 4,
                speed: 0.5
            });
            this.on("touch", this._onTouch);
        },

        draw: function (context) {
            this._sprite.draw(
                context,
                this.get("col") * 32 + this.get("horizontalOffset") * 32 / 2,
                this.get("row") * 32 + this.get("verticalOffset") * 32 / 2
            );
        },

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
        }

    }, {

        ATTRS: {

            player: {

            },

            ttl: {
                value: 100
            }

        }

    });

    Y.namespace("Tile").Bomb = Bomb;

}, "0", { requires: ["base-build", "tile", "sprite"] });
