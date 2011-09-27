YUI.add("bombs-explodingwall", function (Y) {

    var ExplodingWall = Y.Base.create("explodingwall", Y.Tile.Base, [], {

        initializer: function () {
            this.on("touch", this._onTouch);
            this.on("aliveChange", this._onAliveChange);
        },

        _onAliveChange: function (event) {
            if (this.get("time") < this.get("ttl")) {
                event.preventDefault();
            }
        },

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
            event.source.stop();
        }

    }, {

        ATTRS: {

            ttl: {
                value: 10
            }

        }

    });

    Y.namespace("Bombs").ExplodingWall = ExplodingWall;

}, "0", { requires: ["base-build", "tile-base"] });
