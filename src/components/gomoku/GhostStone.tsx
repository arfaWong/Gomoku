import { motion } from 'framer-motion';
import { Player } from '@/types/gomoku';

interface GhostStoneProps {
  player: Player;
  size?: number;
}

export const GhostStone = ({ player, size = 32 }: GhostStoneProps) => {
  const isBlack = player === 'black';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 0.35, 
        scale: [0.95, 1.02, 0.95],
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        opacity: { duration: 0.15 },
        scale: { 
          duration: 2, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }
      }}
      className="rounded-full pointer-events-none"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        background: isBlack 
          ? 'radial-gradient(circle at 30% 30%, #3A3632, #1C1917)'
          : 'radial-gradient(circle at 30% 30%, #FFFFFF, #FAFAF9)',
        boxShadow: isBlack
          ? '0 2px 6px rgba(0,0,0,0.15)'
          : '0 2px 6px rgba(0,0,0,0.08)',
      }}
    />
  );
};
