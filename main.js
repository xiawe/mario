var blocks = []
window.fps = 30 
var enableDebugMode = function(enable, game) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function() {
        if (event.key == 'p') {
            window.paused = !window.paused
        } else if ('01234567'.includes(event.key)) {
            var n = event.key
            // blocks = loadLevel(Number(n), game)
        }
    })
    var slide = document.querySelector('.slide')
    slide.addEventListener('input', function(e) {
        // log('slide', slide.value)
        window.fps = slide.value 
    })
}

var __main = function() {
    var images = {
        bg: 'img/bg.png',
        land: 'img/land.png',
        pipe1: 'img/pipe1.png',
        pipe2: 'img/pipe2.png',
        bird1: 'img/bird-01.png',
        bird2: 'img/bird-02.png',
        bird3: 'img/bird-03.png',
        bird4: 'img/bird-04.png',
    }

    const ajax = request => {
        let r = new XMLHttpRequest()
        r.open('GET', request.url, true)
        r.responseType = 'arraybuffer'
        r.onreadystatechange = event => {
            if (r.readyState == 4) {
            request.callback(r.response)
            }
        }
        r.send()
    }

    let request = {
        url: 'mario.nes',
        callback(r) {
          window.bytes = new Uint8Array(r)
          log('mario file', window.bytes)
          var game = XiaGame.instance(window.fps, images, function(g) {
            // var s = Scene.new(g) 
            var s = SceneTitle.new(g)
            g.runScene(s)
        })
        }
      }
      ajax(request)
}
__main()