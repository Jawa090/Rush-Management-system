import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  Users, 
  Building, 
  Globe,
  Headphones,
  Calendar,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Copy,
  Star,
  ThumbsUp,
  MessageCircle,
  Video,
  FileText,
  Zap
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  department: string;
  priority: string;
  subject: string;
  message: string;
  attachments: File[];
}

interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  timezone: string;
  mapUrl: string;
  departments: string[];
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    department: "",
    priority: "medium",
    subject: "",
    message: "",
    attachments: []
  });

  const [selectedOffice, setSelectedOffice] = useState("headquarters");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { showSuccess, showError, showInfo } = useNotifications();

  const offices: Office[] = [
    {
      id: "headquarters",
      name: "Headquarters",
      address: "123 Business Avenue, New York, NY 10001",
      city: "New York",
      phone: "+1 (555) 123-4567",
      email: "ny@rushcorp.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM EST",
      timezone: "EST",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99185368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
      departments: ["General Inquiries", "HR", "IT Support", "Sales", "Customer Service"]
    },
    {
      id: "west-coast",
      name: "West Coast Office",
      address: "456 Tech Street, San Francisco, CA 94105",
      city: "San Francisco",
      phone: "+1 (555) 987-6543",
      email: "sf@rushcorp.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM PST",
      timezone: "PST",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284713389!2d-122.39492668468141!3d37.78808797975633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5b6c5b6b%3A0x5b6c5b6c5b6c5b6c!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
      departments: ["Engineering", "Product", "Design", "Customer Success"]
    },
    {
      id: "europe",
      name: "European Office",
      address: "789 Innovation Road, London, EC1A 1BB",
      city: "London",
      phone: "+44 20 7123 4567",
      email: "london@rushcorp.com",
      hours: "Monday - Friday: 9:00 AM - 5:00 PM GMT",
      timezone: "GMT",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4089999999997!2d-0.09929368423043!3d51.51494797963595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2b2b2b2b2b%3A0x2b2b2b2b2b2b2b2b!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
      departments: ["Sales", "Marketing", "Operations", "Legal"]
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      action: "Call Now",
      availability: "24/7 Emergency Support",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      availability: "Response within 24 hours",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      action: "Start Chat",
      availability: "Mon-Fri 9AM-6PM EST",
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Call",
      description: "Schedule a video consultation",
      action: "Book Meeting",
      availability: "By appointment",
      color: "bg-orange-50 text-orange-700 border-orange-200"
    }
  ];

  const departments = [
    "General Inquiries",
    "Human Resources",
    "IT Support",
    "Sales",
    "Customer Service",
    "Billing",
    "Technical Support",
    "Partnership",
    "Media Inquiries"
  ];

  const priorities = [
    { value: "low", label: "Low - General inquiry", color: "text-green-600" },
    { value: "medium", label: "Medium - Standard request", color: "text-yellow-600" },
    { value: "high", label: "High - Urgent matter", color: "text-red-600" },
    { value: "critical", label: "Critical - Emergency", color: "text-red-800" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showError("Missing Information", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      showSuccess("Message Sent", "Your message has been sent successfully. We'll get back to you soon!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        priority: "medium",
        subject: "",
        message: "",
        attachments: []
      });
    }, 2000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    showInfo("Copied", `${type} copied to clipboard`);
  };

  const currentOffice = offices.find(office => office.id === selectedOffice) || offices[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Contact & Support Center</h1>
          <p className="text-muted-foreground">Get in touch with our team through multiple channels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button>
            <Headphones className="h-4 w-4 mr-2" />
            Emergency Support
          </Button>
        </div>
      </div>

      {/* Quick Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactMethods.map((method, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${method.color}`}>
                {method.icon}
              </div>
              <h3 className="font-semibold mb-1">{method.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                {method.action}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">{method.availability}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contact">Contact Form</TabsTrigger>
          <TabsTrigger value="offices">Office Locations</TabsTrigger>
          <TabsTrigger value="support">Support Center</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full Name *</Label>
                      <Input
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email Address *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john.doe@example.com"
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone Number</Label>
                      <Input
                        id="contact-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-department">Department</Label>
                      <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-priority">Priority Level</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <span className={priority.color}>{priority.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject *</Label>
                    <Input
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="How can we help you?"
                      data-testid="input-contact-subject"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      data-testid="input-contact-message"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Attachments (Optional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop files here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Max 10MB per file. Supported: PDF, DOC, JPG, PNG
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-send-message">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Headquarters</p>
                      <p className="text-sm text-muted-foreground">{currentOffice.address}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(currentOffice.address, "Address")}
                        className="p-0 h-auto text-xs text-primary hover:bg-transparent"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Address
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{currentOffice.phone}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(currentOffice.phone, "Phone number")}
                        className="p-0 h-auto text-xs text-primary hover:bg-transparent"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Number
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{currentOffice.email}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(currentOffice.email, "Email")}
                        className="p-0 h-auto text-xs text-primary hover:bg-transparent"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Email
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-sm text-muted-foreground">{currentOffice.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">General Inquiries</span>
                    <Badge variant="secondary">24-48 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Support</span>
                    <Badge variant="secondary">4-8 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Urgent Matters</span>
                    <Badge className="bg-red-100 text-red-800">1-2 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Support</span>
                    <Badge className="bg-red-600 text-white">Immediate</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="offices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Offices</CardTitle>
                <CardDescription>
                  Select an office to view details and location
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
                    <div className="text-left">
                      <div className="font-medium">{office.name}</div>
                      <div className="text-xs text-muted-foreground">{office.city}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{currentOffice.name}</CardTitle>
                <CardDescription>{currentOffice.city}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{currentOffice.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{currentOffice.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{currentOffice.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{currentOffice.hours}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Departments</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentOffice.departments.map((dept, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="h-64 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={currentOffice.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${currentOffice.name} Location Map`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Center</CardTitle>
              <CardDescription>
                Find answers to common questions and get help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <FileText className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold mb-2">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Browse our comprehensive help articles
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Browse Articles
                  </Button>
                </div>
                
                <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <MessageSquare className="h-8 w-8 mx-auto mb-3 text-green-500" />
                  <h3 className="font-semibold mb-2">Community Forum</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect with other users and experts
                  </p>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Join Forum
                  </Button>
                </div>
                
                <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <Video className="h-8 w-8 mx-auto mb-3 text-purple-500" />
                  <h3 className="font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Watch step-by-step video guides
                  </p>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Watch Videos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" />
                Share Your Feedback
              </CardTitle>
              <CardDescription>
                Help us improve by sharing your thoughts and suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <Star className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
                    <h3 className="font-semibold mb-2">Rate Our Service</h3>
                    <p className="text-sm text-muted-foreground">
                      Share your experience with our team
                    </p>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <Zap className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                    <h3 className="font-semibold mb-2">Suggest Improvements</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell us how we can serve you better
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Recent Feedback</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm">"Excellent customer service and quick response times!"</p>
                        <p className="text-xs text-muted-foreground">- Anonymous User</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Star className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm">"The new features are amazing. Keep up the great work!"</p>
                        <p className="text-xs text-muted-foreground">- Happy Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
