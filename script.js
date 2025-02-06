document.addEventListener("DOMContentLoaded", function() {
    const rows = "87654321";
    const cols = "abcdefgh";
    const initialBoardSetup = [
        "rnbqkbnr",
        "pppppppp",
        "        ",
        "        ",
        "        ",
        "        ",
        "PPPPPPPP",
        "RNBQKBNR"
    ];
    const boardElement = document.getElementById("chessboard");
    let rotated = false;

    function createBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 64; i++) {
            const square = document.createElement('div');
            const row = Math.floor(i / 8);
            const col = i % 8;
            square.className = (row + col) % 2 === 0 ? 'white' : 'black';
            const piece = document.createElement('span');
            piece.className = 'piece';
            piece.textContent = initialBoardSetup[row][col].replace(' ', '');
            square.appendChild(piece);
            boardElement.appendChild(square);
        }
        addDragDropHandlers();
    }

    function addDragDropHandlers() {
        const pieces = document.querySelectorAll('.piece');
        pieces.forEach(piece => {
            piece.draggable = true;
            piece.addEventListener('dragstart', handleDragStart);
        });

        const squares = document.querySelectorAll('#chessboard div');
        squares.forEach(square => {
            square.addEventListener('dragover', handleDragOver);
            square.addEventListener('drop', handleDrop);
        });
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text', e.target.textContent);
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        e.target.textContent = data;
        e.target.draggable = true;
    }

    function resetBoard() {
        createBoard();
    }

    function rotateBoard() {
        rotated = !rotated;
        boardElement.style.transform = rotated ? 'rotate(180deg)' : '';
        const pieces = document.querySelectorAll('.piece');
        pieces.forEach(piece => {
            piece.style.transform = rotated ? 'rotate(180deg)' : '';
        });
    }

    createBoard();  // Initial board setup
    window.resetBoard = resetBoard;
    window.rotateBoard = rotateBoard;
});
