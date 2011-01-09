YUI.add("tile", function (Y) {

    var Tile = Y.Base.create("tile", Y.Base, [], {

        initializer: function () {
            if (this.get("board")) {
                this.addTarget(this.get("board"));
            }

            this.publish("touch");
            this.publish("engage");

            this.after("rowChange", this._afterRowChange);
            this.after("colChange", this._afterColChange);
            this.after("hOffsetChange", this._afterHOffsetChange);
            this.after("vOffsetChange", this._afterVOffsetChange);
            this.after("directionChange", this._afterDirectionChange);
        },

        _afterRowChange: function (event) {
            this.fire("engage", [event.newVal, this.get("col")]);
        },

        _afterColChange: function (event) {
            this.fire("engage", [this.get("row"), event.newVal]);
        },

        _afterHOffsetChange: function (event) {
            if (event.newVal > 0 && this.get("direction") === Tile.RIGHT) {
                this.fire("touch", [this.get("row") + 1, this.get("col")]);
            } else if (event.newVal < 0 && this.get("direction") === Tile.LEFT) {
                this.fire("touch", [this.get("row") - 1, this.get("col")]);
            } else if (event.newVal > 1) {
                this.setAttrs({ hOffset: event.newVal - 2, row: this.get("row") + 1 });
            } else if (event.newVal < 1) {
                this.setAttrs({ hOffset: event.newVal + 2, row: this.get("row") - 1 });
            }
        },

        _afterVOffsetChange: function (event) {
            if (event.newVal > 0 && this.get("direction") === Tile.DOWN) {
                this.fire("touch", [this.get("row"), this.get("col") + 1]);
            } else if (event.newVal < 0 && this.get("direction") === Tile.UP) {
                this.fire("touch", [this.get("row"), this.get("col") - 1]);
            } else if (event.newVal > 1) {
                this.setAttrs({ vOffset: event.newVal - 2, col: this.get("col") + 1 });
            } else if (event.newVal < 1) {
                this.setAttrs({ vOffset: event.newVal + 2, col: this.get("col") - 1 });
            }
        },

        _afterDirectionChange: function (event) {
            switch (event.newVal) {
            case Tile.UP:
                this.set("hOffset", 0);
                break;
            case Tile.RIGHT:
                this.set("vOffset", 0);
                break;
            case Tile.DOWN:
                this.set("hOffset", 0);
                break;
            case Tile.LEFT:
                this.set("vOffset", 0);
                break;
            }
        },

        act: function () {
            if (this.get("isMoving")) {
                this._move();
            }
        },

        _move: function () {
            switch (this.get("direction")) {
            case Tile.UP:
                this.set("vOffset", this.get("vOffset") - this.get("speed"));
                break;
            case Tile.RIGHT:
                this.set("hOffset", this.get("hOffset") + this.get("speed"));
                break;
            case Tile.DOWN:
                this.set("vOffset", this.get("vOffset") + this.get("speed"));
                break;
            case Tile.LEFT:
                this.set("hOffset", this.get("hOffset") - this.get("speed"));
                break;
            }
        },

        stop: function () {
            this.setAttrs({ offset: [0, 0], isMoving: false });
        },

        // INTERACTION - replace by events (defaultFn)?

        touch: function (tile) {
            // DO NOTHING
        },

        touchedBy: function (tile) {
            // DO NOTHING
        },

        engage: function (tile) {
            // DO NOTHING
        },

        engagedBy: function (tile) {
            // DO NOTHING
        },

        // OTHERS

        _validateDirection: function (direction) {
            return Y.indexOf([Tile.UP, Tile.RIGHT, Tile.DOWN, Tile.LEFT], direction) !== -1;
        }

    }, {

        ATTRS: {

            board: {

            },

            row: {
                validator: Y.Lang.isNumber
            },

            col: {
                validator: Y.Lang.isNumber
            },

            position: {
                getter: function () {
                    return [this.get("row"), this.get("col")];
                },
                setter: function (position) {
                    this.setAttrs({ row: position[0], col: position[1] });
                }
            },

            hOffset: {
                validator: Y.Lang.isNumber
            },

            vOffset: {
                validator: Y.Lang.isNumber
            },

            offset: {
                getter: function () {
                    return [this.get("hOffset"), this.get("vOffset")];
                },
                setter: function (offset) {
                    this.setAttrs({ hOffset: offset[0], vOffset: offset[1] });
                }
            },

            speed: {
                validator: Y.Lang.isNumber
            },

            isMoving: {
                validator: Y.Lang.isBoolean
            },

            direction: {
                validator: "_validateDirection"
            }

        },

        UP:    {},
        RIGHT: {},
        DOWN:  {},
        LEFT:  {}

    });

    Y.namespace("Tile").Tile = Tile;

}, "0", { requires: ["base-build"] });
