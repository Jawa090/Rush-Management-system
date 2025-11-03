import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Edit, Trash2 } from "lucide-react";

interface EmployeeCardProps {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photoUrl?: string;
  joiningDate: string;
  onEdit?: () => void;
  onDelete?: () => void;
  testId?: string;
}

export function EmployeeCard({
  name,
  role,
  department,
  email,
  phone,
  photoUrl,
  joiningDate,
  onEdit,
  onDelete,
  testId
}: EmployeeCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <Card className="hover-elevate" data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={photoUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold truncate" data-testid={`${testId}-name`}>{name}</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
              <Badge variant="secondary" className="shrink-0">{department}</Badge>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{phone}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Joined: {joiningDate}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              onEdit?.();
              console.log(`Edit ${name}`);
            }}
            data-testid={`${testId}-edit`}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              onDelete?.();
              console.log(`Delete ${name}`);
            }}
            data-testid={`${testId}-delete`}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
