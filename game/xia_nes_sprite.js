class XiaNesSprite {
    constructor(game, map) {
        this.map = map
        this.bytes = window.bytes
        this.tileOffset = 32784
        this.pixelWdith = 2
        this.rowsOfSprite = 4
        this.columnOfSprite = 2
        this.w = this.pixelWdith * 8 * this.columnOfSprite 
        this.h = this.pixelWdith * 8 * this.rowsOfSprite
        this.flipX = false
        this.vy = 0
        this.s = 0
        this.maxSpeed = 15
        this.vx = 0
        this.vm = 0
        this.keyStatus = 'up'
        this.gy = 10 * 0.2
        this.game = game
        this.frameIndex = 0
        this.frameCount = 4
        this.angle = 0
    }
    static new(...args) {
        return new this(...args)
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
        var context = this.game.context
        var w2 = this.w / 2
        var h2 = this.h / 2
        var x = this.x + w2
        var y = this.y + h2
        if (this.flipX) {
            context.save()
            context.translate(x, y)
            context.scale(-1, 1)
            // context.translate(-w2, -h2)
            context.translate(-x, -y) 
            this.drawSprite()
            context.restore()
        } else {
            this.drawSprite()
        }
    }
    update() {
        let i = Math.floor(this.x / 32)
        let j = Math.floor(this.y / 32) + 2
        let onGround = this.map.onTheGround(i, j)
        // log('onGround', onGround, this.vy)
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 6
            this.frameIndex = (this.frameIndex + 1) % 3
        }
        if (onGround && this.vy > 0) {
            this.vy = 0
        }
        this.y += this.vy
        this.vy += this.gy
        if (this.y > 420) {
            this.y = 420
        }
        this.vx += this.vm
        if (Math.abs(this.vx) >= this.maxSpeed) {
            this.vx > 0 ? this.vx = this.maxSpeed : this.vx = -this.maxSpeed
            log('max vx', this.vx)
        }
        // 判断速度和摩擦力（负的）是否同向
        if (this.vx * this.vm > 0) {
            this.vx = 0
            this.vm = 0
        } else {
            this.x += this.vx
        }

    }
    move(s, keyStatus) {
        this.flipX = s < 0
        this.s = s
        if (keyStatus == 'down') {
            this.vx += 0.5 * s
            this.vm = -0.3 * s
        } 
    }
    jump() {
        this.vy = -10
    }
}
