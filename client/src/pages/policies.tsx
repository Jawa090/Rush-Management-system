import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

//todo: remove mock functionality
const policies = [
  {
    id: "leave-policy",
    title: "Leave Policy",
    summary: "Guidelines for requesting and managing various types of leave including annual, sick, and emergency leave.",
    content: "Employees are entitled to 20 days of annual leave per year. Sick leave is granted based on medical certificates. All leave requests must be submitted at least 2 weeks in advance for approval.",
  },
  {
    id: "code-of-conduct",
    title: "Code of Conduct",
    summary: "Expected standards of behavior and professional ethics for all employees.",
    content: "All employees are expected to maintain the highest standards of professional conduct, treat colleagues with respect, and uphold the company's values of integrity, excellence, and collaboration.",
  },
  {
    id: "remote-work",
    title: "Remote Work Policy",
    summary: "Guidelines and requirements for remote work arrangements.",
    content: "Employees may work remotely up to 3 days per week with manager approval. Remote workers must maintain regular communication, attend virtual meetings, and ensure secure handling of company data.",
  },
  {
    id: "security",
    title: "Information Security Policy",
    summary: "Guidelines for protecting company data and information systems.",
    content: "Employees must use strong passwords, enable two-factor authentication, and never share login credentials. Sensitive data must be encrypted and only accessed on secure networks.",
  },
  {
    id: "harassment",
    title: "Anti-Harassment Policy",
    summary: "Zero-tolerance policy for harassment and discrimination in the workplace.",
    content: "Rush Corporation maintains a zero-tolerance policy for any form of harassment or discrimination. All employees have the right to work in an environment free from harassment based on race, gender, religion, or any other protected characteristic.",
  },
];

export default function Policies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Company Policies</h1>
        <p className="text-muted-foreground">Important policies and guidelines</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {policies.map((policy) => (
          <AccordionItem key={policy.id} value={policy.id} data-testid={`policy-${policy.id}`}>
            <AccordionTrigger className="text-left">
              <div>
                <h3 className="font-semibold">{policy.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{policy.summary}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <p className="text-muted-foreground">{policy.content}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log(`Downloading ${policy.title}`)}
                  data-testid={`policy-${policy.id}-download`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
