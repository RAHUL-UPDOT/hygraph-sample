import React from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq } from '@/services/travel';

interface FaqAccordionProps {
  faqs?: Faq[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
      <Accordion className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-base text-zinc-600 dark:text-zinc-400">
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <RichText content={faq.answer.raw} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
