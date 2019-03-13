class Bullet extends XiaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 2
    }
    update() {
        this.y -= this.speed
    }
}

class Player extends XiaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
        this.speed = 5
    }
    setup() {
        this.cooldown = 0
    }
    update() {
        // this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    debug() {
        this.speed = config.player_speed
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = 15
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

class Enemy extends XiaImage {
    constructor(game) {
        var e = randomBetween(0, 4)
        var name = 'enemy' + e
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(4, 8)
        this.x = randomBetween(0, 390)
        this.y = -50
    }
    update() {
        this.y += this.speed
        if (this.y > 670) {
            this.setup()
        }
    }
}
class Cloud extends XiaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 2
        this.x = randomBetween(0, 390)
        this.y = -20
    }
    update() {
        this.y += this.speed
        if (this.y > 650) {
            this.setup()
        }
    }
}
class Scene extends XiaScene {
    constructor(game) {
        super(game)
        this.numebrOfEnemy = 10
        this.setup()
        this.setupInput()
    }
    setup() {
        var game = this.game
        this.bg = XiaImage.new(game, 'bg')
        // this.player = XiaImage.new(game, 'player')
        this.player = Player.new(game)
        this.player.x = 180
        this.player.y = 550
        this.enemy = Enemy.new(game)
        this.cloud = Cloud.new(game)
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
        this.addElement(this.enemy)
        this.addEnemy()
        var ps = XiaParticleSystem.new(this.game)
        this.addElement(ps)
        enableDebugMode(true, game)
    }
    addEnemy() {
        var es = []
        var game = this.game 
        for (let i = 0; i < this.numebrOfEnemy; i++) {
            var e = Enemy.new(game)
            this.addElement(e)
            es.push(e)
        }
        // log('es',es)
        this.es = es 
    }
    setupInput() {
        this.game.registerAction('a', () => {
            this.player.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.player.moveRight()
        })
        this.game.registerAction('w', () => {
            this.player.moveUp()
        })
        this.game.registerAction('s', () => {
            this.player.moveDown()
        })
        this.game.registerAction('j', () => {
            this.player.fire()
        })
    }
}
