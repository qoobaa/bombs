YUI.add("bombs-bonusspeed", function (Y) {

    var BonusSpeed = Y.Base.create("bonusspeed", Y.Tile.Base, [], {

        initializer: function () {
            this.on("engage", this._onEngage);
        },

        _onEngage: function (event) {
            if (Y.instanceOf(event.source, Y.Bombs.Player)) {
                event.source.set("speed", event.source.get("speed") + 0.05);
            }
            this.set("alive", false);
        }

    });

    Y.namespace("Bombs").BonusSpeed = BonusSpeed;

}, "0", { requires: ["base-build", "tile-base"] });
