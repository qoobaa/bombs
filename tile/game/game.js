YUI.add("game", function (Y) {

    var Game = Y.Base.create("game", Y.Widget, [], {

        renderUI: function () {
            this._renderCanvas();
            this._renderBomb();
        },

        _renderCanvas: function () {
            this._canvasNode = this.get("contentBox").appendChild("<canvas></canvas>");
            this._canvasNode.setAttrs({ width: this.get("width"), height: this.get("height") });
            this._context = Y.Node.getDOMNode(this._canvasNode).getContext("2d");
        },

        _clear: function () {
            this._context.clearRect(0, 0, this.get("width"), this.get("height"));
        },

        _renderBomb: function () {
            if (this.sprite === undefined) {
                this.sprite = new Y.Tile.Sprite({ image: "/images/bomb.png", frames: 4, speed: 0.5 });
            }

            Y.later(33, this, function () {
                this._clear();
                this.sprite.draw(this._context, 0, 0);
            }, [], true);
        }

    }, {

        ATTRS: {

            width: {
                validator: Y.Lang.isNumber,
                value: 800
            },

            height: {
                validator: Y.Lang.isNumber,
                value: 600
            },

            tileWidth: {
                validator: Y.Lang.isNumber,
                value: 32
            },

            tileHeight: {
                validator: Y.Lang.isNumber,
                value: 32
            }

        }

    });

    Y.namespace("Tile").Game = Game;

}, "0", { requires: ["widget", "base-build", "sprite"] });
