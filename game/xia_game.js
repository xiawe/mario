class XiaGame {
    constructor(fps, images, runCallback) {
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.imgs = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = 'up'
        })
    
        this.fps = fps
        this.init(images)
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImg(oImg) {
        this.context.drawImage(oImg.texture, oImg.x, oImg.y, oImg.w, oImg.h)
        // this.context.drawImage(oImg.texture, oImg.x, oImg.y)
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runLoop() {
        // log('fps', this.fps)
        var keys = Object.keys(this.actions)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            var keyStatus = this.keydowns[key]
            if (keyStatus == 'down') {
                this.actions[key]('down')
            } else if (keyStatus == 'up') {
                this.actions[key]('up')
            }
            this.keydowns[key] = null
        }
        this.update()
        this.context.clearRect(0, 0, 400, 650)
        this.draw()
        setTimeout(() => {
            this.runLoop()
        }, 1000 / this.fps)
    }

    init(images) {
        var loads = []
        var g = this
        var names = Object.keys(images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let img = new Image()
            img.src = images[name]
            img.onload = function() {
                g.imgs[name] = img 
                loads.push(1)
                if (loads.length == names.length) {
                    g.__start()
                }
            }
        }
    }

    __start() {
        this.runCallback(this)
        setTimeout(() => {
            this.runLoop()
        })
    }

    textureByName(name) {
        var img = this.imgs[name]
        // var image = {
        //     img: img,
        //     x: img.width,
        //     y: img.height,
        // }
        return img 
    }

    runScene(scene) {
        this.scene = scene
    }

    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    replaceScene(scene) {
        this.scene = scene
    }
}