class XiaNesSprite {
    constructor(game) {
        this.bytes = window.bytes
        this.tileOffset = 32784
        this.pixelWdith = 3
        this.rowsOfSprite = 4
        this.columnOfSprite = 2
        this.w = this.pixelWdith * 8 * this.columnOfSprite 
        this.h = this.pixelWdith * 8 * this.rowsOfSprite
        this.flipX = false
        this.vy = 0
        this.gy = 10 * 0.2
        this.game = game
        // this.animations = {
        //     idle: [],
        //     run: [],
        // }
        // for (let i = 1; i < 5; i++) {
        //     var name = `bird${i}`
        //     var m = game.textureByName(name)
        //     this.animations.idle.push(m)
        // }
        this.frameIndex = 0
        this.frameCount = 4
        this.angle = 0
        // this.animationName = 'idle'
        // this.texture = this.frames()[0]
    }
    static new(game) {
        return new this(game)
    }
    drawBlock(context, data, x, y, pixelWdith) {
        const colors = [
          'white',
          '#FE1000',
          '#ffB010',
          '#AA3030',
        ]
        let w = pixelWdith
        for (let i = 0; i < 8; i++) {
            // 1 个 block 16 byte 
            let p1 = data[i]
            // ----------------------- 不懂 -------------------------
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
            // 8 bit per line
            // log('test', p1 >> 7)
            let c1 = (p1 >> (7 - j)) & 0b00000001
            // log('c1', c1)
            let c2 = (p2 >> (7 - j)) & 0b00000001
            // ----------------------- 不懂 -------------------------
            let pixel = (c2 << 1) + c1
            if (pixel == 0) {
                continue
            }
            // log('pixel', pixel)
            let color = colors[pixel]
            context.fillStyle = color
            let px = x + j * w
            let py = y + i * w
            context.fillRect(px, py, w, w)
            }            
        }
    }

    drawNes() {
        let bytes = this.bytes
        let canvas = e('#id-canvas')
        let context = canvas.getContext('2d')
        let blockSize = 8
        let pixelSize = 8
        let pixelWdith = 10
        let numberOfBytesPerBlock = 16
        for (let i = 0; i < blockSize; i++) {
            for (let j = 0; j < blockSize; j++) {
                // 算出 bytes
                let x = j * pixelSize * pixelWdith
                let y = i * pixelSize * pixelWdith
                // 计算 block 字节的偏移
                let index = window.offset + (i * 8 + j ) * numberOfBytesPerBlock
                drawBlock(context, bytes.slice(index), x, y, pixelWdith)              
            }            
        }
    }
    drawSprite() {
        // log('this.frameCount', this.frameCount)
        let bytesPerBlock = 16
        let blockPerSprite = 8
        let dataOffset = this.tileOffset + bytesPerBlock * blockPerSprite * this.frameIndex
        let data = this.bytes.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWdith = this.pixelWdith
        let blockWidth = pixelsPerBlock * pixelWdith
        let offset = 0
        for (let i = 0; i < this.rowsOfSprite; i++) {
            for (let j = 0; j < this.columnOfSprite; j++) {
                let x = this.x + j * blockWidth
                let y = this.y + i * blockWidth
                this.drawBlock(context, data.slice(offset), x, y, pixelWdith)    
                offset += 16     
                // log('offset',offset)
            }
        }
    }
    frames() {
        return this.animations[this.animationName]
    }
    changeAnimation(name) {
        this.animationName = name
    }
    draw() {
        this.drawSprite()
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        var x = this.x + w2
        var y = this.y + h2
        log('pos', x, y,w2, h2, this.flipX)
        context.translate(x, y)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        // context.rotate(this.angle * Math.PI / 180)
        // context.translate(-w2, -h2)
        this.drawSprite()
        // context.drawImage(this.texture, 0, 0)
        context.restore()
        // this.drawSprite()
    }
    update() {
        // log('this.frameCount',this.frameCount)
        // this.frameCount++
        // this.frameCount %= 4
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 6
            this.frameIndex = (this.frameIndex + 1) % 3
            // this.texture = this.frames()[this.frameIndex]
        }
        this.y += this.vy
        this.vy += this.gy
        if (this.y > 306) {
            this.y = 306
        }
    }
    move(s, keyStatus) {
        // log('move', keyStatus)
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
        this.flipX = s < 0
        this.x += s
    }
    jump() {
        this.vy = -10
    }
}