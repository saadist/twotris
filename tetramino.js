function ImageArray(data, N = 4) {
    return new Proxy(
        data.reduce(
            (images, x, i) => {
                images[i % N].push([...x])
                return images
            },
            [[], [], [], []]
        ),
        {
            get: (images, key) => images[key]
        }
    )
}


// SRS Wall Kicks
// --------------
// kicksXXX[r][dr][test][dx, dy]
// - r: current absolute rotation ∈ {0,1,2,3}
// - dr: attemted relative rotation ∈ {1=c,3=ccw}
// - test: index of test
// - dx, dy: the translation to test
// source: https://tetris.fandom.com/wiki/SRS#Wall_Kicks (only dy is flipped here)
const kicksJLTSZ = {
    0: {
        1: [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
        3: [[1, 0], [1, -1], [0, 2], [1, 2]],
    },
    1: {
        1: [[1, 0], [1, 1], [0, -2], [1, -2]],
        3: [[1, 0], [1, 1], [0, -2], [1, -2]],
    },
    2: {
        1: [[1, 0], [1, -1], [0, 2], [1, 2]],
        3: [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
    },
    3: {
        1: [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
        3: [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
    }
}


const kicksI = {
    0: {
        1: [[-2, 0], [1, 0], [-2, 1], [1, -2]],
        3: [[-1, 0], [2, 0], [-1, -2], [2, 1]],
    },
    1: {
        1: [[-1, 0], [2, 0], [-1, -2], [2, 1]],
        2: [[2, 0], [-1, 0], [2, -1], [-1, 2]],
    },
    2: {
        1: [[2, 0], [-1, 0], [2, -1], [-1, 2]],
        3: [[1, 0], [-2, 0], [1, 2], [-2, -1]],
    },
    3: {
        1: [[1, 0], [-2, 0], [1, 2], [-2, -1]],
        3: [[-2, 0], [1, 0], [-2, 1], [1, -2]],
    }
}

const kicksO = {
    0: {},
    1: {},
    2: {},
    3: {}
}

const Tetramino = {
    'I': {
        color: 'cyan',
        images: ImageArray([
            '    ', '  I ', '    ', ' I  ',
            'IIII', '  I ', '    ', ' I  ',
            '    ', '  I ', 'IIII', ' I  ',
            '    ', '  I ', '    ', ' I  ',
        ]),
        kicks: kicksI,
    },
    'J': {
        color: 'blue',
        images: ImageArray([
            'J  ', ' JJ', '   ', ' J ',
            'JJJ', ' J ', 'JJJ', ' J ',
            '   ', ' J ', '  J', 'JJ ',
        ]),
        kicks: kicksJLTSZ ,
    },
    'L': {
        color: 'orange',
        images: ImageArray([
            '  L', ' L ', '   ', 'LL ',
            'LLL', ' L ', 'LLL', ' L ',
            '   ', ' LL', 'L  ', ' L ',
        ]),
        kicks: kicksJLTSZ ,
    },
    'O': {
        color: 'yellow',
        images: ImageArray([
            'OO', 'OO', 'OO', 'OO',
            'OO', 'OO', 'OO', 'OO',
        ]),
        kicks: kicksO,
    },
    'S': {
        color: 'green',
        images: ImageArray([
            ' SS', ' S ', '   ', 'S  ',
            'SS ', ' SS', ' SS', 'SS ',
            '   ', '  S', 'SS ', ' S ',
        ]),
        kicks: kicksJLTSZ ,
    },
    'T': {
        color: 'purple',
        images: ImageArray([
            ' T ', ' T ', '   ', ' T ',
            'TTT', ' TT', 'TTT', 'TT ',
            '   ', ' T ', ' T ', ' T ',
        ]),
        kicks: kicksJLTSZ ,
    },
    'Z': {
        color: 'red',
        images: ImageArray([
            'ZZ ', '  Z', '   ', ' Z ',
            ' ZZ', ' ZZ', 'ZZ ', 'ZZ ',
            '   ', ' Z ', ' ZZ', 'Z  ',
        ]),
        kicks: kicksJLTSZ ,
    },
}

Tetramino.types = Object.keys(Tetramino)


