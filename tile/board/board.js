YUI.add("tile-board", function (Y) {

    var Board = Y.Base.create("board", Y.Base, [Y.ArrayList], {

        initializer: function () {
            this.on("*:rowChange", this._onTileRowChange);
            this.on("*:colChange", this._onTileColChange);
            this.on("*:horizontalOffsetChange", this._onTileHorizontalOffsetChange);
            this.on("*:verticalOffsetChange", this._onTileVerticalOffsetChange);
            this.after("*:aliveChange", this._afterAliveChange);
        },

        _onTileRowChange: function (event) {
            var tile = event.target;

            Y.Array.invoke(this.getTilesByPosition(tile.get("col"), event.newVal), "fire", "engage", { originalEvent: event, source: tile });
        },

        _onTileColChange: function (event) {
            var tile = event.target;

            Y.Array.invoke(this.getTilesByPosition(event.newVal, tile.get("row")), "fire", "engage", { originalEvent: event, source: tile });
        },

        _onTileHorizontalOffsetChange: function (event) {
            var tile = event.target;

            if (event.newVal > 0 && tile.get("direction") === Y.Tile.Base.RIGHT) {
                Y.Array.invoke(this.getTilesByPosition(tile.get("col") + 1, tile.get("row")), "fire", "touch", { originalEvent: event, source: tile });
            } else if (event.newVal < 0 && tile.get("direction") === Y.Tile.Base.LEFT) {
                Y.Array.invoke(this.getTilesByPosition(tile.get("col") - 1, tile.get("row")), "fire", "touch", { originalEvent: event, source: tile });
            }
        },

        _onTileVerticalOffsetChange: function (event) {
            var tile = event.target;

            if (event.newVal > 0 && tile.get("direction") === Y.Tile.Base.DOWN) {
                Y.Array.invoke(this.getTilesByPosition(tile.get("col"), tile.get("row") + 1), "fire", "touch", { originalEvent: event, source: tile });
            } else if (event.newVal < 0 && tile.get("direction") === Y.Tile.Base.UP) {
                Y.Array.invoke(this.getTilesByPosition(tile.get("col"), tile.get("row") - 1), "fire", "touch", { originalEvent: event, source: tile });
            }
        },

        _afterAliveChange: function (event) {
            var tile = event.target;

            if (!event.newVal) {
                this.remove(tile);
            }
        },

        getTilesByPosition: function (col, row) {
            return Y.Array.filter(this._items, function (tile) {
                return tile.get("col") === col && tile.get("row") === row;
            });
        },

        add: function (tile) {
            tile.addTarget(this);
            Y.Array.invoke(this.getTilesByPosition(tile.get("col"), tile.get("row")), "fire", "engage", { source: tile });
            if (tile.get("alive")) {
                Y.ArrayList.prototype.add.apply(this, arguments);
            }
        },

        remove: function (tile) {
            tile.removeTarget(this);
            Y.ArrayList.prototype.remove.apply(this, arguments);
        },

        act: function () {
            Y.Array.invoke(this._items.slice(0), "act");
        }

    }, {

        ATTRS: {

            height: {
                validator: Y.Lang.isNumber,
                value: 15
            },

            width: {
                validator: Y.Lang.isNumber,
                value: 20
            },

            size: {
                getter: function () {
                    return [this.get("height"), this.get("width")];
                },
                setter: function (size) {
                    this.setAttrs({ height: size[0], width: size[1] });
                }
            }

        }

    });

    Y.namespace("Tile").Board = Board;

}, "", { requires: ["base-build", "arraylist", "collection"] });
