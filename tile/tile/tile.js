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
            this.after("horizontalOffsetChange", this._afterHorizontalOffsetChange);
            this.after("verticalOffsetChange", this._afterVerticalOffsetChange);
            this.after("animationDirectionChange", this._afterAnimationDirectionChange);
        },

        _afterRowChange: function (event) {
            this.fire("engage", [event.newVal, this.get("col")]);
        },

        _afterColChange: function (event) {
            this.fire("engage", [this.get("row"), event.newVal]);
        },

        _afterHorizontalOffsetChange: function (event) {
            if (event.newVal !== 0) {
                this.set("verticalOffset", 0);
            }
            if (event.newVal > 0 && this.get("direction") === Tile.RIGHT) {
                this.fire("touch", [this.get("row") + 1, this.get("col")]);
            } else if (event.newVal < 0 && this.get("direction") === Tile.LEFT) {
                this.fire("touch", [this.get("row") - 1, this.get("col")]);
            } else if (event.newVal > 1) {
                this.setAttrs({ horizontalOffset: event.newVal - 2, row: this.get("row") + 1 });
            } else if (event.newVal < 1) {
                this.setAttrs({ horizontalOffset: event.newVal + 2, row: this.get("row") - 1 });
            }
        },

        _afterVerticalOffsetChange: function (event) {
            if (event.newVal !== 0) {
                this.set("horizontalOffset", 0);
            }
            if (event.newVal > 0 && this.get("direction") === Tile.DOWN) {
                this.fire("touch", [this.get("row"), this.get("col") + 1]);
            } else if (event.newVal < 0 && this.get("direction") === Tile.UP) {
                this.fire("touch", [this.get("row"), this.get("col") - 1]);
            } else if (event.newVal > 1) {
                this.setAttrs({ verticalOffset: event.newVal - 2, col: this.get("col") + 1 });
            } else if (event.newVal < 1) {
                this.setAttrs({ verticalOffset: event.newVal + 2, col: this.get("col") - 1 });
            }
        },

        _afterAnimationDirectionChange: function (event) {
            this.reset("animationFrame");
        },

        act: function () {
            this.set("animationFrame", this.get("animationFrame") + 1);
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
            case Tile.UP:
                if (this._isMovedHorizontally()) {
                    this._stepCenter();
                } else {
                    this._stepUp();
                }
                break;
            case Tile.RIGHT:
                if (this._isMovedVertically()) {
                    this._stepCenter();
                } else {
                    this._stepRight();
                }
                break;
            case Tile.DOWN:
                if (this._isMovedHorizontally()) {
                    this._stepCenter();
                } else {
                    this._stepDown();
                }
                break;
            case Tile.LEFT:
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
            this.setAttrs({ animationDirection: Tile.UP, verticalOffset: this.get("verticalOffset") - this.get("speed") });
        },

        _stepRight: function () {
            this.setAttrs({ animationDirection: Tile.RIGHT, horizontalOffset: this.get("horizontalOffset") + this.get("speed") });
        },

        _stepDown: function () {
            this.setAttrs({ animationDirection: Tile.DOWN, verticalOffset: this.get("verticalOffset") + this.get("speed") });
        },

        _stepLeft: function () {
            this.setAttrs({ animationDirection: Tile.LEFT, horizontalOffset: this.get("horizontalOffset") - this.get("speed") });
        },

        stop: function () {
            this.setAttrs({ moving: false });
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

            horizontalOffset: {
                validator: Y.Lang.isNumber
            },

            verticalOffset: {
                validator: Y.Lang.isNumber
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
                validator: Y.Lang.isNumber
            },

            moving: {
                validator: Y.Lang.isBoolean
            },

            direction: {
                validator: "_validateDirection"
            },

            animationDirection: {
                validator: "_validateDirection"
            },

            animationFrame: {
                value: 0,
                validator: Y.Lang.isNumber
            }

        },

        UP:    {},
        RIGHT: {},
        DOWN:  {},
        LEFT:  {}

    });

    Y.namespace("Tile").Tile = Tile;

}, "0", { requires: ["base-build"] });
