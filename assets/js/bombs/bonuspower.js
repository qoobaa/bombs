YUI.add("bonuspower", function (Y) {

  var BonusPower = Y.Base.create("bonuspower", Y.Tile.Tile, [], {

    initializer: function () {
      this._sprite = new Y.Tile.Sprite({
        playing: false,
        image: "/assets/images/bonuspower.png"
      });
      this.on("engage", this._onEngage);
    },

    _onEngage: function (event) {
      if (event.source instanceof Y.Tile.Player) {
        event.source.set("power", event.source.get("power") + 1);
      }
      this.set("alive", false);
    }

  });

  Y.namespace("Tile").BonusPower = BonusPower;

}, "0", { requires: ["base-build", "tile", "sprite"] });
