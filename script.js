var board = null;
var game = new Chess();

function onDrop(source, target, piece, newPos, oldPos, orientation) {
    // See if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: Always promote to a queen for simplicity
    });

    // Illegal move
    if (move === null) return 'snapback';
    updateStatus();
}

function updateStatus() {
    var status = '';

    var moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    // checkmate?
    if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (game.in_draw()) {
        status = 'Game over, drawn position';
    }

    console.log(status);
}

function resetBoard() {
    game.reset();
    board.start();
}

var config = {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    onSnapEnd: function() {
        board.position(game.fen());
    }
};
board = Chessboard('chessboard', config);
