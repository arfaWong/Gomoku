import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types/gomoku';
import { Stone } from './Stone';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye } from 'lucide-react';

interface WinOverlayProps {
  winner: Player | null;
  isVisible: boolean;
  onNewGame: () => void;
  onViewBoard: () => void;
}

export const WinOverlay = ({
  winner,
  isVisible,
  onNewGame,
  onViewBoard,
}: WinOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#F5F1E8]/90 backdrop-blur-md"
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 20, 
              stiffness: 200,
              delay: 1 
            }}
            className="relative z-10 flex flex-col items-center text-center px-8"
          >
            {/* Winner stone */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring', 
                damping: 15, 
                stiffness: 300,
                delay: 1.2 
              }}
            >
              <Stone player={winner} size={80} />
            </motion.div>

            {/* Winner text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="font-display text-5xl font-bold text-[#3A3632] mt-8 tracking-tight"
            >
              {winner === 'black' ? '黑方胜' : '白方胜'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="font-body text-lg text-[#3A3632]/60 mt-2"
            >
              五子连珠，恭喜获胜！
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex items-center gap-4 mt-10"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={onViewBoard}
                className="font-body text-[#3A3632]/70 hover:text-[#3A3632] border-[#3A3632]/20 hover:bg-[#3A3632]/5"
              >
                <Eye className="w-4 h-4 mr-2" />
                查看棋盘
              </Button>
              <Button
                size="lg"
                onClick={onNewGame}
                className="font-body bg-[#C1665A] hover:bg-[#A85548] text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                新游戏
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
