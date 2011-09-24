YUI.add("bombs-game", function (Y) {

    var Game = Y.Base.create("game", Y.Widget, [], {

        CONTENT_TEMPLATE: null,

        initializer: function () {
            this._player1 = new Y.Bombs.Player({ number: 1, row: 1, col: 1 });
            this._player2 = new Y.Bombs.Player({ number: 2, row: 13, col: 18 });
            this._board = new Y.Bombs.Board();
            this._board.add(this._player1);
            this._board.add(this._player2);
        },

        renderUI: function () {
            this._renderCanvas();
        },

        _renderCanvas: function () {
            this._canvasNode = this.get("contentBox").appendChild("<canvas>");
            this._canvasNode.setAttrs({ width: this.get("width"), height: this.get("height") });
            this._canvasNode.setStyle("backgroundColor", "#9ba376");
            this._context = Y.Node.getDOMNode(this._canvasNode).getContext("2d");
        },

        bindUI: function () {
            this.after("playingChange", this._afterPlayingChange);
            Y.one(document).on("keydown", this._onDocumentKeyDown, this);
            Y.one(document).on("keyup", this._onDocumentKeyUp, this);
        },

        _afterPlayingChange: function (event) {
            this._syncPlaying(event.newVal);
        },

        _syncPlaying: function (playing) {
            if (playing && !Y.Lang.isValue(this._timer)) {
                this._redraw();
            } else if (!playing && Y.Lang.isValue(this._timer)) {
                this._timer.cancel();
                this._timer = undefined;
            }
        },

        _onDocumentKeyDown: function (event) {
            switch (event.keyCode) {
            case this.get("controls.1.left"):
                this._player1.setAttrs({ direction: Y.Tile.Base.LEFT, moving: true });
                break;
            case this.get("controls.1.up"):
                this._player1.setAttrs({ direction: Y.Tile.Base.UP, moving: true });
                break;
            case this.get("controls.1.right"):
                this._player1.setAttrs({ direction: Y.Tile.Base.RIGHT, moving: true });
                break;
            case this.get("controls.1.down"):
                this._player1.setAttrs({ direction: Y.Tile.Base.DOWN, moving: true });
                break;
            case this.get("controls.1.bomb"):
                this._player1.bomb();
                break;
            case this.get("controls.2.left"):
                this._player2.setAttrs({ direction: Y.Tile.Base.LEFT, moving: true });
                break;
            case this.get("controls.2.up"):
                this._player2.setAttrs({ direction: Y.Tile.Base.UP, moving: true });
                break;
            case this.get("controls.2.right"):
                this._player2.setAttrs({ direction: Y.Tile.Base.RIGHT, moving: true });
                break;
            case this.get("controls.2.down"):
                this._player2.setAttrs({ direction: Y.Tile.Base.DOWN, moving: true });
                break;
            case this.get("controls.2.bomb"):
                this._player2.bomb();
                break;
            }
        },

        _onDocumentKeyUp: function (event) {
            switch (event.keyCode) {
            case this.get("controls.1.left"):
                if (this._player1.get("direction") === Y.Tile.Base.LEFT) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.1.up"):
                if (this._player1.get("direction") === Y.Tile.Base.UP) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.1.right"):
                if (this._player1.get("direction") === Y.Tile.Base.RIGHT) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.1.down"):
                if (this._player1.get("direction") === Y.Tile.Base.DOWN) {
                    this._player1.set("moving", false);
                }
                break;
            case this.get("controls.2.left"):
                if (this._player2.get("direction") === Y.Tile.Base.LEFT) {
                    this._player2.set("moving", false);
                }
                break;
            case this.get("controls.2.up"):
                if (this._player2.get("direction") === Y.Tile.Base.UP) {
                    this._player2.set("moving", false);
                }
                break;
            case this.get("controls.2.right"):
                if (this._player2.get("direction") === Y.Tile.Base.RIGHT) {
                    this._player2.set("moving", false);
                }
                break;
            case this.get("controls.2.down"):
                if (this._player2.get("direction") === Y.Tile.Base.DOWN) {
                    this._player2.set("moving", false);
                }
                break;
            }
        },

        syncUI: function () {
            this._syncPlaying(this.get("playing"));
        },

        _redraw: function () {
            // if (window.i === undefined) {
            //     window.i = 0;
            // }

            // var startTime = Y.Lang.now();

            // this._board.act();
            // this._context.clearRect(0, 0, this.get("width"), this.get("height"));

            // try {
            //     this._board.draw(this._context);
            // } catch (x) {
            //     Y.log(x);
            // }

            // if (this.get("playing")) {
            //     this._timer = Y.later(Math.max(this.get("interval") - (Y.Lang.now() - startTime), 0), this, this._redraw, []);
            // }
            // window.i++;
        }

    }, {

        CSS_PREFIX: "game",

        ATTRS: {

            playing: {
                value: true,
                validator: Y.Lang.isNumber
            },

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

    Y.namespace("Bombs").Game = Game;

}, "0", { requires: ["widget", "base-build", "bombs-player", "bombs-board"] });
