import { useMemo } from 'react';
import { GameState, Position, BOARD_SIZE } from '@/types/gomoku';
import { BoardCell } from './BoardCell';
import { WinLineOverlay } from './WinLineOverlay';

interface GameBoardProps {
  gameState: GameState;
  shakingCell: Position | null;
  highlightedMove: number | null;
  onPlaceStone: (position: Position) => void;
}

export const GameBoard = ({
  gameState,
  shakingCell,
  highlightedMove,
  onPlaceStone,
}: GameBoardProps) => {
  const cellSize = 40;
  const boardPadding = cellSize;
  const gridSize = (BOARD_SIZE - 1) * cellSize;
  const totalSize = gridSize + boardPadding * 2;

  const lastMovePosition = useMemo(() => {
    if (gameState.moves.length === 0) return null;
    return gameState.moves[gameState.moves.length - 1].position;
  }, [gameState.moves]);

  const highlightedPosition = useMemo(() => {
    if (highlightedMove === null) return null;
    const move = gameState.moves.find(m => m.moveNumber === highlightedMove);
    return move?.position || null;
  }, [highlightedMove, gameState.moves]);

  const winningPositions = useMemo(() => {
    if (!gameState.winLine) return new Set<string>();
    return new Set(
      gameState.winLine.positions.map(p => `${p.row}-${p.col}`)
    );
  }, [gameState.winLine]);

  // Star points (traditional Gomoku board markers)
  const starPoints = [
    { row: 3, col: 3 },
    { row: 3, col: 11 },
    { row: 7, col: 7 },
    { row: 11, col: 3 },
    { row: 11, col: 11 },
  ];

  return (
    <div 
      className="relative paper-texture rounded-sm"
      style={{ 
        width: totalSize, 
        height: totalSize,
        backgroundColor: '#F5F1E8',
      }}
    >
      {/* Grid lines */}
      <svg
        className="absolute inset-0"
        width={totalSize}
        height={totalSize}
        style={{ zIndex: 0 }}
      >
        {/* Horizontal lines */}
        {Array.from({ length: BOARD_SIZE }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={boardPadding}
            y1={boardPadding + i * cellSize}
            x2={boardPadding + gridSize}
            y2={boardPadding + i * cellSize}
            stroke="#3A3632"
            strokeWidth={i === 0 || i === BOARD_SIZE - 1 ? 1.5 : 1}
            strokeOpacity={0.7}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: BOARD_SIZE }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={boardPadding + i * cellSize}
            y1={boardPadding}
            x2={boardPadding + i * cellSize}
            y2={boardPadding + gridSize}
            stroke="#3A3632"
            strokeWidth={i === 0 || i === BOARD_SIZE - 1 ? 1.5 : 1}
            strokeOpacity={0.7}
          />
        ))}
        {/* Star points */}
        {starPoints.map((point, i) => (
          <circle
            key={`star-${i}`}
            cx={boardPadding + point.col * cellSize}
            cy={boardPadding + point.row * cellSize}
            r={4}
            fill="#3A3632"
            fillOpacity={0.6}
          />
        ))}
      </svg>

      {/* Win line overlay */}
      {gameState.winLine && (
        <WinLineOverlay
          winLine={gameState.winLine}
          cellSize={cellSize}
          boardPadding={boardPadding}
          totalSize={totalSize}
        />
      )}

      {/* Cells - rendered directly on board */}
      {Array.from({ length: BOARD_SIZE }).map((_, row) =>
        Array.from({ length: BOARD_SIZE }).map((_, col) => (
          <BoardCell
            key={`${row}-${col}`}
            row={row}
            col={col}
            cellState={gameState.board[row][col]}
            currentPlayer={gameState.currentPlayer}
            isGameOver={gameState.isGameOver}
            isShaking={shakingCell?.row === row && shakingCell?.col === col}
            isWinning={winningPositions.has(`${row}-${col}`)}
            isHighlighted={highlightedPosition?.row === row && highlightedPosition?.col === col}
            isLastMove={lastMovePosition?.row === row && lastMovePosition?.col === col}
            cellSize={cellSize}
            boardPadding={boardPadding}
            onPlace={onPlaceStone}
          />
        ))
      )}

      {/* Coordinate labels */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        {/* Column labels (A-O) */}
        {Array.from({ length: BOARD_SIZE }).map((_, i) => (
          <span
            key={`col-${i}`}
            className="absolute font-mono text-xs text-[#3A3632]/50"
            style={{
              left: boardPadding + i * cellSize,
              bottom: 4,
              transform: 'translateX(-50%)',
            }}
          >
            {String.fromCharCode(65 + i)}
          </span>
        ))}
        {/* Row labels (1-15) */}
        {Array.from({ length: BOARD_SIZE }).map((_, i) => (
          <span
            key={`row-${i}`}
            className="absolute font-mono text-xs text-[#3A3632]/50"
            style={{
              top: boardPadding + i * cellSize,
              left: 4,
              transform: 'translateY(-50%)',
            }}
          >
            {BOARD_SIZE - i}
          </span>
        ))}
      </div>
    </div>
  );
};
