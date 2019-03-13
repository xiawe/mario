var log = console.log.bind(console)

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1) + start
    return Math.floor(n)
}

var imgFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img 
}

var collide = function(a, b) {
    if (b.y > a.y && a.x > b.x && b.y - a.y < a.img.height && a.x - b.x < b.img.width) {
        // log('bang!')
        return true
    } else if (b.y > a.y && b.x > a.x && b.y - a.y < a.img.height && b.x - a.x < a.img.width) {
        // log('you bang!z')
        return true
    }
    return false
}