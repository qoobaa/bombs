YUI({
    filter: "raw",
    groups: {
        tile: {
            base: "/tile/",
            modules: {
                tile: {
                    path: "tile/tile.js",
                    requires: ["base-build", "collection"]
                },
                board: {
                    path: "board/board.js",
                    requires: ["base-build"]
                },
                sprite: {
                    path: "sprite/sprite.js",
                    requires: ["base-build"]
                },
                player: {
                    path: "player/player.js",
                    requires: ["base-build", "tile", "sprite"]
                },
                game: {
                    path: "game/game.js",
                    requires: ["widget", "base-build", "player"]
                }
            }
        }
    }
}).use("game", function (Y) {
    window.GAME = new Y.Tile.Game().render();
});
