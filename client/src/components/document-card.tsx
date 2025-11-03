import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

interface DocumentCardProps {
  title: string;
  category: string;
  uploadDate: string;
  fileSize: string;
  onDownload?: () => void;
  testId?: string;
}

export function DocumentCard({ title, category, uploadDate, fileSize, onDownload, testId }: DocumentCardProps) {
  return (
    <Card className="hover-elevate" data-testid={testId}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate" data-testid={`${testId}-title`}>{title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">{category}</Badge>
              <span className="text-xs text-muted-foreground">{fileSize}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Uploaded: {uploadDate}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              onDownload?.();
              console.log(`Downloading ${title}`);
            }}
            data-testid={`${testId}-download`}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
