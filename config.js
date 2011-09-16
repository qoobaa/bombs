window.YUI_config = {
    filter: "raw",
    groups: {
        tile: {
            base: "tile/",
            modules: {
                "tile-base": {
                    path: "base/base.js",
                    requires: ["base-build", "collection"]
                },
                "tile-board": {
                    path: "board/board.js",
                    requires: ["base-build", "arraylist", "collection"]
                }
            }
        },
        bombs: {
            base: "bombs/",
            modules: {
                "bombs-board": {
                    path: "board/board.js",
                    requires: ["base-build", "arraylist", "tile-board", "collection", "bombs-hardwall", "bombs-explosion", "bombs-softwall", "bombs-bonusbomb", "bombs-bonuspower", "bombs-bonuskick", "bombs-bonusspeed"]
                },
                "bombs-player": {
                    path: "player/player.js",
                    requires: ["base-build", "tile-base", "bombs-bomb"]
                },
                "bombs-bomb": {
                    path: "bomb/bomb.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-hardwall": {
                    path: "hardwall/hardwall.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-softwall": {
                    path: "softwall/softwall.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-explosion": {
                    path: "explosion/explosion.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-bonusbomb": {
                    path: "bonusbomb/bonusbomb.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-bonuspower": {
                    path: "bonuspower/bonuspower.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-bonuskick": {
                    path: "bonuskick/bonuskick.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-bonusspeed": {
                    path: "bonusspeed/bonusspeed.js",
                    requires: ["base-build", "tile-base"]
                },
                "bombs-game": {
                    path: "game/game.js",
                    requires: ["widget", "base-build", "bombs-player", "bombs-board"]
                }
            }
        }
    }
};
