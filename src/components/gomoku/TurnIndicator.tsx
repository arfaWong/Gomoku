import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types/gomoku';
import { Stone } from './Stone';

interface TurnIndicatorProps {
  currentPlayer: Player;
  isGameOver: boolean;
  winner: Player | null;
}

export const TurnIndicator = ({ 
  currentPlayer, 
  isGameOver, 
  winner 
}: TurnIndicatorProps) => {
  return (
    <div className="flex items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isGameOver ? 'winner' : currentPlayer}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <Stone 
            player={isGameOver && winner ? winner : currentPlayer} 
            size={28} 
          />
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold text-[#3A3632] tracking-tight">
              {isGameOver && winner ? (
                winner === 'black' ? '黑方胜' : '白方胜'
              ) : (
                currentPlayer === 'black' ? '黑' : '白'
              )}
            </span>
            <span className="font-body text-sm text-[#3A3632]/60">
              {isGameOver ? '胜者' : '当前回合'}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
