var Block = function(p, game) {
    var o = game.imageByName('block')
    o.x = p[0]
    o.y = p[1]
    o.lifes = p[2] || 1
    o.alive = true
    o.kill = function() {
        o.lifes --
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    return o
}