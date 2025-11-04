import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Volume2, Bookmark, Copy, Share2, Info, Heart } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";

interface DuaCardProps {
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  hasAudio?: boolean;
  source?: string;
  benefits?: string;
  tags?: string[];
  testId?: string;
}

export function DuaCard({ 
  title, 
  arabic, 
  transliteration, 
  translation, 
  category,
  hasAudio = false, 
  source,
  benefits,
  tags = [],
  testId 
}: DuaCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleCopy = async () => {
    const duaText = `${title}\n\n${arabic}\n\n${transliteration}\n\n${translation}`;
    try {
      await navigator.clipboard.writeText(duaText);
      showSuccess("Copied!", "Dua copied to clipboard");
    } catch (error) {
      showError("Failed to copy", "Could not copy dua to clipboard");
    }
  };

  const handleShare = async () => {
    const duaText = `${title}\n\n${arabic}\n\n${transliteration}\n\n${translation}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: duaText,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const playAudio = () => {
    // Simulate audio playing
    showSuccess("Playing Audio", `Playing recitation for ${title}`);
    // In a real app, you would play actual audio here
  };

  return (
    <Card data-testid={testId} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            {hasAudio && (
              <Button
                variant="ghost"
                size="icon"
                onClick={playAudio}
                data-testid={`${testId}-play`}
                className="h-8 w-8"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-8 w-8"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setBookmarked(!bookmarked);
                showSuccess(
                  bookmarked ? "Removed from favorites" : "Added to favorites",
                  `${title} ${bookmarked ? 'removed from' : 'added to'} your favorites`
                );
              }}
              data-testid={`${testId}-bookmark`}
              className="h-8 w-8"
            >
              <Heart className={`h-4 w-4 ${bookmarked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-right bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 p-4 rounded-lg border">
          <p className="text-2xl font-amiri leading-loose text-green-800 dark:text-green-200" dir="rtl">
            {arabic}
          </p>
        </div>
        
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-sm font-medium text-muted-foreground mb-1">Transliteration:</p>
          <p className="text-sm italic text-blue-700 dark:text-blue-300">{transliteration}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Translation:</p>
          <p className="text-sm leading-relaxed">{translation}</p>
        </div>

        {(source || benefits) && (
          <>
            <Separator />
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs"
              >
                <Info className="h-3 w-3 mr-1" />
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
              {source && (
                <Badge variant="outline" className="text-xs">
                  Source: {source}
                </Badge>
              )}
            </div>
            
            {showDetails && benefits && (
              <div className="bg-yellow-50 dark:bg-yellow-950/50 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Benefits:</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{benefits}</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
