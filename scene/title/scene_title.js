class SceneTitle extends XiaScene {
    constructor(game) {
        super(game)
        var label = XiaLabel.new(this.game, 'hello')
        this.addElement(label)
        // var w = Bird.new(this.game)
        // this.pipe = Pipe.new(game)
        this.setup()
        this.setupInputs()
        // w.x = 100
        // w.y = 200
        // w.w = w.texture.width
        // w.h = w.texture.height
        // this.addElement(w)
        // this.bird = w
    }
    setup() {
        var game = this.game
        this.bg = XiaImage.new(game, 'bg')
        this.bg.y = 300
        this.bg.w = 400
        this.bg.h = this.bg.h * 2
        this.addElement(this.bg)
        // this.addElement(this.pipe)
        this.land = XiaImage.new(game, 'land')
        // this.addElement(this.land)
        this.lands = []
        this.skipCount = 5
        for (let i = 0; i < 2; i++) {
            var l = XiaImage.new(game, 'land')
            l.x = l.w * i
            l.y = 400
            this.addElement(l)
            this.lands.push(l)
        }
        this.mario = XiaNesSprite.new(game)
        this.mario.x = 100
        this.mario.y = 306
        this.addElement(this.mario)
    }
    setupInputs() {
        // log('this.bird',w)
        let w = this.mario
        this.game.registerAction('a', function(keyStatus) {
            // w.flipX = true
            w.move(-10, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus) {
            // w.flipX = true
            w.move(10, keyStatus)
            // log('keyStatus', keyStatus)
        })
        this.game.registerAction('w', function(keyStatus) {
            // w.angle = -45
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
        var game = this.game
        // for (let i = 0; i < 2; i++) {
        //     var l = this.lands[i]
        //     l.x += offset
        //     l.y = 400
        //     this.lands.push(l)
        // }
    }
    move(s, keyStatus) {
        this.flipX = s < 0
        this.x += s
    }
    jump() {
        this.vy = -10
    }
}
