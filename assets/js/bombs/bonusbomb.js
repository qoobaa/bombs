YUI.add("bonusbomb", function (Y) {

  var BonusBomb = Y.Base.create("bonusbomb", Y.Tile.Tile, [], {

    initializer: function () {
      this._sprite = new Y.Tile.Sprite({
        playing: false,
        image: "/assets/images/bonusbomb.png"
      });
      this.on("engage", this._onEngage);
    },

    _onEngage: function (event) {
      if (event.source instanceof Y.Tile.Player) {
        event.source.set("bombs", event.source.get("bombs") + 1);
      }
      this.set("alive", false);
    }

  });

  Y.namespace("Tile").BonusBomb = BonusBomb;

}, "0", { requires: ["base-build", "tile", "sprite"] });
