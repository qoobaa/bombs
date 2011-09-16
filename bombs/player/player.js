YUI.add("bombs-player", function (Y) {

    var Player = Y.Base.create("player", Y.Tile.Base, [], {

        initializer: function () {
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

        _onTouch: function (event) {
            if (Y.instanceOf(event.source, Y.Bombs.Bomb)) {
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

            kicking: {
                value: false,
                validator: Y.Lang.isBoolean
            }

        }

    });

    Y.namespace("Bombs").Player = Player;

}, "0", { requires: ["base-build", "tile-base", "bombs-bomb"] });
