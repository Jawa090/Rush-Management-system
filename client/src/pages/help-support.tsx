import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Video,
  Search,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  Users,
  Zap,
  Shield,
  Settings,
  Heart,
  Calendar,
  Download,
  ExternalLink
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function HelpSupport() {
  const { showSuccess } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: ""
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Support Ticket Created", "Your support request has been submitted. We'll get back to you within 24 hours.");
    setTicketForm({ subject: "", category: "", priority: "medium", description: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTicketForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setTicketForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqData = [
    {
      category: "Account & Login",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Go to Account Settings > Password & Security and click 'Update Password'. You'll need to enter your current password and then your new password twice."
        },
        {
          question: "How do I enable two-factor authentication?",
          answer: "Navigate to Account Settings > Password & Security and toggle on 'Two-Factor Authentication'. Follow the setup instructions to connect your authenticator app."
        },
        {
          question: "Why can't I log in to my account?",
          answer: "Check that you're using the correct email and password. If you're still having trouble, try resetting your password or contact IT support."
        }
      ]
    },
    {
      category: "Prayer Times & Islamic Features",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      questions: [
        {
          question: "How do I set up prayer time notifications?",
          answer: "Go to Notification Preferences and enable 'Prayer Time Alerts'. You can customize the timing and sound preferences for each prayer."
        },
        {
          question: "Can I customize prayer times for my location?",
          answer: "Yes! Visit the Prayer Times page and update your location settings. The system will automatically calculate accurate prayer times for your area."
        },
        {
          question: "How do I access daily duas?",
          answer: "Navigate to the Duas section from the sidebar. You can browse by category, mark favorites, and even listen to audio recitations."
        }
      ]
    },
    {
      category: "Leave Management",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      questions: [
        {
          question: "How do I submit a leave request?",
          answer: "Go to Leave Management and click 'Submit New Request'. Fill in the dates, type of leave, and reason. Your manager will be notified automatically."
        },
        {
          question: "Can I cancel a pending leave request?",
          answer: "Yes, you can cancel any pending leave request from the Leave Management page. Once approved, you'll need to contact your manager directly."
        },
        {
          question: "How do I check my leave balance?",
          answer: "Your current leave balance is displayed on the Leave Management page and also on your dashboard overview."
        }
      ]
    },
    {
      category: "Technical Issues",
      icon: <Settings className="h-5 w-5 text-purple-500" />,
      questions: [
        {
          question: "The app is running slowly, what should I do?",
          answer: "Try clearing your browser cache, closing other tabs, or refreshing the page. If the issue persists, contact IT support with details about your browser and device."
        },
        {
          question: "I'm not receiving notifications, how do I fix this?",
          answer: "Check your Notification Preferences to ensure notifications are enabled. Also verify that your browser allows notifications from this site."
        },
        {
          question: "How do I report a bug or technical issue?",
          answer: "Use the 'Report Issue' option in the support ticket form below, or contact IT support directly with a detailed description of the problem."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      availability: "Mon-Fri, 9 AM - 6 PM",
      responseTime: "< 5 minutes",
      action: "Start Chat"
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      icon: <Phone className="h-6 w-6 text-green-500" />,
      availability: "Mon-Fri, 9 AM - 5 PM",
      responseTime: "Immediate",
      action: "Call Now",
      contact: "+1 (555) 123-4567"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: <Mail className="h-6 w-6 text-orange-500" />,
      availability: "24/7",
      responseTime: "< 24 hours",
      action: "Send Email",
      contact: "support@rushcorp.com"
    },
    {
      title: "Video Call",
      description: "Schedule a screen-sharing session",
      icon: <Video className="h-6 w-6 text-purple-500" />,
      availability: "By appointment",
      responseTime: "Same day",
      action: "Schedule Call"
    }
  ];

  const resources = [
    {
      title: "User Guide",
      description: "Complete guide to using the employee portal",
      icon: <Book className="h-5 w-5 text-blue-500" />,
      type: "PDF",
      size: "2.5 MB"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: <Video className="h-5 w-5 text-red-500" />,
      type: "Video",
      count: "12 videos"
    },
    {
      title: "Islamic Guidelines",
      description: "Company policies for Islamic practices",
      icon: <Heart className="h-5 w-5 text-green-500" />,
      type: "PDF",
      size: "1.8 MB"
    },
    {
      title: "Quick Reference",
      description: "Keyboard shortcuts and tips",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      type: "PDF",
      size: "0.5 MB"
    }
  ];

  const recentTickets = [
    {
      id: "TK-2024-001",
      subject: "Cannot access leave balance",
      status: "resolved",
      priority: "medium",
      created: "2024-01-10",
      updated: "2024-01-12"
    },
    {
      id: "TK-2024-002", 
      subject: "Prayer time notifications not working",
      status: "in-progress",
      priority: "high",
      created: "2024-01-14",
      updated: "2024-01-15"
    },
    {
      id: "TK-2024-003",
      subject: "Profile picture upload issue",
      status: "pending",
      priority: "low",
      created: "2024-01-15",
      updated: "2024-01-15"
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === "" || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get the help you need to make the most of your Rush Corporation employee portal. 
          Search our knowledge base or contact our support team directly.
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportChannels.map((channel, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                {channel.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{channel.title}</h3>
                <p className="text-sm text-muted-foreground">{channel.description}</p>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{channel.availability}</span>
                </div>
                <div>Response: {channel.responseTime}</div>
                {channel.contact && (
                  <div className="font-medium text-foreground">{channel.contact}</div>
                )}
              </div>
              <Button size="sm" className="w-full">
                {channel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredFAQ.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center gap-2 mb-4">
                      {category.icon}
                      <h3 className="font-semibold text-foreground">{category.category}</h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border border-border/50 rounded-lg px-4">
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Ticket Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Create Support Ticket
              </CardTitle>
              <CardDescription>
                Can't find what you're looking for? Submit a support request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={ticketForm.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account & Login</SelectItem>
                      <SelectItem value="prayer">Prayer Times</SelectItem>
                      <SelectItem value="leave">Leave Management</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={ticketForm.priority}
                    onValueChange={(value) => handleSelectChange("priority", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide detailed information about your issue..."
                    value={ticketForm.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resources & Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    {resource.icon}
                    <div>
                      <div className="font-medium text-sm">{resource.title}</div>
                      <div className="text-xs text-muted-foreground">{resource.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {resource.size || resource.count}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Your Recent Support Tickets
          </CardTitle>
          <CardDescription>
            Track the status of your recent support requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {ticket.status === 'resolved' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {ticket.status === 'in-progress' && <Clock className="h-4 w-4 text-blue-500" />}
                    {ticket.status === 'pending' && <AlertCircle className="h-4 w-4 text-orange-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <Badge variant={
                        ticket.priority === 'high' ? 'destructive' :
                        ticket.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="text-sm text-foreground">{ticket.subject}</div>
                    <div className="text-xs text-muted-foreground">
                      Created: {ticket.created} • Updated: {ticket.updated}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    ticket.status === 'resolved' ? 'secondary' :
                    ticket.status === 'in-progress' ? 'default' : 'outline'
                  }>
                    {ticket.status.replace('-', ' ')}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}