YUI.add("sprite", function (Y) {

  var Sprite = Y.Base.create("sprite", Y.Base, [], {

    initializer: function () {
      this.on("currentFrameChange", this._onCurrentFrameChange);
    },

    _onCurrentFrameChange: function (event) {
      if (Math.round(event.newVal) === this.get("frames")) {
        if (this.get("looping")) {
          event.newVal -= this.get("frames");
        } else {
          event.preventDefault();
          this.set("playing", false);
        }
      }
    },

    draw: function (context, dx, dy) {
      context.drawImage(
        this.get("image"),
        this.get("col") * this.get("frameWidth"),          // sx
        this.get("row") * this.get("frameHeight"),         // sy
        this.get("frameWidth"),                            // sw
        this.get("frameHeight"),                           // sh
        dx,                                                // dx
        dy,                                                // dy
        this.get("frameWidth"),                            // dw
        this.get("frameHeight")                            // dh
      );

      if (this.get("playing")) {
        this.set("currentFrame", this.get("currentFrame") + this.get("speed"));
      }
    }

  }, {

    ATTRS: {

      frameWidth: {
        validator: Y.Lang.isNumber,
        value: 32
      },

      frameHeight: {
        validator: Y.Lang.isNumber,
        value: 32
      },

      currentFrame: {
        validator: Y.Lang.isNumber,
        value: 0
      },

      row: {
        validator: Y.Lang.isNumber,
        value: 0
      },

      col: {
        readOnly: true,
        getter: function () {
          return Math.round(this.get("currentFrame"));
        }
      },

      frames: {
        validator: Y.Lang.isNumber,
        value: 1
      },

      looping: {
        validator: Y.Lang.isBoolean,
        value: true
      },

      playing: {
        validator: Y.Lang.isBoolean,
        value: true
      },

      speed: {
        validator: Y.Lang.isNumber,
        value: 1
      },

      image: {
        value: new Image(),
        setter: function (image) {
          if (image instanceof Image) {
            return image;
          } else if (Y.Lang.isString(image)) {
            var img = new Image();
            if (Y.Lang.isValue(window.IMAGES)) {
              img.src = window.IMAGES[image]; // temporary
            } else {
              img.src = image;
            }
            return img;
          } else {
            return Y.Attribute.INVALID_VALUE;
          }
        }
      }

    }

  });

  Y.namespace("Tile").Sprite = Sprite;

}, "0", { requires: ["base-build"] });
