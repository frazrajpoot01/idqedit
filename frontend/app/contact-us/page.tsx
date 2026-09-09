"use client";
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from '@/components/NavBar';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    if (serviceId && serviceId !== 'your_service_id_here') {
      emailjs
        .sendForm(
          serviceId,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
          formRef.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
        )
        .then(
          () => {
            setIsSubmitting(false);
            setSubmitted(true);
          },
          (error) => {
            setIsSubmitting(false);
            setErrorMsg('Failed to send message. Please try again later.');
            console.error('EmailJS Error:', error.text);
          }
        );
    } else {
      // Simulate form submission if EmailJS is not configured
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1000);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col"> 
      <NavBar />
      
      <div className="flex-grow max-w-[800px] mx-auto px-4 py-20 w-full">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 font-extrabold mb-4 tracking-tight">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a question about a product, or want to collaborate with our editorial team? We'd love to hear from you.
          </p>
        </div>
        
        {submitted ? (
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Message Sent</h2>
            <p className="text-gray-600">Thank you for reaching out. We will be in touch with you shortly.</p>
            <button 
              onClick={() => {setSubmitted(false); setFormData({name: '', email: '', subject: '', message: ''});}}
              className="mt-8 text-rose-600 font-semibold hover:text-rose-700 underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium">
                {errorMsg}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="user_name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="user_email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
              <input 
                type="text" 
                name="subject"
                required
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea 
                required
                name="message"
                rows={6}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors resize-y"
                placeholder="Write your message here..."
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 disabled:cursor-not-allowed text-white py-4 font-bold text-lg transition-all duration-200 shadow-md hover:shadow-lg flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
