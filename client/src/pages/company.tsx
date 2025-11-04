import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  Trophy, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Target,
  Heart,
  Award,
  Briefcase,
  Star,
  ChevronRight,
  Download,
  Share2,
  Eye,
  Clock,
  DollarSign,
  BarChart3,
  Zap,
  Shield,
  Lightbulb,
  Handshake
} from "lucide-react";
import companyImage from "@assets/generated_images/Company_headquarters_building_d9e0f47c.png";
import teamImage from "@assets/generated_images/Team_collaboration_photo_d8f49115.png";
import { useNotifications } from "@/hooks/use-notifications";

export default function Company() {
  const [selectedOffice, setSelectedOffice] = useState("headquarters");
  const { showSuccess, showInfo } = useNotifications();

  const companyStats = {
    employees: 127,
    awards: 15,
    offices: 6,
    yearsInBusiness: 10,
    revenue: "$50M",
    clients: 500,
    projects: 1200,
    satisfaction: 98
  };

  const offices = [
    {
      id: "headquarters",
      name: "Headquarters",
      location: "New York, USA",
      address: "123 Business Ave, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@rushcorp.com",
      employees: 45,
      established: "2015"
    },
    {
      id: "west-coast",
      name: "West Coast Office",
      location: "San Francisco, USA",
      address: "456 Tech Street, San Francisco, CA 94105",
      phone: "+1 (555) 987-6543",
      email: "sf@rushcorp.com",
      employees: 32,
      established: "2018"
    },
    {
      id: "europe",
      name: "European Office",
      location: "London, UK",
      address: "789 Innovation Road, London, EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "london@rushcorp.com",
      employees: 28,
      established: "2020"
    },
    {
      id: "asia",
      name: "Asia Pacific Office",
      location: "Singapore",
      address: "321 Business Hub, Singapore 018989",
      phone: "+65 6123 4567",
      email: "singapore@rushcorp.com",
      employees: 22,
      established: "2022"
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "We embrace creativity and cutting-edge solutions to drive progress and exceed expectations."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices in all our interactions."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and foster an inclusive environment for all."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do, continuously improving our services."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Customer Focus",
      description: "We put our clients at the center of everything we do, ensuring their success is our priority."
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Sustainability",
      description: "We are committed to responsible business practices that benefit society and the environment."
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Global Expansion",
      description: "Opened new offices in three countries, expanding our global presence to serve clients worldwide",
      status: "current"
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Received 'Best Workplace' award and achieved ISO 27001 certification for information security",
      status: "completed"
    },
    {
      year: "2021",
      title: "Digital Innovation",
      description: "Launched AI-powered platform that revolutionized client service delivery and operational efficiency",
      status: "completed"
    },
    {
      year: "2020",
      title: "Remote-First Culture",
      description: "Successfully transitioned to hybrid work model, maintaining productivity and employee satisfaction",
      status: "completed"
    },
    {
      year: "2018",
      title: "Strategic Partnerships",
      description: "Formed key partnerships with industry leaders, expanding our service capabilities and market reach",
      status: "completed"
    },
    {
      year: "2015",
      title: "Foundation",
      description: "Rush Corporation was founded with a vision to revolutionize the industry through innovation",
      status: "completed"
    }
  ];

  const leadership = [
    {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      experience: "15+ years",
      education: "MBA, Harvard Business School",
      expertise: ["Strategic Leadership", "Digital Transformation", "Global Operations"]
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      experience: "12+ years",
      education: "MS Computer Science, MIT",
      expertise: ["AI/ML", "Cloud Architecture", "Product Innovation"]
    },
    {
      name: "Emily Rodriguez",
      position: "Chief Financial Officer",
      experience: "10+ years",
      education: "CPA, Wharton School",
      expertise: ["Financial Strategy", "Risk Management", "Corporate Finance"]
    },
    {
      name: "David Kim",
      position: "Chief People Officer",
      experience: "8+ years",
      education: "MS Organizational Psychology",
      expertise: ["Talent Development", "Culture Building", "Employee Engagement"]
    }
  ];

  const downloadCompanyProfile = () => {
    showSuccess("Download Started", "Company profile PDF is being downloaded");
  };

  const shareCompanyInfo = () => {
    showInfo("Share Link Copied", "Company information link has been copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Rush Corporation</h1>
          <p className="text-muted-foreground">Comprehensive company information and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={shareCompanyInfo}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={downloadCompanyProfile}>
            <Download className="h-4 w-4 mr-2" />
            Company Profile
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img
          src={companyImage}
          alt="Rush Corporation headquarters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Rush Corporation</h2>
              <p className="text-lg text-muted-foreground mb-4">Building the future, together</p>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Calendar className="h-3 w-3 mr-1" />
                  Founded 2015
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <MapPin className="h-3 w-3 mr-1" />
                  Global Presence
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Users className="h-3 w-3 mr-1" />
                  127+ Employees
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-3xl font-bold mb-1">{companyStats.employees}</div>
            <p className="text-sm text-muted-foreground">Employees</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-3xl font-bold mb-1">{companyStats.revenue}</div>
            <p className="text-sm text-muted-foreground">Annual Revenue</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Briefcase className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-3xl font-bold mb-1">{companyStats.projects}</div>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-3xl font-bold mb-1">{companyStats.awards}</div>
            <p className="text-sm text-muted-foreground">Industry Awards</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="offices">Offices</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver innovative solutions that empower businesses and create lasting value for our clients, employees, and stakeholders through excellence, integrity, and collaboration. We strive to be the catalyst for positive change in every industry we serve.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in our industry, recognized for pioneering innovation, sustainable practices, and commitment to creating positive impact in every community we serve. We envision a future where technology and humanity work in perfect harmony.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
              <CardDescription>
                A comprehensive look at Rush Corporation's impact and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{companyStats.clients}+</div>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                  <Progress value={85} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">{companyStats.offices}</div>
                  <p className="text-sm text-muted-foreground">Global Offices</p>
                  <Progress value={60} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{companyStats.satisfaction}%</div>
                  <p className="text-sm text-muted-foreground">Employee Satisfaction</p>
                  <Progress value={98} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg overflow-hidden">
            <img
              src={teamImage}
              alt="Rush Corporation team"
              className="w-full h-64 object-cover"
            />
            <div className="bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Our diverse team of professionals working together to achieve excellence
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Timeline</CardTitle>
              <CardDescription>
                Key milestones in Rush Corporation's journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative pl-8 border-l-4 border-l-primary py-4">
                  <div className={`absolute left-0 top-4 -translate-x-1/2 w-4 h-4 rounded-full ${
                    milestone.status === 'current' ? 'bg-primary animate-pulse' : 'bg-muted'
                  }`} />
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{milestone.year} - {milestone.title}</h4>
                    {milestone.status === 'current' && (
                      <Badge variant="default" className="animate-pulse">Current</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Core Values</CardTitle>
              <CardDescription>
                The principles that guide everything we do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leadership" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Executive Leadership</CardTitle>
              <CardDescription>
                Meet the visionary leaders driving Rush Corporation forward
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leadership.map((leader, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{leader.name}</h3>
                        <p className="text-primary font-medium">{leader.position}</p>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <p><strong>Experience:</strong> {leader.experience}</p>
                          <p><strong>Education:</strong> {leader.education}</p>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Expertise:</p>
                          <div className="flex flex-wrap gap-1">
                            {leader.expertise.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Global Offices</CardTitle>
                <CardDescription>
                  Select an office to view details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {offices.map((office) => (
                  <Button
                    key={office.id}
                    variant={selectedOffice === office.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedOffice(office.id)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {office.name}
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {offices.find(o => o.id === selectedOffice)?.name}
                </CardTitle>
                <CardDescription>
                  {offices.find(o => o.id === selectedOffice)?.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {offices.filter(o => o.id === selectedOffice).map((office) => (
                  <div key={office.id} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{office.email}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{office.employees} Employees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Established {office.established}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        This office serves as a key hub for our operations in the region, 
                        providing exceptional service to our clients and fostering innovation 
                        through our talented team of professionals.
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="careers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Join Our Team</CardTitle>
              <CardDescription>
                Discover exciting career opportunities at Rush Corporation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold mb-2">Innovation Culture</h3>
                  <p className="text-sm text-muted-foreground">
                    Work with cutting-edge technology and contribute to groundbreaking solutions
                  </p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold mb-2">Collaborative Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Join a diverse team of talented professionals who support each other's growth
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold mb-2">Career Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Advance your career with comprehensive training and development programs
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Ready to Make an Impact?</h3>
                <p className="text-muted-foreground mb-4">
                  Explore our current openings and take the next step in your career journey
                </p>
                <Button size="lg">
                  View Open Positions
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
