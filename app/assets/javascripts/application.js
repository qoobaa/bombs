//= require_tree

YUI().use("bombs-game", function (Y) {
    window.Y = Y;

    window.GAME = new Y.Bombs.Game().render();
});
