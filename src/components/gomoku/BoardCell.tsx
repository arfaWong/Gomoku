import { useState } from 'react';
import { CellState, Player, Position } from '@/types/gomoku';
import { Stone } from './Stone';
import { GhostStone } from './GhostStone';
import { cn } from '@/lib/utils';

interface BoardCellProps {
  row: number;
  col: number;
  cellState: CellState;
  currentPlayer: Player;
  isGameOver: boolean;
  isShaking: boolean;
  isWinning: boolean;
  isHighlighted: boolean;
  isLastMove: boolean;
  cellSize: number;
  boardPadding: number;
  onPlace: (position: Position) => void;
}

export const BoardCell = ({
  row,
  col,
  cellState,
  currentPlayer,
  isGameOver,
  isShaking,
  isWinning,
  isHighlighted,
  isLastMove,
  cellSize,
  boardPadding,
  onPlace,
}: BoardCellProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const stoneSize = cellSize * 0.85;
  const isEmpty = cellState === null;
  const canPlace = isEmpty && !isGameOver;

  // Position centered on the grid intersection
  const left = boardPadding + col * cellSize - cellSize / 2;
  const top = boardPadding + row * cellSize - cellSize / 2;

  return (
    <div
      className={cn(
        'absolute flex items-center justify-center cursor-pointer transition-transform',
        isShaking && 'animate-shake',
        canPlace && 'hover:scale-105'
      )}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 2,
      }}
      onMouseEnter={() => canPlace && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlace({ row, col })}
    >
      {cellState && (
        <Stone 
          player={cellState} 
          isNew={isLastMove}
          isHighlighted={isHighlighted}
          isWinning={isWinning}
          size={stoneSize}
        />
      )}
      {isEmpty && isHovered && !isGameOver && (
        <GhostStone 
          player={currentPlayer} 
          size={stoneSize}
        />
      )}
    </div>
  );
};
