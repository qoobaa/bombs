YUI.add("bombs-bonuspower", function (Y) {

    var BonusPower = Y.Base.create("bonuspower", Y.Tile.Base, [], {

        initializer: function () {
            this.on("engage", this._onEngage);
        },

        _onEngage: function (event) {
            if (Y.instanceOf(event.source, Y.Bombs.Player)) {
                event.source.set("power", event.source.get("power") + 1);
            }
            this.set("alive", false);
        }

    });

    Y.namespace("Bombs").BonusPower = BonusPower;

}, "0", { requires: ["base-build", "tile-base"] });
