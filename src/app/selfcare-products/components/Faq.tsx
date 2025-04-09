'use client';

import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractLine } from 'react-icons/ri';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  toggle: () => void;
}

const faqs: FAQ[] = [
  { question: 'How can I book an appointment?', answer: 'You can book your appointment directly through our website. Just choose your salon, select your service, preferred time, and confirm — it’s that easy!' },
  { question: 'Can I reschedule or cancel my booking?', answer: 'Yes, you can reschedule or cancel your appointment up to 24 hours in advance. Please contact our support team to make changes.' },
  { question: 'What if I’m running late? ', answer: 'If you’re more than 10 minutes late, your appointment may be cancelled or delayed depending on salon.' },
  { question: 'How can I place an order?', answer: 'Simply browse our products, add to cart, and proceed to checkout. You can pay via cash on delivery or online payment methods.' },
  { question: 'How long will it take to receive my order?', answer: 'Orders usually arrive within 3–5 working days, depending on your location.' },
  { question: 'Do you offer cash on delivery (COD)?', answer: 'Yes! We offer COD across Pakistan.' },
  { question: 'How can I track my order?', answer: 'Once your order is shipped, we’ll send you a tracking number via SMS or email. You can track it on our courier partner’s website.' },
  { question: 'What is your return policy?', answer: 'If you receive a wrong or damaged item, please contact us within 24 hours of delivery. We’ll arrange a replacement or refund as per our return policy.' },
  { question: 'Are your products original?', answer: 'Yes, all our products are 100% original and sourced directly from trusted suppliers or brands.' }
];

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, toggle }) => {
  return (
    <div
      className={`border-b border-gray-300 p-4 transition-all duration-300 ${isOpen ? 'bg-[#f2e6c7]' : 'bg-[#fcf1c9]'
        }`}
    >
      <button onClick={toggle} className={`w-full text-left flex justify-between items-center text-lg font-semibold ${isOpen ? 'text-[#583FA8]' : 'text-black'
        }`}>
        {faq.question}
        <span className={`text-xl p-1 rounded ${isOpen ? 'text-[#FBE8A5] bg-[#583FA8]' : 'text-[#583FA8] bg-[#FBE8A5]'}`}>
          {isOpen ? <RiSubtractLine size={20} /> : <IoMdAdd />}
        </span>
      </button>
      {isOpen && <div className="p-4 text-sm text-[#636363]">{faq.answer}</div>}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="p-8 bg-[#fcf1c9] w-[99vw] mb-10">
      <h2 className="text-2xl font-bold text-center text-[#583FA8] mb-6">Got Questions? We've Got Answers!</h2>
      <div className="max-w-2xl mx-auto shadow-md rounded-lg">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            toggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
