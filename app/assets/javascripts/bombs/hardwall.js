YUI.add("bombs-hardwall", function (Y) {

    var HardWall = Y.Base.create("hardwall", Y.Tile.Base, [], {

        initializer: function () {
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

    Y.namespace("Bombs").HardWall = HardWall;

}, "0", { requires: ["base-build", "tile-base"] });
