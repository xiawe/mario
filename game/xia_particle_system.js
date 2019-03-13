class XiaParticle extends XiaImage {
    constructor(game) {
        super(game, 'spark')
        this.life = 5
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        this.vx += 0.05 * this.vx
        this.vy += 0.05 * this.vy
    }
}

class XiaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticle = 100
        this.particles = []
        this.duration = 60
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    update() {
        this.duration--
        if (this.duration < 0) {
            this.particles = []
        }
        for(var p of this.particles) {
            p.update()
        }
        if (this.particles.length < this.numberOfParticle) {
            this.numberOfParticle--
            var p = XiaParticle.new(this.game)
            var vx = randomBetween(-10, 10)
            var vy = randomBetween(-10, 10)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        for(var p of this.particles) {
            p.draw()
        }
    }
}