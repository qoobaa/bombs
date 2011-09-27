YUI.add("bombs-softwall", function (Y) {

    var SoftWall = Y.Base.create("softwall", Y.Tile.Base, [], {

        initializer: function () {
            this.on("touch", this._onTouch);
            this.on("aliveChange", this._onAliveChange);
        },

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
            event.source.stop();
        }

    });

    Y.namespace("Bombs").SoftWall = SoftWall;

}, "0", { requires: ["base-build", "tile-base"] });
