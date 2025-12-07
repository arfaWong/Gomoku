export type Player = 'black' | 'white';
export type CellState = Player | null;

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  position: Position;
  player: Player;
  moveNumber: number;
}

export interface WinLine {
  start: Position;
  end: Position;
  positions: Position[];
}

export interface GameState {
  board: CellState[][];
  currentPlayer: Player;
  moves: Move[];
  winner: Player | null;
  winLine: WinLine | null;
  isGameOver: boolean;
}

export const BOARD_SIZE = 15;
