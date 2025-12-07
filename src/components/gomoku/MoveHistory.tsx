import { motion, AnimatePresence } from 'framer-motion';
import { X, History } from 'lucide-react';
import { Move, BOARD_SIZE } from '@/types/gomoku';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MoveHistoryProps {
  moves: Move[];
  isOpen: boolean;
  onClose: () => void;
  highlightedMove: number | null;
  onHighlightMove: (moveNumber: number | null) => void;
}

const formatPosition = (row: number, col: number): string => {
  const colLetter = String.fromCharCode(65 + col);
  const rowNumber = BOARD_SIZE - row;
  return `${colLetter}${rowNumber}`;
};

export const MoveHistory = ({
  moves,
  isOpen,
  onClose,
  highlightedMove,
  onHighlightMove,
}: MoveHistoryProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#3A3632]/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-[#F5F1E8]/95 backdrop-blur-md border-l border-[#3A3632]/10 shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#3A3632]/10">
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5 text-[#3A3632]/60" />
                  <h2 className="font-display text-xl font-semibold text-[#3A3632]">
                    棋步历史
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-[#3A3632]/60 hover:text-[#3A3632] hover:bg-[#3A3632]/5"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Move list */}
              <ScrollArea className="flex-1 p-4">
                {moves.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-[#3A3632]/40">
                    <p className="font-body text-sm">暂无棋步</p>
                    <p className="font-body text-xs mt-1">黑方先行</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {moves.map((move) => (
                      <motion.button
                        key={move.moveNumber}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: move.moveNumber * 0.02 }}
                        onClick={() => onHighlightMove(
                          highlightedMove === move.moveNumber ? null : move.moveNumber
                        )}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                          'hover:bg-[#3A3632]/5',
                          highlightedMove === move.moveNumber && 'bg-[#C1665A]/10 ring-1 ring-[#C1665A]/30'
                        )}
                      >
                        <span className="font-mono text-xs text-[#3A3632]/40 w-6 text-right">
                          {move.moveNumber}.
                        </span>
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{
                            background: move.player === 'black'
                              ? 'radial-gradient(circle at 30% 30%, #3A3632, #1C1917)'
                              : 'radial-gradient(circle at 30% 30%, #FFFFFF, #FAFAF9)',
                            boxShadow: move.player === 'black'
                              ? '0 1px 3px rgba(0,0,0,0.2)'
                              : '0 1px 3px rgba(0,0,0,0.1)',
                          }}
                        />
                        <span className="font-mono text-sm text-[#3A3632]">
                          {formatPosition(move.position.row, move.position.col)}
                        </span>
                        <span className="font-body text-xs text-[#3A3632]/40 ml-auto">
                          {move.player === 'black' ? '黑' : '白'}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t border-[#3A3632]/10">
                <p className="font-body text-xs text-[#3A3632]/40 text-center">
                  点击棋步可在棋盘上高亮显示
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
