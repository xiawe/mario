class Bird extends XiaAnimation {
    constructor(game) {
        super(game)
        log('bird', this)
        this.flipX = false
        this.angle = 0
        this.vy = 0
        this.gy = 10 * 0.2
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        var x = this.x + w2
        var y = this.y + h2
        context.translate(x, y)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.translate(-w2, -h2)
        context.rotate(this.angle * Math.PI / 180)
        context.drawImage(this.texture, 0, 0)
        context.restore()
    }
    update() {
        super.update()
        if (this.angle < 45) {
            this.angle += 5
        }
        this.y += this.vy
        this.vy += this.gy
        if (this.y > 380) {
            this.y = 380
        }
    }
    move(s, keyStatus) {
        this.flipX = s < 0
        this.x += s
    }
    jump() {
        this.vy = -10
    }
}