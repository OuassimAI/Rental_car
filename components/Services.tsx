import React from 'react';

const serviceFeatures = [
  {
    icon: (
      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
    ),
    title: 'Conversational Booking',
    description: "Simply tell us what you need in plain language. Our AI handles the rest, from finding the right car to confirming your reservation."
  },
  {
    icon: (
        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
    ),
    title: 'Intelligent Recommendations',
    description: "Not sure what to choose? Our assistant analyzes your needs to suggest the perfect vehicle for your trip and budget."
  },
  {
    icon: (
        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9m-9 9h18"></path></svg>
    ),
    title: '24/7 Multilingual Support',
    description: "Get help anytime, anywhere, in your preferred language. From booking changes to questions about our fleet, we're always here."
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">AI-Powered Convenience</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
          Our core service is an industry-leading AI assistant designed to make your rental experience seamless, intelligent, and completely hassle-free.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {serviceFeatures.map((feature, index) => (
          <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;