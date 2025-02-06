var socket = io();

var board,
  game = new Chess();

function makeMove(move) {
  game.move(move);
  board.position(game.fen());
  socket.emit('move', move);
}

socket.on('move', function (msg) {
  game.move(msg);
  board.position(game.fen());
});

var config = {
  draggable: true,
  position: 'start',
  onDragStart: function (source, piece, position, orientation) {
    if (game.game_over() === true ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
  },
  onDrop: function (source, target) {
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    if (move === null)  return 'snapback';
    makeMove(move);
  },
  onSnapEnd: function () {
    board.position(game.fen());
  }
};
board = ChessBoard('chessboard', config);
