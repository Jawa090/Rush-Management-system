import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  RefreshCw, 
  Volume2,
  Heart,
  X
} from 'lucide-react';
import { duasData } from '@/data/duas';
import { useDuaFavorites } from '@/hooks/use-dua-favorites';

interface DailyDuaPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DailyDuaPopup({ open, onOpenChange }: DailyDuaPopupProps) {
  const [currentDua, setCurrentDua] = useState(duasData[0]);
  const [showFullDua, setShowFullDua] = useState(false);
  const { toggleFavorite, isFavorite } = useDuaFavorites();

  // Get daily dua based on current date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const duaIndex = dayOfYear % duasData.length;
    setCurrentDua(duasData[duaIndex]);
  }, []);

  const getNextDua = () => {
    const currentIndex = duasData.findIndex(dua => dua.id === currentDua.id);
    const nextIndex = (currentIndex + 1) % duasData.length;
    setCurrentDua(duasData[nextIndex]);
  };

  const handleFavoriteToggle = () => {
    toggleFavorite({
      id: currentDua.id,
      title: currentDua.title,
      arabic: currentDua.arabic,
      transliteration: currentDua.transliteration,
      translation: currentDua.translation,
      category: currentDua.category
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <DialogTitle>Daily Dua</DialogTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </Badge>
          </div>
          <DialogDescription>
            Your spiritual companion for daily remembrance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Current Dua */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{currentDua.title}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {currentDua.category}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavoriteToggle}
                className="h-8 w-8"
              >
                <Heart className={`h-4 w-4 ${isFavorite(currentDua.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 p-6 rounded-lg border">
            <p className="text-2xl font-amiri leading-relaxed text-green-800 dark:text-green-200 text-right" dir="rtl">
              {showFullDua ? currentDua.arabic : 
                currentDua.arabic.length > 100 ? 
                  `${currentDua.arabic.substring(0, 100)}...` : 
                  currentDua.arabic
              }
            </p>
            {currentDua.arabic.length > 100 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullDua(!showFullDua)}
                className="mt-2 text-xs"
              >
                {showFullDua ? 'Show Less' : 'Show Full Dua'}
              </Button>
            )}
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm font-medium text-muted-foreground mb-2">Transliteration:</p>
            <p className="text-sm italic text-blue-700 dark:text-blue-300">{currentDua.transliteration}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Translation:</p>
            <p className="text-sm leading-relaxed">{currentDua.translation}</p>
          </div>

          {currentDua.benefits && (
            <div className="bg-yellow-50 dark:bg-yellow-950/50 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">Benefits:</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">{currentDua.benefits}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={getNextDua} variant="outline" className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Next Dua
            </Button>
            {currentDua.hasAudio && (
              <Button variant="outline" className="flex-1">
                <Volume2 className="h-4 w-4 mr-2" />
                Play Audio
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">{duasData.length}</div>
                <div className="text-xs text-muted-foreground">Total Duas</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {duasData.filter(d => d.hasAudio).length}
                </div>
                <div className="text-xs text-muted-foreground">With Audio</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {new Set(duasData.map(d => d.category)).size}
                </div>
                <div className="text-xs text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
