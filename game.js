document.addEventListener('DOMContentLoaded', function() {
  var board = null;
  var game = new Chess();
  var boardConfig = {
      draggable: true,
      position: 'start',
      onDragStart: function(source, piece, position, orientation) {
          if (game.game_over() || (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
              (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
              return false;
          }
      },
      onDrop: function(source, target) {
          var move = game.move({
              from: source,
              to: target,
              promotion: 'q' // NOTE: Always promote to a queen for simplicity
          });

          if (move === null) return 'snapback';

          // Store game state to local storage
          localStorage.setItem('savedGame', game.fen());
      },
      onSnapEnd: function() {
          board.position(game.fen());
      }
  };

  // Initialize board with local storage saved state
  var savedGame = localStorage.getItem('savedGame');
  if (savedGame) {
      game.load(savedGame);
      boardConfig.position = savedGame;
  }

  board = Chessboard('chessboard', boardConfig);
});
