YUI.add("bomb", function (Y) {

  var Bomb = Y.Base.create("bomb", Y.Tile.Tile, [], {

    initializer: function () {
      this._sprite = new Y.Tile.Sprite({
        playing: true,
        image: "/assets/images/bomb.png",
        frames: 4,
        speed: 0.5
      });
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
      if (event.source instanceof Y.Tile.Player && event.source.get("kicking")) {
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

  Y.namespace("Tile").Bomb = Bomb;

}, "0", { requires: ["base-build", "tile", "sprite"] });
