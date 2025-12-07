import { useState } from 'react';
import { History } from 'lucide-react';
import { useGomoku } from '@/hooks/useGomoku';
import { GameBoard } from './GameBoard';
import { TurnIndicator } from './TurnIndicator';
import { GameControls } from './GameControls';
import { MoveHistory } from './MoveHistory';
import { WinOverlay } from './WinOverlay';
import { Button } from '@/components/ui/button';

export const GomokuGame = () => {
  const { gameState, placeStone, undoMove, resetGame, shakingCell } = useGomoku();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [highlightedMove, setHighlightedMove] = useState<number | null>(null);
  const [showWinOverlay, setShowWinOverlay] = useState(true);

  const handleNewGame = () => {
    resetGame();
    setHighlightedMove(null);
    setShowWinOverlay(true);
  };

  const handleViewBoard = () => {
    setShowWinOverlay(false);
  };

  // Show win overlay when game ends
  if (gameState.isGameOver && !showWinOverlay) {
    // Keep overlay hidden if user chose to view board
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] paper-texture flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 lg:px-16">
        <div className="flex items-center gap-6">
          <h1 className="font-display text-3xl font-bold text-[#3A3632] tracking-tight">
            五子棋
          </h1>
          <span className="font-body text-sm text-[#3A3632]/50 hidden sm:block">
            Gomoku
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsHistoryOpen(true)}
          className="font-body text-sm text-[#3A3632]/70 hover:text-[#3A3632] hover:bg-[#3A3632]/5"
        >
          <History className="w-4 h-4 mr-2" />
          历史
          {gameState.moves.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-[#3A3632]/10 rounded">
              {gameState.moves.length}
            </span>
          )}
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Turn indicator - positioned above board */}
        <div className="mb-8">
          <TurnIndicator
            currentPlayer={gameState.currentPlayer}
            isGameOver={gameState.isGameOver}
            winner={gameState.winner}
          />
        </div>

        {/* Game board */}
        <div className="relative">
          <GameBoard
            gameState={gameState}
            shakingCell={shakingCell}
            highlightedMove={highlightedMove}
            onPlaceStone={placeStone}
          />
        </div>

        {/* Controls - positioned below board */}
        <div className="mt-12">
          <GameControls
            canUndo={gameState.moves.length > 0}
            onUndo={undoMove}
            onReset={handleNewGame}
            onNewGame={handleNewGame}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 lg:px-16">
        <p className="font-body text-xs text-[#3A3632]/30 text-center">
          连成五子即可获胜 • 黑方先行
        </p>
      </footer>

      {/* Move history panel */}
      <MoveHistory
        moves={gameState.moves}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        highlightedMove={highlightedMove}
        onHighlightMove={setHighlightedMove}
      />

      {/* Win overlay */}
      <WinOverlay
        winner={gameState.winner}
        isVisible={gameState.isGameOver && showWinOverlay}
        onNewGame={handleNewGame}
        onViewBoard={handleViewBoard}
      />
    </div>
  );
};
