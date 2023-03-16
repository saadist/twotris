
class Piece {
    constructor(type) {
        this.type = type
        this.size = Tetramino[type].images[0].length
        this.color = Tetramino[type].color
        this.x = 0
        this.y = 0
        this.r = 0
    }

    cells() {
        const { type, x, y, r, size } = this
        const image = Tetramino[type].images[r]
        const cells = []
        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                if (image[i][j] != 0) { // HMM
                    cells.push([x + j, y + i])
                }
            }
        }
        return cells
    }
}

function EmptyLine(length) {
    return Array.from({ length }, () => null)
}

function EmptyLines(height, width) {
    return Array.from({ length: height }, () => EmptyLine(width))
}

class Field {
    constructor(height = 22, width = 10) {
        this.height = height
        this.width = width
        this.lines = EmptyLines(height, width)
        this.piece = null
    }

    vacant(x, y) {
        return (
            x >= 0 && x < this.width &&
            y >= 0 && y < this.height &&
            this.lines[y][x] == null
        )
    }

    dropHeight(piece) {
        const N = this.height
        let hmin = N
        const vacant = (x, y) => {
            const p = this.lines[y][x]
            return p == null || p == piece
        }
        for (const [x, y] of piece.cells()) {
            let h = y + 1
            while (h < N && vacant(x, h)) h++;
            hmin = Math.min(h - 1 - y, hmin)
        }
        return hmin
    }

    spawn() {
        const type = Tetramino.types[Math.floor(Math.random() * Tetramino.types.length)]
        const piece = new Piece(type)
        piece.x = Math.floor((this.width - piece.size) / 2)
        const cells = piece.cells()
        if (cells.every(cell => this.vacant(...cell))) {
            cells.forEach(([x, y]) => this.lines[y][x] = piece)
            this.piece = piece
        }
    }

    lock() {
        console.assert(this.piece != null)
        this.transform(0, this.dropHeight(this.piece));
        this.lines = this.lines.filter(line => line.some(p => p == null))
        const clearedLines = this.height - this.lines.length
        this.lines.unshift(...EmptyLines(clearedLines, this.width))
        this.piece = null
        this.spawn()
        if (this.piece == null) {
            this.pause()
            console.log('GAME OVER')
        }
    }

    transform(dx, dy, dr = 0) {
        const { piece, lines } = this
        let cells = piece.cells()
        cells.forEach(([x, y]) => lines[y][x] = null)

        const kicks = Tetramino[piece.type].kicks[this.piece.r][dr]?.map(
            ([dx,dy]) => ({dx,dy,dr})
        )

        const ts = [{ dx, dy, dr }, ...(kicks || [])]

        for (const { dx, dy, dr } of ts) {

            piece.x += dx
            piece.y += dy
            piece.r = (piece.r + dr) % 4 // HMM

            const nextCells = piece.cells()
            if (!nextCells.every(cell => this.vacant(...cell))) {
                piece.x -= dx
                piece.y -= dy
                piece.r = (piece.r + 4 - dr) % 4
            } else {
                cells = nextCells
                break;
            }
        }

        cells.forEach(([x, y]) => lines[y][x] = piece)
    }
}
