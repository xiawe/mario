class XiaTileMap {
    constructor(game) {
        this.game = game 
        this.tiles = [
            0, 2, 3, -1, 1,
            1, 1, 3, -1, 2,
            3, 3, 2, -1, 3,
        ]
        this.tileImages = [
            XiaImage.new(game, 't1'),
            XiaImage.new(game, 't2'),
            XiaImage.new(game, 't3'),
            XiaImage.new(game, 't4'),
        ]
        this.tileSize = 32
        this.th = 5
        this.tw = this.tiles.length / this.th
    }
    static new(...args) {
        return new this(...args)
    } 
    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != -1) {
                let image = this.tileImages[index]
                // log('image', i, index, image)
                image.x = Math.floor(i / this.th) * this.tileSize
                image.y = i % this.th * this.tileSize
                this.game.drawImg(image)         
            }      
        }
    }
    update() {

    }
}

class SceneEditor extends XiaScene {
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
        this.map = XiaTileMap.new(game)
        this.addElement(this.map)
        this.mario = XiaNesSprite.new(game)
        this.mario.x = 100
        this.mario.y = 55
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
