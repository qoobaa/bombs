YUI.add("tile", function (Y) {

    var Tile = Y.Base.create("tile", Y.Base, [], {

        initializer: function () {

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

            x: {
                validator: Y.Lang.isNumber
            },

            y: {
                validator: Y.Lang.isNumber
            },

            position: {
                getter: function () {
                    return [this.get("x"), this.get("y")];
                },
                setter: function (position) {
                    this.setAttrs({ x: position[0], y: position[1] });
                }
            },

            xOffset: {
                validator: Y.Lang.isNumber
            },

            yOffset: {
                validator: Y.Lang.isNumber
            },

            offset: {
                getter: function () {
                    return [this.get("xOffset"), this.get("yOffset")];
                },
                setter: function (offset) {
                    this.setAttrs({ xOffset: offset[0], yOffset: offset[1] });
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
