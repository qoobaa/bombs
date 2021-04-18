YUI.add("bonuskick", function (Y) {

  var BonusKick = Y.Base.create("bonuskick", Y.Tile.Tile, [], {

    initializer: function () {
      this._sprite = new Y.Tile.Sprite({
        playing: false,
        image: "/assets/images/bonuskick.png"
      });
      this.on("engage", this._onEngage);
    },

    _onEngage: function (event) {
      if (event.source instanceof Y.Tile.Player) {
        event.source.set("kicking", true);
      }
      this.set("alive", false);
    }

  });

  Y.namespace("Tile").BonusKick = BonusKick;

}, "0", { requires: ["base-build", "tile", "sprite"] });
