import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Bookmark } from "lucide-react";
import { useState } from "react";

interface DuaCardProps {
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  hasAudio?: boolean;
  testId?: string;
}

export function DuaCard({ title, arabic, transliteration, translation, hasAudio = false, testId }: DuaCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card data-testid={testId}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex gap-2">
            {hasAudio && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log(`Playing audio for ${title}`)}
                data-testid={`${testId}-play`}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setBookmarked(!bookmarked);
                console.log(`${title} ${bookmarked ? 'unbookmarked' : 'bookmarked'}`);
              }}
              data-testid={`${testId}-bookmark`}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-right">
          <p className="text-2xl font-amiri leading-loose" dir="rtl">{arabic}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Transliteration:</p>
          <p className="text-sm italic">{transliteration}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Translation:</p>
          <p className="text-sm">{translation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
