YUI.add("hardwall", function (Y) {

    var HardWall = Y.Base.create("hardwall", Y.Tile.Tile, [], {

        initializer: function () {
            this._sprite = new Y.Tile.Sprite({ playing: false, image: "/images/hardwall.png" });
        },

        draw: function (context) {
            this._sprite.draw(
                context,
                this.get("col") * 32 + this.get("horizontalOffset") * 32 / 2,
                this.get("row") * 32 + this.get("verticalOffset") * 32 / 2
            );
        },

        onTouch: function (event) {
            event.preventDefault();
        }

    }, {

        ATTRS: {

        }

    });

    Y.namespace("Tile").HardWall = HardWall;

}, "0", { requires: ["base-build", "tile", "sprite"] });
