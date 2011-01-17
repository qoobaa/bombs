YUI.add("game", function (Y) {

    var Game = Y.Base.create("game", Y.Widget, [], {

        initializer: function () {
            P = this._player = new Y.Tile.Player();
        },

        renderUI: function () {
            this._renderCanvas();
        },

        _renderCanvas: function () {
            this._canvasNode = this.get("contentBox").appendChild("<canvas></canvas>");
            this._canvasNode.setAttrs({ width: this.get("width"), height: this.get("height") });
            this._context = Y.Node.getDOMNode(this._canvasNode).getContext("2d");
        },

        bindUI: function () {
            Y.one(document).on("keydown", this._onDocumentKeyDown, this);
            Y.one(document).on("keyup", this._onDocumentKeyUp, this);
        },

        _onDocumentKeyDown: function (event) {
            switch(event.keyCode) {
            case 37: // LEFT
                this._player.setAttrs({ direction: Y.Tile.Tile.LEFT, moving: true });
                break;
            case 38: // UP
                this._player.setAttrs({ direction: Y.Tile.Tile.UP, moving: true });
                break;
            case 39: // RIGHT
                this._player.setAttrs({ direction: Y.Tile.Tile.RIGHT, moving: true });
                break;
            case 40: // DOWN
                this._player.setAttrs({ direction: Y.Tile.Tile.DOWN, moving: true });
                break;
            }
        },

        _onDocumentKeyUp: function (event) {
            switch(event.keyCode) {
            case 37: // LEFT
                if (this._player.get("direction") === Y.Tile.Tile.LEFT) {
                    this._player.set("moving", false);
                }
                break;
            case 38: // UP
                if (this._player.get("direction") === Y.Tile.Tile.UP) {
                    this._player.set("moving", false);
                }
                break;
            case 39: // RIGHT
                if (this._player.get("direction") === Y.Tile.Tile.RIGHT) {
                    this._player.set("moving", false);
                }
                break;
            case 40: // DOWN
                if (this._player.get("direction") === Y.Tile.Tile.DOWN) {
                    this._player.set("moving", false);
                }
                break;
            }
        },

        syncUI: function () {
            this._start();
        },

        _clear: function () {
            this._context.clearRect(0, 0, this.get("width"), this.get("height"));
        },

        _redraw: function () {
            this._clear();
            this._player.act();
            this._player.draw(this._context, 0, 0);
        },

        _start: function () {
            if (this._timer === undefined) {
                this._timer = Y.later(this.get("interval"), this, this._redraw, [], true);
            }
        },

        _stop: function () {
            if (this._timer !== undefined) {
                this._timer.cancel();
                this._timer = undefined;
            }
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
            },

            interval: {
                validator: Y.Lang.isNumber,
                value: 33
            }

        }

    });

    Y.namespace("Tile").Game = Game;

}, "0", { requires: ["widget", "base-build", "player"] });
