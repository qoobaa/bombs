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

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
            event.source.stop();
        }

    });

    Y.namespace("Tile").HardWall = HardWall;

}, "0", { requires: ["base-build", "tile", "sprite"] });
