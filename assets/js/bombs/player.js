YUI.add("player", function (Y) {

  var Player = Y.Base.create("player", Y.Tile.Tile, [], {

    initializer: function () {
      this._sprite = new Y.Tile.Sprite({
        frames: 8,
        playing: false,
        image: "assets/images/player" + this.get("number") + ".png",
        speed: 0.5,
        frameHeight: 48,
        row: 2
      });

      this.publish("bombsChange");

      this.after("movingChange", this._afterMovingChange);
      this.after("animationDirectionChange", this._afterAnimationDirectionChange);
      this.on("touch", this._onTouch);
    },

    bomb: function () {
      if (this.get("bombs") > 0) {
        this.set("bombs", this.get("bombs") - 1);
      }
    },

    _afterMovingChange: function (event) {
      this._sprite.setAttrs({ playing: event.newVal, currentFrame: 0 });
    },

    _afterAnimationDirectionChange: function (event) {
      switch (event.newVal) {
      case Y.Tile.Tile.UP:
        this._sprite.set("row", 0);
        break;
      case Y.Tile.Tile.RIGHT:
        this._sprite.set("row", 1);
        break;
      case Y.Tile.Tile.DOWN:
        this._sprite.set("row", 2);
        break;
      case Y.Tile.Tile.LEFT:
        this._sprite.set("row", 3);
        break;
      }
    },

    draw: function (context) {
      this._sprite.draw(
        context,
        this.get("col") * 32 + Math.round(this.get("horizontalOffset") * 32 / 2),
        this.get("row") * 32 + Math.round(this.get("verticalOffset") * 32 / 2 - 16)
      );
    },

    _onTouch: function (event) {
      if (event.source instanceof Y.Tile.Bomb) {
        event.originalEvent.preventDefault();
        event.source.stop();
      }
    }

  }, {

    ATTRS: {

      number: {
        value: 1
      },

      bombs: {
        value: 1,
        validator: Y.Lang.isNumber
      },

      power: {
        value: 2,
        validator: Y.Lang.isNumber
      },

      speed: {
        value: 0.2
      },

      drawPriority: {
        value: 1000
      },

      kicking: {
        value: false,
        validator: Y.Lang.isBoolean
      }

    }

  });

  Y.namespace("Tile").Player = Player;

}, "0", { requires: ["base-build", "tile", "sprite", "bomb"] });
