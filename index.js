document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6] 
    ];

    function initializeBoard() {
        console.log('Initializing board...');
        const cells = document.querySelectorAll('#board div');
        console.log('Found cells:', cells.length);
        cells.forEach((cell, index) => {
            console.log(`Attaching event listener to cell ${index}`);
            cell.addEventListener('click', handleCellClick);
            cell.textContent = ''; 
        });
    }

    function handleCellClick(event) {
        console.log('Cell clicked:', event.target);
        const index = event.target.getAttribute('data-index');
        console.log('Index:', index);
        if (gameBoard[index] !== '' || !gameActive) {
            console.log('Invalid move: cell already filled or game not active');
            return;
        }

        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        console.log('Game board updated:', gameBoard);

        if (checkWinner()) {
            document.getElementById('status').textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            console.log(`Player ${currentPlayer} wins!`);
            return;
        }

        if (gameBoard.every(cell => cell !== '')) {
            document.getElementById('status').textContent = "It's a Draw!";
            gameActive = false;
            console.log("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
        console.log(`Now ${currentPlayer}'s turn`);
    }

    function checkWinner() {
        const winner = winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
        console.log('Checking for winner:', winner);
        return winner;
    }

    function resetGame() {
        console.log('Resetting game...');
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
        const cells = document.querySelectorAll('#board div');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    const resetButton = document.getElementById('reset');
    if (resetButton) {
        console.log('Attaching event listener to reset button');
        resetButton.addEventListener('click', resetGame);
    } else {
        console.error('Reset button not found!');
    }
    
    initializeBoard();
});