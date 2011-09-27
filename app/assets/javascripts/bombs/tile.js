YUI.add("bombs-tile", function (Y) {

    var Tile = Y.Base.create("tile", Y.Widget, [Y.WidgetChild], {

        CONTENT_TEMPLATE: null,

        bindUI: function () {
            this.after("xyChange", this._afterXYChange);
        },

        _afterXYChange: function (event) {
            this._uiSetXY(event.newVal);
        },

        syncUI: function () {
            this._uiSetXY(this.get("xy"));
        },

        _uiSetXY: function (xy) {
            this.get("boundingBox").setStyles({ left: xy[0], top: xy[1] });
        },

        _validateXY: function (xy) {
            return Y.Lang.isArray(xy) && Y.Lang.isNumber(xy[0]) && Y.Lang.isNumber(xy[1]);
        },

        _setX: function (x) {
            this.set("xy", [x, this.get("xy")[1]]);
        },

        _getX: function () {
            return this.get("xy")[0];
        },

        _setY: function (y) {
            this.set("xy", [this.get("xy")[0], y]);
        },

        _getY: function () {
            return this.get("xy")[1];
        }

    }, {

        CSS_PREFIX: "tile",

        ATTRS: {

            x: {
                setter: "_setX",
                getter: "_getX"
            },

            y: {
                setter: "_setY",
                getter: "_getY"
            },

            xy: {
                value: [0, 0],
                validator: "_validateXY"
            }

        }

    });

    Y.namespace("Bombs").Tile = Tile;

}, "", { requires: ["widget", "widget-child"] });
