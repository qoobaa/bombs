YUI.add("board", function (Y) {

    var Board = Y.Base.create("board", Y.Base, [], {

        initializer: function () {
            this._items = [];

            this.on("*:rowChange", this._onTileRowChange);
            this.on("*:colChange", this._onTileColChange);
            this.on("*:horizontalOffsetChange", this._onTileHorizontalOffsetChange);
            this.on("*:verticalOffsetChange", this._onTileVerticalOffsetChange);
            this.after("*:aliveChange", this._afterAliveChange);
            this.on("player:bombsChange", this._onPlayerBombsChange);
            this.after("bomb:aliveChange", this._afterBombAliveChange);

            this._createBorders();
        },

        _onTileRowChange: function (event) {
            var tile = event.target;

            Y.Array.invoke(this._getTiles(tile.get("col"), event.newVal), "fire", "engage", { originalEvent: event });
        },

        _onTileColChange: function (event) {
            var tile = event.target;

            Y.Array.invoke(this._getTiles(event.newVal, tile.get("row")), "fire", "engage", { originalEvent: event });
        },

        _onTileHorizontalOffsetChange: function (event) {
            var tile = event.target;

            if (event.newVal > 0 && tile.get("direction") === Y.Tile.Tile.RIGHT) {
                Y.Array.invoke(this._getTiles(tile.get("col") + 1, tile.get("row")), "fire", "touch", { originalEvent: event });
            } else if (event.newVal < 0 && tile.get("direction") === Y.Tile.Tile.LEFT) {
                Y.Array.invoke(this._getTiles(tile.get("col") - 1, tile.get("row")), "fire", "touch", { originalEvent: event });
            }
        },

        _onTileVerticalOffsetChange: function (event) {
            var tile = event.target;

            if (event.newVal > 0 && tile.get("direction") === Y.Tile.Tile.DOWN) {
                Y.Array.invoke(this._getTiles(tile.get("col"), tile.get("row") + 1), "fire", "touch", { originalEvent: event });
            } else if (event.newVal < 0 && tile.get("direction") === Y.Tile.Tile.UP) {
                Y.Array.invoke(this._getTiles(tile.get("col"), tile.get("row") - 1), "fire", "touch", { originalEvent: event });
            }
        },

        _afterAliveChange: function (event) {
            var tile = event.target;

            if (!event.newVal) {
                this.remove(tile);
            }
        },

        _onPlayerBombsChange: function (event) {
            var player = event.target,
                otherBomb = Y.Array.find(this._getTiles(player.get("col"), player.get("row")), function (tile) {
                    return tile instanceof Y.Tile.Bomb;
                });

            if (event.prevVal > event.newVal) {
                if (otherBomb) {
                    event.preventDefault();
                } else {
                    this.add(new Y.Tile.Bomb({ col: player.get("col"), row: player.get("row"), player: player }));
                }
            }
        },

        _afterBombAliveChange: function (event) {
            var bomb = event.target;

            if (!event.newVal) {
                this.remove(bomb);
                this._explode(bomb.get("col"), bomb.get("row"), bomb.get("player").get("power"));
            }
        },

        _explode: function (col, row, power, direction) {
            var explosion = new Y.Tile.Explosion({ col: col, row: row, explosionDirection: direction });

            if (power <= 0) {
                return false;
            }

            Y.Array.invoke(this._getTiles(col, row), "set", "alive", false);

            if (Y.Array.find(this._getTiles(col, row), function (tile) {
                return tile.get("alive");
            })) {
                return false;
            }

            this.add(explosion);

            switch (direction) {
            case Y.Tile.Tile.UP:
                explosion.set("explosionEnd", !this._explode(col, row - 1, power - 1, Y.Tile.Tile.UP));
                break;
            case Y.Tile.Tile.RIGHT:
                explosion.set("explosionEnd", !this._explode(col + 1, row, power - 1, Y.Tile.Tile.RIGHT));
                break;
            case Y.Tile.Tile.DOWN:
                explosion.set("explosionEnd", !this._explode(col, row + 1, power - 1, Y.Tile.Tile.DOWN));
                break;
            case Y.Tile.Tile.LEFT:
                explosion.set("explosionEnd", !this._explode(col - 1, row, power - 1, Y.Tile.Tile.LEFT));
                break;
            default:
                this._explode(col, row - 1, power - 1, Y.Tile.Tile.UP);
                this._explode(col + 1, row, power - 1, Y.Tile.Tile.RIGHT);
                this._explode(col, row + 1, power - 1, Y.Tile.Tile.DOWN);
                this._explode(col - 1, row, power - 1, Y.Tile.Tile.LEFT);
                break;
            }

            return true;
        },

        _createBorders: function () {
            for (var col = 0; col < this.get("width"); col++) {
                this.add(new Y.Tile.HardWall({ row: 0, col: col }));
                this.add(new Y.Tile.HardWall({ row: this.get("height") - 1, col: col }));
            }
            for (var row = 1; row < this.get("height") - 1; row++) {
                this.add(new Y.Tile.HardWall({ row: row, col: 0 }));
                this.add(new Y.Tile.HardWall({ row: row, col: this.get("width") - 1 }));
            }
        },

        _getTiles: function (col, row) {
            return Y.Array.filter(this._items, function (tile) {
                return tile.get("col") === col && tile.get("row") === row;
            });
        },

        add: function (tile) {
            tile.addTarget(this);
            this._items.push(tile);
            this._sortTiles();
            // Y.Array.invoke(this._getTiles(tile.get("col"), tile.get("row")), "fire", "engage");
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

    Y.augment(Board, Y.ArrayList);

    Y.namespace("Tile").Board = Board;

}, "0", { requires: ["base-build", "arraylist", "collection", "hardwall", "bomb", "explosion"] });
