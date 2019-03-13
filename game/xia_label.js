class XiaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, 100, 290)
        this.game.context.fillStyle  = '#00a1d6'
        this.game.context.fillRect(0, 0, 600, 600)
    }
    update() {

    }
}