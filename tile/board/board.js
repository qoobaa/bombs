YUI.add("board", function (Y) {

    var Board = Y.Base.create("board", Y.Base, [], {

        initializer: function () {

        }

    }, {

        ATTRS: {

            tiles: {
                validator: Y.Lang.isArray
            },

            height: {
                validator: Y.Lang.isNumber
            },

            width: {
                validator: Y.Lang.isNumber
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

}, "0", { requires: ["base-build"] });
