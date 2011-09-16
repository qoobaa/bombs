YUI.add("bombs-bomb", function (Y) {

    var Bomb = Y.Base.create("bomb", Y.Tile.Base, [], {

        initializer: function () {
            this.on("touch", this._onTouch);
            this.after("aliveChange", this._afterAliveChange);
        },

        _afterAliveChange: function (event) {
            var player = this.get("player");

            if (!event.newVal) {
                if (player) {
                    player.set("bombs", player.get("bombs") + 1);
                }
            }
        },

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
            if (Y.instanceOf(event.source, Y.Bombs.Player) && event.source.get("kicking")) {
                this.setAttrs({ speed: event.source.get("speed"), direction: event.source.get("direction"), moving: true });
            } else {
                event.source.stop();
            }
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

    Y.namespace("Bombs").Bomb = Bomb;

}, "0", { requires: ["base-build", "tile-base"] });
