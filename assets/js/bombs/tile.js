YUI.add("tile", function (Y) {

  var UP =    { direction: "up"    },
      RIGHT = { direction: "right" },
      DOWN =  { direction: "down"  },
      LEFT =  { direction: "left"  };

  var Tile = Y.Base.create("tile", Y.Base, [], {

    initializer: function () {
      this.on("horizontalOffsetChange", this._onHorizontalOffsetChange);
      this.on("verticalOffsetChange", this._onVerticalOffsetChange);
      this.on("speedChange", this._onSpeedChange);
      this.after("timeChange", this._afterTimeChange);
    },

    _onHorizontalOffsetChange: function (event) {
      if (event.newVal !== 0) {
        this.set("verticalOffset", 0);
      }
      if (event.newVal > 1) {
        event.newVal -= 2;
        this.set("col", this.get("col") + 1);
      } else if (event.newVal < -1) {
        event.newVal += 2;
        this.set("col", this.get("col") - 1);
      }
    },

    _onVerticalOffsetChange: function (event) {
      if (event.newVal !== 0) {
        this.set("horizontalOffset", 0);
      }
      if (event.newVal > 1) {
        event.newVal -= 2;
        this.set("row", this.get("row") + 1);
      } else if (event.newVal < -1) {
        event.newVal += 2;
        this.set("row", this.get("row") - 1);
      }
    },

    _onSpeedChange: function (event) {
      if (event.newVal > 1) {
        event.preventDefault();
      }
    },

    _afterTimeChange: function (event) {
      if (Y.Lang.isValue(this.get("ttl")) && event.newVal >= this.get("ttl")) {
        this.set("alive", false);
      }
    },

    act: function () {
      this.set("time", this.get("time") + 1);
      if (this.get("moving")) {
        this._move();
      }
    },

    _isMovedHorizontally: function () {
      return Math.abs(this.get("horizontalOffset")) > this.get("speed");
    },

    _isMovedVertically: function () {
      return Math.abs(this.get("verticalOffset")) > this.get("speed");
    },

    _move: function () {
      switch (this.get("direction")) {
      case UP:
        if (this._isMovedHorizontally()) {
          this._stepCenter();
        } else {
          this._stepUp();
        }
        break;
      case RIGHT:
        if (this._isMovedVertically()) {
          this._stepCenter();
        } else {
          this._stepRight();
        }
        break;
      case DOWN:
        if (this._isMovedHorizontally()) {
          this._stepCenter();
        } else {
          this._stepDown();
        }
        break;
      case LEFT:
        if (this._isMovedVertically()) {
          this._stepCenter();
        } else {
          this._stepLeft();
        }
        break;
      }
    },

    _stepCenter: function () {
      if (this.get("verticalOffset") < 0) {
        this._stepDown();
      } else if (this.get("verticalOffset") > 0) {
        this._stepUp();
      } else if (this.get("horizontalOffset") < 0) {
        this._stepRight();
      } else if (this.get("horizontalOffset") > 0) {
        this._stepLeft();
      }
    },

    _stepUp: function () {
      this.setAttrs({ animationDirection: UP, verticalOffset: this.get("verticalOffset") - this.get("speed") });
    },

    _stepRight: function () {
      this.setAttrs({ animationDirection: RIGHT, horizontalOffset: this.get("horizontalOffset") + this.get("speed") });
    },

    _stepDown: function () {
      this.setAttrs({ animationDirection: DOWN, verticalOffset: this.get("verticalOffset") + this.get("speed") });
    },

    _stepLeft: function () {
      this.setAttrs({ animationDirection: LEFT, horizontalOffset: this.get("horizontalOffset") - this.get("speed") });
    },

    stop: function () {
      this.setAttrs({ moving: false, verticalOffset: 0, horizontalOffset: 0 });
    },

    _validateDirection: function (direction) {
      return Y.Array.indexOf([UP, RIGHT, DOWN, LEFT], direction) !== -1;
    },

    draw: function (context) {
      this._sprite.draw(
        context,
        this.get("col") * 32 + Math.round(this.get("horizontalOffset") * 32 / 2),
        this.get("row") * 32 + Math.round(this.get("verticalOffset") * 32 / 2)
      );
    }

  }, {

    ATTRS: {

      row: {
        validator: Y.Lang.isNumber,
        value: 0
      },

      col: {
        validator: Y.Lang.isNumber,
        value: 0
      },

      position: {
        getter: function () {
          return [this.get("row"), this.get("col")];
        },
        setter: function (position) {
          this.setAttrs({ row: position[0], col: position[1] });
        }
      },

      horizontalOffset: {
        validator: Y.Lang.isNumber,
        value: 0
      },

      verticalOffset: {
        validator: Y.Lang.isNumber,
        value: 0
      },

      offset: {
        getter: function () {
          return [this.get("horizontalOffset"), this.get("verticalOffset")];
        },
        setter: function (offset) {
          this.setAttrs({ horizontalOffset: offset[0], verticalOffset: offset[1] });
        }
      },

      speed: {
        validator: Y.Lang.isNumber,
        value: 0.1
      },

      moving: {
        validator: Y.Lang.isBoolean,
        value: false
      },

      direction: {
        validator: "_validateDirection",
        value: DOWN
      },

      animationDirection: {
        validator: "_validateDirection",
        value: DOWN
      },

      time: {
        value: 0,
        validator: Y.Lang.isNumber
      },

      ttl: {
        value: undefined
      },

      alive: {
        validator: Y.Lang.isBoolean,
        value: true
      },

      drawPriority: {
        validator: Y.Lang.isNumber,
        value: 0
      },

      drawOrder: {
        readOnly: true,
        getter: function () {
          return this.get("row") + this.get("verticalOffset") + this.get("drawPriority");
        }
      }

    },

    UP:    UP,
    RIGHT: RIGHT,
    DOWN:  DOWN,
    LEFT:  LEFT

  });

  Y.namespace("Tile").Tile = Tile;

}, "0", { requires: ["base-build", "collection"] });
