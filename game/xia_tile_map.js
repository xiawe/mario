class XiaTileMap {
    constructor(game) {
        this.game = game 
        this.offsetX = - 10
        this.tiles = [
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,3,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,3,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,3,
            -1,-1,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,3,3,-1,-1,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,3,3,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,3,3,-1,-1,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,3,3,-1,-1,-1,-1,4,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,3,3,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,3,3,3,3,3,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3]
        this.tileImages = [
            XiaImage.new(game, 't1'),
            XiaImage.new(game, 't2'),
            XiaImage.new(game, 't3'),
            XiaImage.new(game, 't4'),
        ]
        this.tileSize = 32
        this.th = 15
        this.tw = this.tiles.length / this.th
    }
    static new(...args) {
        return new this(...args)
    } 
    draw() {
        this.offsetX--
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i] - 1
            if (index > 0) {
                let image = this.tileImages[index]
                image.x = Math.floor(i / this.th) * this.tileSize + this.offsetX
                image.y = i % this.th * this.tileSize
                this.game.drawImg(image)         
            }      
        }
    }
    onTheGround(i, j) {
        let index = i * this.th + j
        // log('map', i, j, this.tiles[index])
        return this.tiles[index] != -1
    }
    update() {

    }
}