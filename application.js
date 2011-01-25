YUI({
    filter: "raw",
    groups: {
        gallery: {
            base: "yui3-gallery/",
            modules: {
                "gallery-preload": {
                    path: "gallery-preload/gallery-preload.js",
                    requires: ["yui"]
                }
            }
        },
        tile: {
            base: "tile/",
            modules: {
                tile: {
                    path: "tile/tile.js",
                    requires: ["base-build", "collection"]
                },
                board: {
                    path: "board/board.js",
                    requires: ["base-build", "arraylist", "collection", "hardwall", "explosion", "softwall", "bonusbomb", "bonuspower", "bonuskick", "bonusspeed"]
                },
                sprite: {
                    path: "sprite/sprite.js",
                    requires: ["base-build"]
                },
                player: {
                    path: "player/player.js",
                    requires: ["base-build", "tile", "sprite", "bomb"]
                },
                bomb: {
                    path: "bomb/bomb.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                hardwall: {
                    path: "hardwall/hardwall.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                softwall: {
                    path: "softwall/softwall.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                explosion: {
                    path: "explosion/explosion.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                bonusbomb: {
                    path: "bonusbomb/bonusbomb.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                bonuspower: {
                    path: "bonuspower/bonuspower.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                bonuskick: {
                    path: "bonuskick/bonuskick.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                bonusspeed: {
                    path: "bonusspeed/bonusspeed.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                game: {
                    path: "game/game.js",
                    requires: ["widget", "base-build", "player", "board"]
                }
            }
        }
    }
}).use("gallery-preload", "game", function (Y) {
    Y.preload([
        "images/bomb.png",
        "images/bonusbomb.png",
        "images/bonuskick.png",
        "images/bonuspower.png",
        "images/bonusspeed.png",
        "images/explosion.png",
        "images/hardwall.png",
        "images/player1.png",
        "images/player2.png",
        "images/softwall.png"
    ]);

    window.GAME = new Y.Tile.Game().render("#game");
});
