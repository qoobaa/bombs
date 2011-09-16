YUI.add("bombs-board", function (Y) {

    var Board = Y.Base.create("board", Y.Tile.Board, [Y.ArrayList], {

        initializer: function () {
            this.on("player:bombsChange", this._onPlayerBombsChange);
            this.after("bomb:aliveChange", this._afterBombAliveChange);
            this.after("softwall:aliveChange", this._afterSoftWallAliveChange);

            this._createBorders();
        },

        _onPlayerBombsChange: function (event) {
            var player = event.target,
                otherBomb = Y.Array.find(this.getTilesByPosition(player.get("col"), player.get("row")), function (tile) {
                    return Y.instanceOf(tile, Y.Bombs.Bomb);
                });

            if (event.prevVal > event.newVal) {
                if (otherBomb) {
                    event.preventDefault();
                } else {
                    this.add(new Y.Bombs.Bomb({ col: player.get("col"), row: player.get("row"), player: player }));
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

        _afterSoftWallAliveChange: function (event) {
            var softWall = event.target;

            if (!event.newVal) {
                this._bonus(softWall.get("col"), softWall.get("row"));
            }
        },

        _bonus: function (col, row) {
            switch (Math.round(Math.random() * 10)) {
            case 0:
                this.add(new Y.Bombs.BonusKick({ col: col, row: row }));
                break;
            case 1:
                this.add(new Y.Bombs.BonusPower({ col: col, row: row }));
                break;
            case 2:
                this.add(new Y.Bombs.BonusSpeed({ col: col, row: row }));
                break;
            case 3:
                this.add(new Y.Bombs.BonusBomb({ col: col, row: row }));
                break;
            }
        },

        _explode: function (col, row, power, direction) {
            var explosion = new Y.Bombs.Explosion({ col: col, row: row, explosionDirection: direction });

            if (power <= 0) {
                return false;
            }

            Y.Array.invoke(this.getTilesByPosition(col, row), "set", "alive", false);

            if (Y.Array.find(this.getTilesByPosition(col, row), function (tile) {
                return tile.get("alive");
            })) {
                return false;
            }


            switch (direction) {
            case Y.Tile.Base.UP:
                explosion.set("explosionEnd", !this._explode(col, row - 1, power - 1, Y.Tile.Base.UP));
                break;
            case Y.Tile.Base.RIGHT:
                explosion.set("explosionEnd", !this._explode(col + 1, row, power - 1, Y.Tile.Base.RIGHT));
                break;
            case Y.Tile.Base.DOWN:
                explosion.set("explosionEnd", !this._explode(col, row + 1, power - 1, Y.Tile.Base.DOWN));
                break;
            case Y.Tile.Base.LEFT:
                explosion.set("explosionEnd", !this._explode(col - 1, row, power - 1, Y.Tile.Base.LEFT));
                break;
            default:
                this._explode(col,     row - 1, power - 1, Y.Tile.Base.UP);
                this._explode(col + 1, row,     power - 1, Y.Tile.Base.RIGHT);
                this._explode(col,     row + 1, power - 1, Y.Tile.Base.DOWN);
                this._explode(col - 1, row,     power - 1, Y.Tile.Base.LEFT);
                break;
            }

            this.add(explosion);

            return true;
        },

        _createBorders: function () {
            var col, row;

            for (col = 0; col < this.get("width"); col++) {
                this.add(new Y.Bombs.HardWall({ row: 0, col: col }));
                this.add(new Y.Bombs.HardWall({ row: this.get("height") - 1, col: col }));
            }
            for (row = 1; row < this.get("height") - 1; row++) {
                this.add(new Y.Bombs.HardWall({ row: row, col: 0 }));
                this.add(new Y.Bombs.HardWall({ row: row, col: this.get("width") - 1 }));
            }
            for (col = 3; col < this.get("width") - 3; col++) {
                for (row = 3; row < this.get("height") - 3; row++) {
                    this.add(new Y.Bombs.SoftWall({ row: row, col: col }));
                }
            }
        }

    }, {

        ATTRS: {

            height: {
                value: 15
            },

            width: {
                value: 20
            }

        }

    });

    Y.namespace("Bombs").Board = Board;

}, "0", { requires: ["base-build", "tile-board", "bombs-hardwall", "bombs-explosion", "bombs-softwall", "bombs-bonusbomb", "bombs-bonuspower", "bombs-bonuskick", "bombs-bonusspeed", "bombs-bomb"] });
