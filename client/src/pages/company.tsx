import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Trophy, TrendingUp } from "lucide-react";
import companyImage from "@assets/generated_images/Company_headquarters_building_d9e0f47c.png";
import teamImage from "@assets/generated_images/Team_collaboration_photo_d8f49115.png";

export default function Company() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Company Information</h1>
        <p className="text-muted-foreground">Learn about Rush Corporation</p>
      </div>

      <div className="relative h-96 rounded-lg overflow-hidden">
        <img
          src={companyImage}
          alt="Rush Corporation headquarters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-3xl font-bold mb-2">Rush Corporation</h2>
          <p className="text-lg text-muted-foreground">Building the future, together</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To deliver innovative solutions that empower businesses and create lasting value for our clients, employees, and stakeholders through excellence, integrity, and collaboration.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the global leader in our industry, recognized for pioneering innovation, sustainable practices, and commitment to creating positive impact in every community we serve.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative pl-8 border-l-4 border-l-primary py-2">
            <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
            <h4 className="font-semibold">2025 - Expansion & Growth</h4>
            <p className="text-sm text-muted-foreground mt-1">Opened new offices in three countries, expanding our global presence</p>
          </div>
          <div className="relative pl-8 border-l-4 border-l-muted py-2">
            <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-muted" />
            <h4 className="font-semibold">2020 - Digital Transformation</h4>
            <p className="text-sm text-muted-foreground mt-1">Launched innovative digital platform serving over 1 million users</p>
          </div>
          <div className="relative pl-8 border-l-4 border-l-muted py-2">
            <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-muted" />
            <h4 className="font-semibold">2015 - Foundation</h4>
            <p className="text-sm text-muted-foreground mt-1">Rush Corporation was founded with a vision to revolutionize the industry</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold mb-1">127</div>
            <p className="text-sm text-muted-foreground">Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold mb-1">15</div>
            <p className="text-sm text-muted-foreground">Awards Won</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold mb-1">6</div>
            <p className="text-sm text-muted-foreground">Global Offices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold mb-1">10</div>
            <p className="text-sm text-muted-foreground">Years in Business</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg overflow-hidden">
        <img
          src={teamImage}
          alt="Rush Corporation team"
          className="w-full h-64 object-cover"
        />
      </div>
    </div>
  );
}
