YUI.add("softwall", function (Y) {

    var SoftWall = Y.Base.create("softwall", Y.Tile.Tile, [], {

        initializer: function () {
            this._sprite = new Y.Tile.Sprite({
                playing: false,
                looping: false,
                frames: 6,
                speed: 0.5,
                image: "images/softwall.png"
            });
            this.on("touch", this._onTouch);
            this.on("aliveChange", this._onAliveChange);
        },

        _onAliveChange: function (event) {
            if (!Y.Lang.isValue(this.get("ttl")) && !event.newVal) {
                event.preventDefault();
                this.setAttrs({ time: 0, ttl: 10 });
                this._sprite.set("playing", true);
            } else if (Y.Lang.isValue(this.get("time")) && this.get("time") < this.get("ttl")) {
                event.preventDefault();
            }
        },

        _afterDyingChange: function (event) {
            if (event.newVal) {
                this.setAttrs({ time: 0, ttl: 20 });
                this._sprite.set("playing", true);
            }
        },

        draw: function (context) {
            this._sprite.draw(
                context,
                this.get("col") * 32 + Math.round(this.get("horizontalOffset") * 32 / 2),
                this.get("row") * 32 + Math.round(this.get("verticalOffset") * 32 / 2)
            );
        },

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
        }

    });

    Y.namespace("Tile").SoftWall = SoftWall;

}, "0", { requires: ["base-build", "tile", "sprite"] });
