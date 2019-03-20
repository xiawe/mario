class SceneEditor extends XiaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        let game = this.game
        this.land = XiaImage.new(game, 'land')
        this.skipCount = 5
        this.map = XiaTileMap.new(game)
        this.addElement(this.map)
        let map = this.map
        this.mario = XiaNesSprite.new(game, this.map)
        this.mario.x = 100
        this.mario.y = 55
        this.addElement(this.mario)
    }
    setupInputs() {
        let w = this.mario
        this.game.registerAction('a', function(keyStatus) {
            w.move(-10, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus) {
            w.move(10, keyStatus)
        })
        this.game.registerAction('w', function(keyStatus) {
            w.jump()
        })
    }
    update() {
        super.update()
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 5
            offset = 20
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
