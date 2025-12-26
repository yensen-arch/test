import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div className="w-full py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-slate-900">What is your return policy?</AccordionTrigger>
            <AccordionContent className="text-slate-700">
              We offer a 30-day return policy on all items. Products must be in their original condition with tags attached. Please contact our support team to initiate a return.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-slate-900">How long does shipping take?</AccordionTrigger>
            <AccordionContent className="text-slate-700">
              Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for 2-3 business day delivery.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-slate-900">Do you offer international shipping?</AccordionTrigger>
            <AccordionContent className="text-slate-700">
              Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check your cart for specific shipping options to your country.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-slate-900">What payment methods do you accept?</AccordionTrigger>
            <AccordionContent className="text-slate-700">
              We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-slate-900">How can I track my order?</AccordionTrigger>
            <AccordionContent className="text-slate-700">
              Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

