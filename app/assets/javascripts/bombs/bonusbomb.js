YUI.add("bombs-bonusbomb", function (Y) {

    var BonusBomb = Y.Base.create("bonusbomb", Y.Tile.Base, [], {

        initializer: function () {
            this.on("engage", this._onEngage);
        },

        _onEngage: function (event) {
            if (Y.instanceOf(event.source, Y.Bombs.Player)) {
                event.source.set("bombs", event.source.get("bombs") + 1);
            }
            this.set("alive", false);
        }

    });

    Y.namespace("Bombs").BonusBomb = BonusBomb;

}, "0", { requires: ["base-build", "tile-base"] });
