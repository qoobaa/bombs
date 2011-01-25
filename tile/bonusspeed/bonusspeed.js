YUI.add("bonusspeed", function (Y) {

    var BonusSpeed = Y.Base.create("bonusspeed", Y.Tile.Tile, [], {

        initializer: function () {
            this._sprite = new Y.Tile.Sprite({
                playing: false,
                image: "images/bonusspeed.png"
            });
            this.on("engage", this._onEngage);
        },

        _onEngage: function (event) {
            if (event.source instanceof Y.Tile.Player) {
                event.source.set("speed", event.source.get("speed") + 0.05);
            }
            this.set("alive", false);
        }

    });

    Y.namespace("Tile").BonusSpeed = BonusSpeed;

}, "0", { requires: ["base-build", "tile", "sprite"] });
