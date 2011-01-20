YUI.add("game", function (Y) {

    var Game = Y.Base.create("game", Y.Widget, [], {

        initializer: function () {
            this._player1 = new Y.Tile.Player({ number: 1, row: 1, col: 1 });
            this._player2 = new Y.Tile.Player({ number: 2, row: 13, col: 18 });
            this._board = new Y.Tile.Board();
            this._board.add(this._player1);
            this._board.add(this._player2);
        },

        renderUI: function () {
            this._renderCanvas();
        },

        _renderCanvas: function () {
            this._canvasNode = this.get("contentBox").appendChild("<canvas></canvas>");
            this._canvasNode.setAttrs({ width: this.get("width"), height: this.get("height") });
            this._canvasNode.setStyle("backgroundColor", "#9ba376");
            this._context = Y.Node.getDOMNode(this._canvasNode).getContext("2d");
        },

        bindUI: function () {
            Y.one(document).on("keydown", this._onDocumentKeyDown, this);
            Y.one(document).on("keyup", this._onDocumentKeyUp, this);
        },

        _onDocumentKeyDown: function (event) {
            switch (event.keyCode) {
            case this.get("controls.1.left"):
                this._player1.setAttrs({ direction: Y.Tile.Tile.LEFT, moving: true });
                break;
            case this.get("controls.1.up"):
                this._player1.setAttrs({ direction: Y.Tile.Tile.UP, moving: true });
                break;
            case this.get("controls.1.right"):
                this._player1.setAttrs({ direction: Y.Tile.Tile.RIGHT, moving: true });
                break;
            case this.get("controls.1.down"):
                this._player1.setAttrs({ direction: Y.Tile.Tile.DOWN, moving: true });
                break;
            case this.get("controls.1.bomb"):
                this._player1.bomb();
                break;
            case this.get("controls.2.left"):
                this._player2.setAttrs({ direction: Y.Tile.Tile.LEFT, moving: true });
                break;
            case this.get("controls.2.up"):
                this._player2.setAttrs({ direction: Y.Tile.Tile.UP, moving: true });
                break;
            case this.get("controls.2.right"):
                this._player2.setAttrs({ direction: Y.Tile.Tile.RIGHT, moving: true });
                break;
            case this.get("controls.2.down"):
                this._player2.setAttrs({ direction: Y.Tile.Tile.DOWN, moving: true });
                break;
            case this.get("controls.2.bomb"):
                this._player2.bomb();
                break;
            }
        },

        _onDocumentKeyUp: function (event) {
            switch (event.keyCode) {
            case this.get("controls.1.left"):
                if (this._player1.get("direction") === Y.Tile.Tile.LEFT) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.1.up"):
                if (this._player1.get("direction") === Y.Tile.Tile.UP) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.1.right"):
                if (this._player1.get("direction") === Y.Tile.Tile.RIGHT) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.1.down"):
                if (this._player1.get("direction") === Y.Tile.Tile.DOWN) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.2.left"):
                if (this._player2.get("direction") === Y.Tile.Tile.LEFT) {
                    this._player2.set("moving", false);
                }
                break;
            case this.get("controls.2.up"):
                if (this._player2.get("direction") === Y.Tile.Tile.UP) {
                    this._player2.set("moving", false);
                }
                break;
            case this.get("controls.2.right"):
                if (this._player2.get("direction") === Y.Tile.Tile.RIGHT) {
                    this._player2.set("moving", false);
                }
                break;
            case this.get("controls.2.down"):
                if (this._player2.get("direction") === Y.Tile.Tile.DOWN) {
                    this._player2.set("moving", false);
                }
                break;
            }
        },

        syncUI: function () {
            this._start();
        },

        _redraw: function () {
            this._board.act();
            this._context.clearRect(0, 0, this.get("width"), this.get("height"));
            this._board.draw(this._context);
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
                value: 640
            },

            height: {
                validator: Y.Lang.isNumber,
                value: 480
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
            },

            controls: {
                value: {
                    "1": {
                        "left": 37,  // LEFT
                        "up":  38,   // UP
                        "right": 39, // RIGHT
                        "down": 40,  // DOWN
                        "bomb": 13   // ENTER
                    },
                    "2": {
                        "left": 65,  // A
                        "up":  87,   // W
                        "right": 68, // D
                        "down": 83,  // S
                        "bomb": 49   // 1
                    }
                }
            }

        }

    });

    Y.namespace("Tile").Game = Game;

}, "0", { requires: ["widget", "base-build", "player", "board"] });
