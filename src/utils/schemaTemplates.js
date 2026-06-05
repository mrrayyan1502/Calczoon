/**
 * @fileoverview
 * This file contains reusable templates and best practices for JSON-LD Schema generation.
 * It serves as a guide to prevent duplicate FAQPage schema errors and ensure Google Rich Results compliance.
 * 
 * COMMON CAUSES OF DUPLICATE SCHEMA:
 * 1. Multiple Components: Injecting FAQPage schema in both a parent Layout and a child Page.
 * 2. Component-Level Injection: Presentational components (like <Faq />) injecting schema instead of just rendering UI.
 * 3. Auto-Generation: Using libraries that automatically append schema without checking for existing tags.
 * 4. SEO Component Misuse: Passing the same schema object multiple times or declaring it in multiple SEO blocks.
 * 
 * PREVENTION STRATEGIES:
 * 1. Single Source of Truth: Only the specific Calculator Page component should define and pass the FAQ schema.
 * 2. Pure UI Components: Ensure <Faq /> and layout components are purely visual and do not contain <Helmet> or schema logic.
 * 3. Use Helmet Correctly: Utilize react-helmet-async to manage head tags and prevent duplicates.
 * 
 * TROUBLESHOOTING:
 * - Use Google's Rich Results Test tool (https://search.google.com/test/rich-results)
 * - Inspect the rendered DOM for multiple <script type="application/ld+json"> tags containing "@type": "FAQPage".
 * - Check the console for "Duplicate field 'mainEntity'" errors.
 */

/**
 * Generates a valid FAQPage JSON-LD schema object.
 * 
 * @param {Array<{question: string, answer: string}>} items - Array of question/answer objects.
 * @returns {Object} - The formatted JSON-LD object.
 * 
 * @example
 * const faqItems = [{ question: "What is X?", answer: "X is..." }];
 * const schema = generateFaqSchema(faqItems);
 */
export const generateFaqSchema = (items) => {
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

/**
 * Template for Calculator WebApplication Schema
 * 
 * @param {Object} config
 * @param {string} config.name - Calculator name
 * @param {string} config.description - Brief description
 * @param {string} config.url - Canonical URL
 * @param {string} [config.category] - "FinancialApplication", "HealthApplication", etc.
 * @returns {Object}
 */
export const generateCalculatorSchema = ({ name, description, url, category = "WebApplication" }) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "applicationCategory": category,
    "operatingSystem": "Any",
    "url": `https://calczoon.com${url}`,
    "browserRequirements": "Requires a modern web browser.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
};