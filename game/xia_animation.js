class XiaAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
            run: [],
        }
        for (let i = 1; i < 5; i++) {
            var name = `bird${i}`
            var m = game.textureByName(name)
            this.animations.idle.push(m)
        }
        this.frameIndex = 0
        this.frameCount = 5
        this.animationName = 'idle'
        this.texture = this.frames()[0]
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    changeAnimation(name) {
        this.animationName = name
    }
    draw() {
        this.game.drawImg(this)
    }
    update() {
        // log('this.frameCount',this.frameCount)
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 5
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    move(s, keyStatus) {
        // log('move', keyStatus)
        var animationNames = {
            down: 'run',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
        this.x += s
    }
}