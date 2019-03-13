class SceneEnd extends XiaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var r = SceneTitle.new(game)
            game.replaceScene(r)
        })
    }
    draw() {
        this.game.context.fillText('game over! press r to continue', 100, 290)
    }
}