var Paddle = function(game) {
    var o = game.imageByName('player')
    o.x = 200
    o.y = 350
    o.speed = 8
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }
    return o
}