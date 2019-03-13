class XiaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugMode = true
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(image) {
        // addElement 的时候就会给 XiaImage 添加一个 scene
        image.scene = this
        this.elements.push(image)
    }

    draw() {
        for(var e of this.elements) {
            e.draw()
        }
        // for (let i = 0; i < this.elements.length; i++) {
        //     var e = this.elements[i]
        //     this.game.drawImg(e)
        // }
    }
    update() {
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            if (this.debugMode) {
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}