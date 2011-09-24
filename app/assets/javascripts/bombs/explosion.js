YUI.add("bombs-explosion", function (Y) {

    var Explosion = Y.Base.create("explosion", Y.Tile.Base, [], {

        initializer: function () {
            this.on("engage", this._onEngage);
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

    Y.namespace("Bombs").Explosion = Explosion;

}, "0", { requires: ["base-build", "tile-base"] });
