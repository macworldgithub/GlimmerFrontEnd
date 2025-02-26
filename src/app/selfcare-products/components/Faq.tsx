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
  { question: 'How can I track my order?', answer: 'We accept major credit cards (Visa, Mastercard, American Express) as well as PayPal for secure and convenient payments.' },
  { question: 'What payment methods do you accept?', answer: 'We accept major credit cards (Visa, Mastercard, American Express) as well as PayPal for secure and convenient payments.' },
  { question: 'Do you offer international shipping?', answer: 'We accept major credit cards (Visa, Mastercard, American Express) as well as PayPal for secure and convenient payments.' },
  { question: 'What is your return policy?', answer: 'We accept major credit cards (Visa, Mastercard, American Express) as well as PayPal for secure and convenient payments.' },
  { question: 'Are your products cruelty-free?', answer: 'We accept major credit cards (Visa, Mastercard, American Express) as well as PayPal for secure and convenient payments.' }
];

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, toggle }) => {
  return (
    <div
      className={`border-b border-gray-300 p-4 transition-all duration-300 ${
        isOpen ? 'bg-[#f2e6c7]' : 'bg-[#fcf1c9]'
      }`}
    >
      <button onClick={toggle} className={`w-full text-left flex justify-between items-center text-lg font-semibold ${
        isOpen ? 'text-[#583FA8]' : 'text-black'
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
    <div className="p-8 bg-[#fcf1c9] w-[99vw] mb-64 xl:mb-80">
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
