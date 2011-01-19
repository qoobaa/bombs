YUI({
    filter: "raw",
    groups: {
        tile: {
            base: "tile/",
            modules: {
                tile: {
                    path: "tile/tile.js",
                    requires: ["base-build", "collection"]
                },
                board: {
                    path: "board/board.js",
                    requires: ["base-build", "arraylist", "collection", "hardwall", "explosion", "softwall"]
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
                game: {
                    path: "game/game.js",
                    requires: ["widget", "base-build", "player", "board"]
                }
            }
        }
    }
}).use("game", function (Y) {
    window.GAME = new Y.Tile.Game().render();
});
