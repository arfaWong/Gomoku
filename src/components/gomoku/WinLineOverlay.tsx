import { WinLine } from '@/types/gomoku';

interface WinLineOverlayProps {
  winLine: WinLine;
  cellSize: number;
  boardPadding: number;
  totalSize: number;
}

export const WinLineOverlay = ({
  winLine,
  cellSize,
  boardPadding,
  totalSize,
}: WinLineOverlayProps) => {
  const { start, end } = winLine;
  
  const x1 = boardPadding + start.col * cellSize;
  const y1 = boardPadding + start.row * cellSize;
  const x2 = boardPadding + end.col * cellSize;
  const y2 = boardPadding + end.row * cellSize;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={totalSize}
      height={totalSize}
      style={{ zIndex: 10 }}
    >
      {/* Glow effect */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#C1665A"
        strokeWidth={6}
        strokeLinecap="round"
        filter="url(#glow)"
        className="animate-win-line"
      />
    </svg>
  );
};
