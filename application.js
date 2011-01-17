YUI({
    filter: "raw",
    groups: {
        tile: {
            base: "/tile/",
            modules: {
                tile: {
                    path: "tile/tile.js",
                    requires: ["base-build"]
                },
                board: {
                    path: "board/board.js",
                    requires: ["base-build"]
                },
                sprite: {
                    path: "sprite/sprite.js",
                    requires: ["base-build"]
                },
                game: {
                    path: "game/game.js",
                    requires: ["widget", "base-build", "sprite"]
                }
            }
        }
    }
}).use("game", function (Y) {
    window.GAME = new Y.Tile.Game().render();
});
