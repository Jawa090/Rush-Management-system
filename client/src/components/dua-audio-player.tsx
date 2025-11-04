import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  Download
} from 'lucide-react';

interface DuaAudioPlayerProps {
  title: string;
  arabic: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

export function DuaAudioPlayer({ 
  title, 
  arabic, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious,
  className = ""
}: DuaAudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      setDuration(120); // 2 minutes simulation
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 120) {
            if (isRepeat) {
              return 0;
            } else {
              onPlayPause(); // Stop playing
              return 120;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isRepeat, onPlayPause]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Track Info */}
          <div className="text-center space-y-2">
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground font-arabic" dir="rtl">
              {arabic.length > 50 ? `${arabic.substring(0, 50)}...` : arabic}
            </p>
            <Badge variant="secondary" className="text-xs">
              Recitation
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsRepeat(!isRepeat)}
              className={`h-8 w-8 ${isRepeat ? 'text-primary' : ''}`}
            >
              <Repeat className="h-4 w-4" />
            </Button>

            {onPrevious && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="h-8 w-8"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="default"
              size="icon"
              onClick={onPlayPause}
              disabled={isLoading}
              className="h-10 w-10"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            {onNext && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="h-8 w-8"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {}}
              className="h-8 w-8"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-6 w-6"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-3 w-3" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8">
              {isMuted ? 0 : volume}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}