const fieldCanvas = document.getElementById('game-field')
const fieldCtx = fieldCanvas.getContext('2d')

const pieceCanvas = document.getElementById('next-piece')
const pieceCtx = pieceCanvas.getContext('2d')
const audioPlayer = document.getElementById('audio-player')

// function drawGrid(ctx, lines, rows, width, height) {
//     ctx.beginPath()
//     for (let x = 1; x < 10; x++) {
//         ctx.moveTo(10 * x, 0);
//         ctx.lineTo(10 * x, 200);
//     }

//     for (let y = 1; y < 20; y++) {
//         ctx.moveTo(0, 10 * y);
//         ctx.lineTo(100, 10 * y);
//     }
//     ctx.strokeStyle = "#ff0";
//     ctx.stroke();
// }


class TwoTris extends Field {

    constructor() {
        super()
        this.spawn()
        this.draw()
    }

    play() {
        audioPlayer.play()
        this.timer = setInterval(() => {
            if (this.dropHeight(this.piece) > 0) {
                this.down()
            } else {
                this.lock()
            }
            this.draw()
        }, 1000)
    }

    pause() {
        if (this.timer) {
            audioPlayer.pause()
            clearInterval(this.timer)
            this.timer = null
        } else {
            this.play()
        }
    }

    print() {
        console.log([..."#".repeat(this.width)])
        for (const line of this.lines) {
            console.log(line.map(p => p == null ? ' ' : p.type))
        }
        console.log([..."#".repeat(this.width)])
    }

    draw() {
        fieldCtx.clearRect(0, 0, 100, 200)
        fieldCtx.beginPath()
        for (let x = 1; x < 10; x++) {
            fieldCtx.moveTo(10 * x, 0);
            fieldCtx.lineTo(10 * x, 200);
        }

        for (let y = 1; y < 20; y++) {
            fieldCtx.moveTo(0, 10 * y);
            fieldCtx.lineTo(100, 10 * y);
        }
        fieldCtx.strokeStyle = "#ff0";
        fieldCtx.stroke();

        const visibleLines = this.lines.slice(2)
        for (const i in visibleLines) {
            const line = visibleLines[i]
            for (const j in line) {
                const piece = line[j]
                if (piece) {
                    fieldCtx.fillStyle = piece.color;
                    fieldCtx.fillRect(10 * j, 10 * i, 10, 10)
                }
            }
        }

        pieceCtx.clearRect(0, 0, 40, 20)
        const piece = this.piece
        if (piece) {
            pieceCtx.fillStyle = piece.color;
            const image = Tetramino[piece.type].images[0]
            for (const i in image) {
                const line = image[i]
                for (const j in line) {
                    if (line[j] == piece.type) {
                        pieceCtx.fillRect(10 * j, 10 * i, 10, 10)
                    }
                }
            }
        }
    }

    left() { this.transform(-1, 0) }
    right() { this.transform(1, 0) }
    down() { this.transform(0, 1) }
    cw() { this.transform(0, 0, 1) }
    ccw() { this.transform(0, 0, 3) }
    drop() { this.lock() }
}


const game = new TwoTris()


const keyMap = {
    'ArrowLeft': () => game.left(),
    'ArrowRight': () => game.right(),
    'ArrowDown': () => game.down(),
    'KeyX': () => game.cw(),
    'ArrowUp': () => game.cw(),
    'KeyZ': () => game.ccw(),
    'ControlLeft': () => game.ccw(),
    'Space': () => game.drop(),
    'Enter': () => game.pause(),
    'Escape': () => game.pause(),
    'KeyQ': () => game.draw(),
}

onkeydown = function ({ code }) {
    //console.log(code)
    keyMap[code]?.()
    game.draw()
}

