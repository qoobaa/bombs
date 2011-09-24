YUI.add("bombs-bonuskick", function (Y) {

    var BonusKick = Y.Base.create("bonuskick", Y.Tile.Base, [], {

        initializer: function () {
            this.on("engage", this._onEngage);
        },

        _onEngage: function (event) {
            if (Y.instanceOf(event.source, Y.Bombs.Player)) {
                event.source.set("kicking", true);
            }
            this.set("alive", false);
        }

    });

    Y.namespace("Bombs").BonusKick = BonusKick;

}, "0", { requires: ["base-build", "tile-base"] });
