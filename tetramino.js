// https://tetris.fandom.com/wiki/SRS

function ImageArray(data, N=4) {
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

const Tetramino = {
    'I': {
        color: 'cyan',
        images: ImageArray([
            '    ', '  I ', '    ', ' I  ',
            'IIII', '  I ', '    ', ' I  ',
            '    ', '  I ', 'IIII', ' I  ',
            '    ', '  I ', '    ', ' I  ',
        ])
    },
    'J': {
        color: 'blue',
        images: ImageArray([
            'J  ', ' JJ', '   ', ' J ',
            'JJJ', ' J ', 'JJJ', ' J ',
            '   ', ' J ', '  J', 'JJ ',
        ])
    },
    'L': {
        color: 'orange',
        images: ImageArray([
            '  L', ' L ', '   ', 'LL ',
            'LLL', ' L ', 'LLL', ' L ',
            '   ', ' LL', 'L  ', ' L ',
        ])
    },
    'O': {
        color: 'yellow',
        images: ImageArray([
            'OO', 'OO', 'OO', 'OO',
            'OO', 'OO', 'OO', 'OO',
        ])
    },
    'S': {
        color: 'green',
        images: ImageArray([
            ' SS', ' S ', '   ', 'S  ',
            'SS ', ' SS', ' SS', 'SS ',
            '   ', '  S', 'SS ', ' S ',
        ])
    },
    'T': {
        color: 'purple',
        images: ImageArray([
            ' T ', ' T ', '   ', ' T ',
            'TTT', ' TT', 'TTT', 'TT ',
            '   ', ' T ', ' T ', ' T ',
        ])
    },
    'Z': {
        color: 'red',
        images: ImageArray([
            'ZZ ', '  Z', '   ', ' Z ',
            ' ZZ', ' ZZ', 'ZZ ', 'ZZ ',
            '   ', ' Z ', ' ZZ', 'Z  ',
        ])
    },
}

Tetramino.types = Object.keys(Tetramino)
