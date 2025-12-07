import { motion } from 'framer-motion';
import { Player } from '@/types/gomoku';
import { cn } from '@/lib/utils';

interface StoneProps {
  player: Player;
  isNew?: boolean;
  isHighlighted?: boolean;
  isWinning?: boolean;
  size?: number;
}

export const Stone = ({ 
  player, 
  isNew = false, 
  isHighlighted = false,
  isWinning = false,
  size = 32 
}: StoneProps) => {
  const isBlack = player === 'black';
  
  return (
    <motion.div
      initial={isNew ? { scale: 0.7, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 15,
        duration: 0.4 
      }}
      className={cn(
        'rounded-full relative',
        isWinning && 'animate-pulse-glow',
        isHighlighted && 'ring-2 ring-[#C1665A] ring-offset-2 ring-offset-[#F5F1E8]'
      )}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        background: isBlack 
          ? 'radial-gradient(circle at 30% 30%, #3A3632, #1C1917)'
          : 'radial-gradient(circle at 30% 30%, #FFFFFF, #FAFAF9)',
        boxShadow: isBlack
          ? '0 2px 8px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.1)'
          : '0 2px 8px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Highlight shine effect */}
      <div 
        className="absolute rounded-full opacity-60"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          top: size * 0.15,
          left: size * 0.2,
          background: isBlack 
            ? 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)'
            : 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)',
        }}
      />
    </motion.div>
  );
};
