YUI.add("board", function (Y) {

    var Board = Y.Base.create("board", Y.Base, [], {

        initializer: function () {
            this._items = [];
            // this.on("*:rowChange", this._onTileRowChange);
        },

        add: function (tile) {
            tile.addTarget(this);
            this._items.push(tile);
            this._sortTiles();
        },

        act: function () {
            this.each(function (tile) {
                tile.act();
            });
            this._sortTiles();
        },

        _sortTiles: function () {
            this._items.sort(function (a, b) {
                if (a.get("row") === b.get("row")) {
                    return a.get("verticalOffset") > b.get("verticalOffset");
                } else {
                    return a.get("row") > b.get("row");
                }
            });
        },

        draw: function (context) {
            this.each(function (tile) {
                tile.draw(context);
            });
        }

    }, {

        ATTRS: {

            height: {
                validator: Y.Lang.isNumber,
                value: 2
            },

            width: {
                validator: Y.Lang.isNumber,
                value: 2
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

    Y.augment(Board, Y.ArrayList);

    Y.namespace("Tile").Board = Board;

}, "0", { requires: ["base-build", "arraylist"] });
