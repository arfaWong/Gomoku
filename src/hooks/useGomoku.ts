import { useState, useCallback } from 'react';
import { 
  GameState, 
  Player, 
  Position, 
  Move, 
  WinLine, 
  CellState,
  BOARD_SIZE 
} from '@/types/gomoku';

const createEmptyBoard = (): CellState[][] => {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
};

const initialState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 'black',
  moves: [],
  winner: null,
  winLine: null,
  isGameOver: false,
};

const DIRECTIONS = [
  { dr: 0, dc: 1 },   // horizontal
  { dr: 1, dc: 0 },   // vertical
  { dr: 1, dc: 1 },   // diagonal down-right
  { dr: 1, dc: -1 },  // diagonal down-left
];

const checkWin = (
  board: CellState[][], 
  position: Position, 
  player: Player
): WinLine | null => {
  const { row, col } = position;

  for (const { dr, dc } of DIRECTIONS) {
    const positions: Position[] = [{ row, col }];
    
    // Check in positive direction
    let r = row + dr;
    let c = col + dc;
    while (
      r >= 0 && r < BOARD_SIZE && 
      c >= 0 && c < BOARD_SIZE && 
      board[r][c] === player
    ) {
      positions.push({ row: r, col: c });
      r += dr;
      c += dc;
    }
    
    // Check in negative direction
    r = row - dr;
    c = col - dc;
    while (
      r >= 0 && r < BOARD_SIZE && 
      c >= 0 && c < BOARD_SIZE && 
      board[r][c] === player
    ) {
      positions.unshift({ row: r, col: c });
      r -= dr;
      c -= dc;
    }
    
    if (positions.length >= 5) {
      // Sort positions to get start and end
      positions.sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        return a.col - b.col;
      });
      
      return {
        start: positions[0],
        end: positions[positions.length - 1],
        positions: positions.slice(0, 5),
      };
    }
  }
  
  return null;
};

export const useGomoku = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [shakingCell, setShakingCell] = useState<Position | null>(null);

  const placeStone = useCallback((position: Position) => {
    const { row, col } = position;
    
    if (gameState.isGameOver) return false;
    if (gameState.board[row][col] !== null) {
      setShakingCell(position);
      setTimeout(() => setShakingCell(null), 300);
      return false;
    }

    setGameState(prev => {
      const newBoard = prev.board.map(r => [...r]);
      newBoard[row][col] = prev.currentPlayer;

      const newMove: Move = {
        position,
        player: prev.currentPlayer,
        moveNumber: prev.moves.length + 1,
      };

      const winLine = checkWin(newBoard, position, prev.currentPlayer);
      const isGameOver = winLine !== null;

      return {
        board: newBoard,
        currentPlayer: isGameOver ? prev.currentPlayer : (prev.currentPlayer === 'black' ? 'white' : 'black'),
        moves: [...prev.moves, newMove],
        winner: isGameOver ? prev.currentPlayer : null,
        winLine,
        isGameOver,
      };
    });

    return true;
  }, [gameState.isGameOver, gameState.board]);

  const undoMove = useCallback(() => {
    if (gameState.moves.length === 0) return;

    setGameState(prev => {
      const newMoves = prev.moves.slice(0, -1);
      const lastMove = prev.moves[prev.moves.length - 1];
      
      const newBoard = prev.board.map(r => [...r]);
      newBoard[lastMove.position.row][lastMove.position.col] = null;

      return {
        board: newBoard,
        currentPlayer: lastMove.player,
        moves: newMoves,
        winner: null,
        winLine: null,
        isGameOver: false,
      };
    });
  }, [gameState.moves.length]);

  const resetGame = useCallback(() => {
    setGameState({
      ...initialState,
      board: createEmptyBoard(),
    });
  }, []);

  return {
    gameState,
    placeStone,
    undoMove,
    resetGame,
    shakingCell,
  };
};
