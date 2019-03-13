var Ball = function(game) {
    var o = game.imageByName('ball')
    o.x = 100
    o.y = 150
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.bounce = function() {
        o.speedY = -o.speedY
    }
    o.move = function() {
        if (o.fired) {
            if (o.x <= 0 ||o.x >= 500) {
                o.speedX = -o.speedX
            }
            if (o.y <= 0 || o.y >= 400) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    return o
}