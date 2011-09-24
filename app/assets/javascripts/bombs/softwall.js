YUI.add("bombs-softwall", function (Y) {

    var SoftWall = Y.Base.create("softwall", Y.Tile.Base, [], {

        initializer: function () {
            this.on("touch", this._onTouch);
            this.on("aliveChange", this._onAliveChange);
        },

        _onAliveChange: function (event) {
            if (!Y.Lang.isValue(this.get("ttl")) && !event.newVal) {
                event.preventDefault();
                this.setAttrs({ time: 0, ttl: 10 });
            } else if (Y.Lang.isValue(this.get("time")) && this.get("time") < this.get("ttl")) {
                event.preventDefault();
            }
        },

        _afterDyingChange: function (event) {
            if (event.newVal) {
                this.setAttrs({ time: 0, ttl: 20 });
            }
        },

        _onTouch: function (event) {
            event.originalEvent.preventDefault();
            event.source.stop();
        }

    });

    Y.namespace("Bombs").SoftWall = SoftWall;

}, "0", { requires: ["base-build", "tile-base"] });
