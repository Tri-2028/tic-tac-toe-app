// Tic-Tac-Toe game logic
// Uses plain HTML/CSS/JS with no dependencies.

import { playClickX, playClickO, playWin, playDraw } from './sfx.js';

(() => {

  const boardEl = document.getElementById('board');
  const difficultyEl = document.getElementById('difficulty');

  const turnTextEl = document.getElementById('turnText');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restartBtn');

  // Scoreboard elements
  const xScoreEl = document.getElementById('xScore');
  const oScoreEl = document.getElementById('oScore');
  const dScoreEl = document.getElementById('dScore');


  // Game state
  let board; // 9-length array holding null | 'X' | 'O'
  let currentPlayer; // 'X' or 'O'
  let gameOver;

  const HUMAN_PLAYERS = ['X', 'O'];

  // All winning lines (3 rows, 3 cols, 2 diagonals)
  const WIN_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function initBoardUI() {
    // Build 3x3 grid cells
    boardEl.innerHTML = '';

    for (let i = 0; i < 9; i++) {
      const cellBtn = document.createElement('button');
      cellBtn.type = 'button';
      cellBtn.className = 'cell';
      cellBtn.setAttribute('role', 'gridcell');
      cellBtn.setAttribute('aria-label', `Cell ${i + 1}`);
      cellBtn.dataset.index = String(i);

      // Marker element
      const mark = document.createElement('span');
      mark.className = 'mark';

      cellBtn.appendChild(mark);
      boardEl.appendChild(cellBtn);

      cellBtn.addEventListener('click', onCellClick);
    }
  }

  // Persistent scores (stay until page refresh)
  const scores = {
    X: 0,
    O: 0,
    D: 0
  };

  function updateScoresUI() {
    xScoreEl.textContent = String(scores.X);
    oScoreEl.textContent = String(scores.O);
    dScoreEl.textContent = String(scores.D);
  }

  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = HUMAN_PLAYERS[0]; // X starts
    gameOver = false;

    // Clear status
    statusEl.textContent = '';

    // Remove any previous winning highlight
    const cells = boardEl.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.classList.remove('is-winning');
    });

    // Update turn label
    setTurnText(currentPlayer);

    // Clear cell UI and re-enable
    cells.forEach((cell) => {
      cell.setAttribute('aria-disabled', 'false');
      const mark = cell.querySelector('.mark');
      mark.textContent = '';
      mark.classList.remove('mark--x', 'mark--o');
    });
  }


  function setTurnText(player) {
    turnTextEl.textContent = player;
  }

  function onCellClick(e) {
    if (gameOver) return;

    // Single-player mode: human is always 'X'. Ignore clicks when it's O's turn.
    if (currentPlayer !== 'X') return;


    const cellEl = e.currentTarget;
    const index = Number(cellEl.dataset.index);

    // Requirement: prevent clicking already occupied cells
    if (board[index] !== null) return;

    // Place current player's mark
    board[index] = currentPlayer;
    renderCell(cellEl, currentPlayer);

    // Click sound (works on mobile because audio is triggered by user gesture)
    if (currentPlayer === 'X') playClickX();
    else playClickO();


    // Check winner/draw
    const winner = getWinner(board);
    if (winner) {
      // Update score for winning player.
      if (winner === 'X') scores.X += 1;
      if (winner === 'O') scores.O += 1;
      updateScoresUI();

      // Winning sound effect.
      playWin();

      // Find the winning line so we can highlight it.
      const winningLine = getWinningLine(board);
      endGame(`${winner} wins!`, winningLine);

      return;
    }

    if (isDraw(board)) {
      // Update draw score.
      scores.D += 1;
      updateScoresUI();

      // Draw sound effect.
      playDraw();

      endGame('Draw! No more moves.');
      return;
    }



    // In single-player mode, human is X and computer is O.
    // After human moves, computer should make its move (unless game ended).
    currentPlayer = 'O';
    setTurnText(currentPlayer);

    // Trigger computer move immediately.
    setTimeout(() => computerMove(), 120);

  }

  function renderCell(cellEl, player) {
    const mark = cellEl.querySelector('.mark');
    mark.textContent = player;
    mark.classList.toggle('mark--x', player === 'X');
    mark.classList.toggle('mark--o', player === 'O');

    // Disable the cell after a move
    cellEl.setAttribute('aria-disabled', 'true');
  }

  function endGame(message, winningLine = null) {
    gameOver = true;
    statusEl.textContent = message;

    // Highlight winning cells if we have a winning line.
    // winningLine is an array of 3 indices.
    if (Array.isArray(winningLine)) {
      const cells = boardEl.querySelectorAll('.cell');
      cells.forEach((cell) => {
        const idx = Number(cell.dataset.index);
        cell.classList.toggle('is-winning', winningLine.includes(idx));
      });
    }

    // Disable remaining empty cells
    const cells = boardEl.querySelectorAll('.cell');
    cells.forEach((cell) => {
      const idx = Number(cell.dataset.index);
      if (board[idx] === null) {
        cell.setAttribute('aria-disabled', 'true');
      }
    });
  }


  function getWinner(b) {
    for (const [a, c, d] of WIN_LINES) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return b[a];
      }
    }
    return null;
  }

  // Returns winning line indices if there is a winner, otherwise null.
  function getWinningLine(b) {
    for (const [a, c, d] of WIN_LINES) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return [a, c, d];
      }
    }
    return null;
  }


  function isDraw(b) {
    // Draw when no null cells remain and there's no winner
    return b.every((cell) => cell !== null);
  }

  // ------------------------------
  // Computer AI (Human=X, Computer=O)
  // ------------------------------

  function getDifficulty() {
    // difficulty select lives in index.html
    const el = document.getElementById('difficulty');
    return (el && el.value) ? el.value : 'medium';
  }

  function getAvailableMoves(b) {
    const moves = [];
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) moves.push(i);
    }
    return moves;
  }

  function cloneBoard(b) {
    return b.slice();
  }

  function makeMove(b, idx, player) {
    const next = cloneBoard(b);
    next[idx] = player;
    return next;
  }

  function computerMove() {
    if (gameOver) return;
    if (currentPlayer !== 'O') return;

    const difficulty = getDifficulty();
    const available = getAvailableMoves(board);
    if (available.length === 0) return;

    let moveIndex;

    if (difficulty === 'easy') {
      // Easy: random move
      moveIndex = available[Math.floor(Math.random() * available.length)];
    } else if (difficulty === 'medium') {
      // Medium: win if possible, else block if needed, else take a heuristic move.
      moveIndex = getMediumMove(board);
    } else {
      // Hard: perfect play using minimax (depth limited for performance)
      moveIndex = getHardMove(board);
    }

    // Safety: ensure chosen move is available
    if (board[moveIndex] !== null) return;

    board[moveIndex] = 'O';

    const cellEl = boardEl.querySelector(`.cell[data-index="${moveIndex}"]`);
    if (cellEl) renderCell(cellEl, 'O');

    // Check winner/draw
    const winner = getWinner(board);
    if (winner) {
      if (winner === 'O') scores.O += 1;
      updateScoresUI();
      playWin();
      const winningLine = getWinningLine(board);
      endGame('O wins!', winningLine);
      return;
    }

    if (isDraw(board)) {
      scores.D += 1;
      updateScoresUI();
      playDraw();
      endGame('Draw! No more moves.');
      return;
    }

    // Back to human
    currentPlayer = 'X';
    setTurnText(currentPlayer);

    // Play click sound for the computer's move
    playClickO();
  }

  function getMediumMove(b) {
    // 1) Win now
    for (const idx of getAvailableMoves(b)) {
      const next = makeMove(b, idx, 'O');
      if (getWinner(next) === 'O') return idx;
    }

    // 2) Block human win
    for (const idx of getAvailableMoves(b)) {
      const next = makeMove(b, idx, 'X');
      if (getWinner(next) === 'X') return idx;
    }

    // 3) Heuristic: take center, then corners, then edges
    if (b[4] === null) return 4;
    const corners = [0, 2, 6, 8].filter((i) => b[i] === null);
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    const edges = [1, 3, 5, 7].filter((i) => b[i] === null);
    return edges[Math.floor(Math.random() * edges.length)];
  }

  function getHardMove(b) {
    // Minimax perfect play for Tic-Tac-Toe.
    // Depth is small enough for full search (9! state space is manageable).

    const result = minimax(b, true);
    return result.move;
  }

  function minimax(b, isMaximizing) {
    const winner = getWinner(b);
    if (winner === 'O') return { score: 10, move: null };
    if (winner === 'X') return { score: -10, move: null };
    if (isDraw(b)) return { score: 0, move: null };

    const available = getAvailableMoves(b);

    if (isMaximizing) {
      // Computer O turn
      let bestScore = -Infinity;
      let bestMove = available[0];

      for (const idx of available) {
        const next = makeMove(b, idx, 'O');
        const evalResult = minimax(next, false);
        if (evalResult.score > bestScore) {
          bestScore = evalResult.score;
          bestMove = idx;
        }
      }
      return { score: bestScore, move: bestMove };
    } else {
      // Human X turn
      let bestScore = Infinity;
      let bestMove = available[0];

      for (const idx of available) {
        const next = makeMove(b, idx, 'X');
        const evalResult = minimax(next, true);
        if (evalResult.score < bestScore) {
          bestScore = evalResult.score;
          bestMove = idx;
        }
      }
      return { score: bestScore, move: bestMove };
    }
  }


  // Wire up restart
  restartBtn.addEventListener('click', () => {
    resetGame();
  });

  // Init
  initBoardUI();
  resetGame();
})();

