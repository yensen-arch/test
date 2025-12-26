import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We offer a 30-day return policy on all items. Products must be in their original condition with tags attached. Please contact our support team to initiate a return.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for 2-3 business day delivery.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
            <AccordionContent>
              Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check your cart for specific shipping options to your country.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How can I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

