import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Search, 
  Shield, 
  FileText, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Share2,
  BookOpen,
  Scale,
  Heart,
  Lock,
  Globe,
  Briefcase,
  Home,
  Smartphone,
  Calendar,
  Star
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface Policy {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  lastUpdated: string;
  version: string;
  mandatory: boolean;
  readTime: string;
  icon: React.ReactNode;
  priority: "high" | "medium" | "low";
  acknowledgmentRequired: boolean;
  relatedPolicies: string[];
}

export default function Policies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [acknowledgedPolicies, setAcknowledgedPolicies] = useState<string[]>([]);
  
  const { showSuccess, showInfo, showWarning } = useNotifications();

  const policies: Policy[] = [
    {
      id: "leave-policy",
      title: "Leave Policy",
      summary: "Comprehensive guidelines for requesting and managing various types of leave including annual, sick, maternity, and emergency leave.",
      content: `
        <h3>Annual Leave</h3>
        <p>All full-time employees are entitled to 25 days of annual leave per calendar year. Part-time employees receive pro-rated leave based on their working hours.</p>
        
        <h3>Sick Leave</h3>
        <p>Employees may take up to 10 days of sick leave per year. Medical certificates are required for absences exceeding 3 consecutive days.</p>
        
        <h3>Maternity/Paternity Leave</h3>
        <p>New parents are entitled to 12 weeks of paid leave. Additional unpaid leave may be available upon request.</p>
        
        <h3>Application Process</h3>
        <p>All leave requests must be submitted through the employee portal at least 2 weeks in advance for approval, except in cases of emergency.</p>
        
        <h3>Carry Forward</h3>
        <p>Up to 5 days of unused annual leave may be carried forward to the following year, subject to manager approval.</p>
      `,
      category: "HR",
      lastUpdated: "2024-12-01",
      version: "3.2",
      mandatory: true,
      readTime: "5 min",
      icon: <Calendar className="h-5 w-5" />,
      priority: "high",
      acknowledgmentRequired: true,
      relatedPolicies: ["attendance-policy", "remote-work"]
    },
    {
      id: "code-of-conduct",
      title: "Code of Conduct",
      summary: "Expected standards of behavior, professional ethics, and conduct for all employees in the workplace.",
      content: `
        <h3>Professional Behavior</h3>
        <p>All employees must maintain the highest standards of professional conduct, treating colleagues, clients, and stakeholders with respect and dignity.</p>
        
        <h3>Integrity and Honesty</h3>
        <p>Employees must act with integrity in all business dealings, avoiding conflicts of interest and maintaining confidentiality of sensitive information.</p>
        
        <h3>Respect and Inclusion</h3>
        <p>We foster an inclusive environment where diversity is valued and all individuals are treated fairly regardless of background, beliefs, or personal characteristics.</p>
        
        <h3>Compliance</h3>
        <p>All employees must comply with applicable laws, regulations, and company policies. Violations may result in disciplinary action.</p>
        
        <h3>Reporting Concerns</h3>
        <p>Employees are encouraged to report any violations or concerns through appropriate channels without fear of retaliation.</p>
      `,
      category: "Ethics",
      lastUpdated: "2024-11-15",
      version: "4.1",
      mandatory: true,
      readTime: "7 min",
      icon: <Scale className="h-5 w-5" />,
      priority: "high",
      acknowledgmentRequired: true,
      relatedPolicies: ["harassment-policy", "security-policy"]
    },
    {
      id: "remote-work",
      title: "Remote Work Policy",
      summary: "Guidelines, requirements, and best practices for remote work arrangements and hybrid working models.",
      content: `
        <h3>Eligibility</h3>
        <p>Employees may work remotely up to 3 days per week with manager approval. Certain roles may qualify for full remote work arrangements.</p>
        
        <h3>Equipment and Setup</h3>
        <p>The company provides necessary equipment for remote work. Employees must maintain a professional workspace and reliable internet connection.</p>
        
        <h3>Communication Requirements</h3>
        <p>Remote workers must maintain regular communication with their team, attend scheduled meetings, and be available during core business hours.</p>
        
        <h3>Security Measures</h3>
        <p>All remote work must comply with information security policies. Use of VPN is mandatory when accessing company systems.</p>
        
        <h3>Performance Standards</h3>
        <p>Remote workers are held to the same performance standards as office-based employees and must meet all deliverables and deadlines.</p>
      `,
      category: "Operations",
      lastUpdated: "2024-10-20",
      version: "2.5",
      mandatory: false,
      readTime: "6 min",
      icon: <Home className="h-5 w-5" />,
      priority: "medium",
      acknowledgmentRequired: false,
      relatedPolicies: ["security-policy", "attendance-policy"]
    },
    {
      id: "security-policy",
      title: "Information Security Policy",
      summary: "Comprehensive guidelines for protecting company data, information systems, and maintaining cybersecurity standards.",
      content: `
        <h3>Password Requirements</h3>
        <p>All employees must use strong, unique passwords and enable two-factor authentication on all company accounts.</p>
        
        <h3>Data Protection</h3>
        <p>Sensitive company data must be encrypted, stored securely, and only accessed by authorized personnel. Data sharing requires approval.</p>
        
        <h3>Device Security</h3>
        <p>Company devices must be secured with screen locks, automatic updates enabled, and antivirus software installed and updated.</p>
        
        <h3>Network Security</h3>
        <p>Employees must only access company systems through secure networks. Public Wi-Fi should not be used for sensitive work.</p>
        
        <h3>Incident Reporting</h3>
        <p>Any suspected security incidents must be reported immediately to the IT security team for investigation and remediation.</p>
      `,
      category: "IT",
      lastUpdated: "2024-12-10",
      version: "5.0",
      mandatory: true,
      readTime: "8 min",
      icon: <Shield className="h-5 w-5" />,
      priority: "high",
      acknowledgmentRequired: true,
      relatedPolicies: ["remote-work", "device-policy"]
    },
    {
      id: "harassment-policy",
      title: "Anti-Harassment & Discrimination Policy",
      summary: "Zero-tolerance policy for harassment, discrimination, and creating a safe, inclusive workplace for all employees.",
      content: `
        <h3>Zero Tolerance</h3>
        <p>Rush Corporation maintains a zero-tolerance policy for any form of harassment, discrimination, or retaliation in the workplace.</p>
        
        <h3>Protected Characteristics</h3>
        <p>Discrimination based on race, gender, age, religion, sexual orientation, disability, or any other protected characteristic is strictly prohibited.</p>
        
        <h3>Reporting Procedures</h3>
        <p>Employees can report incidents through multiple channels including HR, anonymous hotline, or online reporting system.</p>
        
        <h3>Investigation Process</h3>
        <p>All reports are investigated promptly, thoroughly, and confidentially. Appropriate corrective action will be taken when violations are found.</p>
        
        <h3>Support Resources</h3>
        <p>The company provides counseling services, employee assistance programs, and other support resources for affected employees.</p>
      `,
      category: "HR",
      lastUpdated: "2024-11-30",
      version: "3.0",
      mandatory: true,
      readTime: "6 min",
      icon: <Heart className="h-5 w-5" />,
      priority: "high",
      acknowledgmentRequired: true,
      relatedPolicies: ["code-of-conduct", "reporting-policy"]
    },
    {
      id: "device-policy",
      title: "Device Usage Policy",
      summary: "Guidelines for the proper use of company devices, personal devices for work, and BYOD (Bring Your Own Device) policies.",
      content: `
        <h3>Company Devices</h3>
        <p>Company-provided devices are for business use primarily. Limited personal use is permitted but must not interfere with work responsibilities.</p>
        
        <h3>BYOD Guidelines</h3>
        <p>Personal devices used for work must meet security requirements and have approved software installed for data protection.</p>
        
        <h3>Software Installation</h3>
        <p>Only approved software may be installed on company devices. All software must be licensed and regularly updated.</p>
        
        <h3>Data Backup</h3>
        <p>Important work data must be regularly backed up to approved cloud storage or company servers.</p>
        
        <h3>Device Return</h3>
        <p>All company devices and data must be returned upon termination of employment or change of role.</p>
      `,
      category: "IT",
      lastUpdated: "2024-09-15",
      version: "2.1",
      mandatory: false,
      readTime: "4 min",
      icon: <Smartphone className="h-5 w-5" />,
      priority: "medium",
      acknowledgmentRequired: false,
      relatedPolicies: ["security-policy", "remote-work"]
    },
    {
      id: "social-media",
      title: "Social Media Policy",
      summary: "Guidelines for professional social media use and representing the company online.",
      content: `
        <h3>Professional Representation</h3>
        <p>When identifying yourself as a Rush Corporation employee online, maintain professionalism and align with company values.</p>
        
        <h3>Confidentiality</h3>
        <p>Never share confidential company information, client data, or proprietary information on social media platforms.</p>
        
        <h3>Personal Opinions</h3>
        <p>Clearly distinguish personal opinions from company positions. Use disclaimers when discussing industry topics.</p>
        
        <h3>Respectful Communication</h3>
        <p>Maintain respectful communication online and avoid engaging in controversial or inflammatory discussions.</p>
        
        <h3>Brand Guidelines</h3>
        <p>When posting company-related content, follow brand guidelines and obtain approval for official company communications.</p>
      `,
      category: "Communications",
      lastUpdated: "2024-08-20",
      version: "1.8",
      mandatory: false,
      readTime: "3 min",
      icon: <Globe className="h-5 w-5" />,
      priority: "low",
      acknowledgmentRequired: false,
      relatedPolicies: ["code-of-conduct", "confidentiality-policy"]
    }
  ];

  const categories = ["all", "HR", "IT", "Ethics", "Operations", "Communications"];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const acknowledgePolicy = (policyId: string) => {
    setAcknowledgedPolicies(prev => [...prev, policyId]);
    const policy = policies.find(p => p.id === policyId);
    showSuccess("Policy Acknowledged", `You have acknowledged the ${policy?.title} policy`);
  };

  const downloadPolicy = (policy: Policy) => {
    showSuccess("Download Started", `${policy.title} PDF is being downloaded`);
  };

  const sharePolicy = (policy: Policy) => {
    showInfo("Link Copied", `${policy.title} link has been copied to clipboard`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'low': return 'bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 dark:bg-gray-950/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };

  const mandatoryPolicies = policies.filter(p => p.mandatory);
  const acknowledgedMandatory = mandatoryPolicies.filter(p => acknowledgedPolicies.includes(p.id));
  const completionRate = (acknowledgedMandatory.length / mandatoryPolicies.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Company Policies & Guidelines</h1>
          <p className="text-muted-foreground">Comprehensive policies and procedures for all employees</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Policy Handbook
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Policy Compliance Status
          </CardTitle>
          <CardDescription>
            Track your acknowledgment of mandatory policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{acknowledgedMandatory.length}/{mandatoryPolicies.length}</div>
              <p className="text-sm text-muted-foreground">Policies Acknowledged</p>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
          {completionRate < 100 && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  You have {mandatoryPolicies.length - acknowledgedMandatory.length} mandatory policies pending acknowledgment
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Policies</TabsTrigger>
          <TabsTrigger value="mandatory">Mandatory</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies by title or content..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredPolicies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-md transition-shadow" data-testid={`policy-${policy.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {policy.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{policy.title}</CardTitle>
                        <CardDescription className="mt-1">{policy.summary}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">{policy.category}</Badge>
                          <Badge className={`text-xs ${getPriorityColor(policy.priority)}`}>
                            {policy.priority} priority
                          </Badge>
                          {policy.mandatory && (
                            <Badge variant="destructive" className="text-xs">Mandatory</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {policy.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {policy.acknowledgmentRequired && acknowledgedPolicies.includes(policy.id) && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <Badge variant="outline" className="text-xs">v{policy.version}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="content" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2">
                        <span className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Full Policy
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div 
                          className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert"
                          dangerouslySetInnerHTML={{ __html: policy.content }}
                        />
                        <Separator className="my-4" />
                        <div className="text-xs text-muted-foreground mb-4">
                          Last updated: {new Date(policy.lastUpdated).toLocaleDateString()} • Version {policy.version}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadPolicy(policy)}
                            data-testid={`policy-${policy.id}-download`}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sharePolicy(policy)}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          {policy.acknowledgmentRequired && !acknowledgedPolicies.includes(policy.id) && (
                            <Button
                              size="sm"
                              onClick={() => acknowledgePolicy(policy.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mandatory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mandatory Policies</CardTitle>
              <CardDescription>
                These policies require your acknowledgment and regular review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mandatoryPolicies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {policy.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{policy.title}</h4>
                      <p className="text-sm text-muted-foreground">Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {acknowledgedPolicies.includes(policy.id) ? (
                      <Badge className="bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Acknowledged
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => acknowledgePolicy(policy.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Action Required
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Updated Policies</CardTitle>
              <CardDescription>
                Policies that have been updated in the last 90 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {policies
                .filter(policy => {
                  const updateDate = new Date(policy.lastUpdated);
                  const ninetyDaysAgo = new Date();
                  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
                  return updateDate > ninetyDaysAgo;
                })
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {policy.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{policy.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Updated {new Date(policy.lastUpdated).toLocaleDateString()} • Version {policy.version}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                      <Star className="h-3 w-3 mr-1" />
                      Recently Updated
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(1).map(category => {
              const categoryPolicies = policies.filter(p => p.category === category);
              const categoryIcons: Record<string, React.ReactNode> = {
                'HR': <Users className="h-6 w-6" />,
                'IT': <Shield className="h-6 w-6" />,
                'Ethics': <Scale className="h-6 w-6" />,
                'Operations': <Briefcase className="h-6 w-6" />,
                'Communications': <Globe className="h-6 w-6" />
              };
              
              return (
                <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {categoryIcons[category]}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category}</CardTitle>
                        <CardDescription>{categoryPolicies.length} policies</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categoryPolicies.slice(0, 3).map(policy => (
                        <div key={policy.id} className="text-sm text-muted-foreground">
                          • {policy.title}
                        </div>
                      ))}
                      {categoryPolicies.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          + {categoryPolicies.length - 3} more policies
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
