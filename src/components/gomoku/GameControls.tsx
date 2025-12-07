import { RotateCcw, Undo2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface GameControlsProps {
  canUndo: boolean;
  onUndo: () => void;
  onReset: () => void;
  onNewGame: () => void;
}

export const GameControls = ({
  canUndo,
  onUndo,
  onReset,
  onNewGame,
}: GameControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onUndo}
        disabled={!canUndo}
        className="font-body text-sm text-[#3A3632]/70 hover:text-[#3A3632] hover:bg-[#3A3632]/5 disabled:opacity-40"
      >
        <Undo2 className="w-4 h-4 mr-2" />
        悔棋
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            disabled={!canUndo}
            className="font-body text-sm text-[#3A3632]/70 hover:text-[#3A3632] hover:bg-[#3A3632]/5 disabled:opacity-40"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重置
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#F5F1E8] border-[#3A3632]/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl text-[#3A3632]">
              重置游戏？
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#3A3632]/70">
              这将清空棋盘并开始新游戏。所有棋步将丢失。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-body text-[#3A3632]/70 hover:text-[#3A3632] hover:bg-[#3A3632]/5 border-[#3A3632]/20">
              取消
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onReset}
              className="font-body bg-[#C1665A] hover:bg-[#A85548] text-white"
            >
              重置
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNewGame}
        className="font-body text-sm text-[#C1665A] hover:text-[#A85548] hover:bg-[#C1665A]/5"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        新游戏
      </Button>
    </div>
  );
};
