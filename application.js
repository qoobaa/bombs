YUI({
    filter: "raw",
    groups: {
        tile: {
            base: "/tile/",
            modules: {
                tile: {
                    path: "tile/tile.js",
                    requires: ["base-build"]
                }
            }
        }
    }
}).use("tile", function (Y) {

});
