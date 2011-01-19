YUI.add("hardwall", function (Y) {

    var HardWall = Y.Base.create("hardwall", Y.Tile.Tile, [], {

        initializer: function () {
            this._sprite = new Y.Tile.Sprite({
                playing: false,
                image: "images/hardwall.png"
            });
            this.on("touch", this._onTouch);
            this.on("aliveChange", this._onAliveChange);
        },

        _onAliveChange: function (event) {
            event.preventDefault();
        },

        draw: function (context) {
            this._sprite.draw(
                context,
                this.get("col") * 32 + Math.round(this.get("horizontalOffset") * 32 / 2),
                this.get("row") * 32 + Math.round(this.get("verticalOffset") * 32 / 2)
            );
        },

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
        }

    });

    Y.namespace("Tile").HardWall = HardWall;

}, "0", { requires: ["base-build", "tile", "sprite"] });
