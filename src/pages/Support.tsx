import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, Zap, Rocket, Lightbulb } from "lucide-react";

export default function Support() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers, guides, and tutorials to get the most out of the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* API Guide */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>How to Connect Your OpenAI API Key</CardTitle>
                  <CardDescription>
                    Unlock the full power of AI generation by connecting your own API key.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To generate applications, you need to provide your own OpenAI API key. This ensures that you have full control over your usage and billing. Your key is stored securely and is only used when you initiate an app generation request.</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2">
                <li>Navigate to the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline text-primary">OpenAI API keys page</a> in your OpenAI account.</li>
                <li>Create a new secret key. Make sure to copy it immediately, as you won't be able to see it again.</li>
                <li>Go to the API Keys tab in your application settings.</li>
                <li>Paste your key into the input field and click "Save Key".</li>
              </ol>
              <Button asChild>
                <Link to="/settings/" state={{ tab: 'api-keys' }}>
                  Go to API Keys Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is my OpenAI API key secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, absolutely. Your API key is encrypted and stored securely in our database. It is only ever used on the server-side to make requests to the OpenAI API on your behalf and is never exposed on the client-side.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does the app generation work?</AccordionTrigger>
                  <AccordionContent>
                    When you provide a prompt, our system combines it with a series of pre-engineered instructions and sends it to the OpenAI API. The AI then generates code based on best practices for the selected framework. We then package this code into a downloadable project for you.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I customize the generated code?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Once you download the project, you have full control. The generated code is designed to be a clean, maintainable starting point that you can extend and customize to fit your exact needs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Upcoming Features */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 text-primary" />
                <CardTitle>Upcoming Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />
                  <span>**Customizable Templates:** Save your own projects as templates for future use.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />
                  <span>**Live Collaboration:** Invite team members to collaborate on app generation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 mt-1 text-yellow-500 flex-shrink-0" />
                  <span>**One-Click Deployment:** Directly deploy your generated apps to services like Vercel or Netlify.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <LifeBuoy className="w-5 h-5 text-primary" />
                <CardTitle>Need More Help?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you can't find the answer you're looking for, our support team is here to help.
              </p>
              <Button className="w-full" onClick={() => window.location.href = 'mailto:support@example.com'}>Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}