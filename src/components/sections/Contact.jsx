import React, { useRef, useState } from 'react';
import { Mail, Phone, Linkedin, ArrowRight, Github, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import developerData from '../../data/developerData';

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const templateParams = {
      from_name: e.target.from_name.value,
      reply_to: e.target.reply_to.value,
      message: e.target.message.value,
      to_email: "sebastian.strzalkowski@i-can-do.it"
    };

    emailjs.send(
        'service_2yrvjqd',
        'template_bg2ua91',
        templateParams,
        'mYDSK-Ps24LOITgNi'
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setSuccess(true);
      setLoading(false);
      e.target.reset();
    }, (error) => {
      console.error('Error sending email:', error.text);
      setError(true);
      setLoading(false);
    });
  };

  return (
      <section id="contact" className="py-20 bg-gray-800 text-white p-4 relative">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full opacity-5 blur-3xl"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-500 bg-opacity-20 text-green-400 px-4 py-1 rounded-full text-sm font-medium mb-4">{t('contact.title')}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t('contact.subtitle')}</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">{t('contact.description')}</p>
          </div>

          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900">
                <h3 className="text-2xl font-semibold mb-6 text-green-400">{t('contact.contactDetails')}</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-green-900 bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Mail size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t('contact.contactLabels.email')}</p>
                      <a href={`mailto:${developerData.contact.email}`} className="hover:text-green-400 transition-colors">
                        {developerData.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-900 bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Phone size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t('contact.contactLabels.phone')}</p>
                      <a href={`tel:${developerData.contact.phone}`} className="hover:text-green-400 transition-colors">
                        {developerData.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-900 bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Linkedin size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t('contact.contactLabels.linkedin')}</p>
                      <a href={`https://${developerData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="flex items-center">
                    <div className="bg-green-900 bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Github size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t('contact.contactLabels.github')}</p>
                      <a href={`https://github.com/${developerData.contact.github.replace('github.com/', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        GitHub
                      </a>
                    </div>
                  </div>

                  {/* Telegram */}
                  <div className="flex items-center">
                    <div className="bg-green-900 bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                        <path d="M21.73 2.27a2 2 0 0 0-2.83 0L2.27 18.9a2 2 0 0 0 0 2.83 2 2 0 0 0 2.83 0L21.73 5.1a2 2 0 0 0 0-2.83z" />
                        <path d="M8.5 14.5 7 19l4.5-1.5" />
                        <path d="m2 12 7.3-7.2c1-1 2.5-1 3.4 0l7.4 7.2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t('contact.contactLabels.telegram')}</p>
                      <a href={`https://t.me/${developerData.contact.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        Telegram
                      </a>
                    </div>
                  </div>

                  {/* Discord */}
                  <div className="flex items-center">
                    <div className="bg-green-900 bg-opacity-30 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t('contact.contactLabels.discord')}</p>
                      <a href="https://discord.com/users/sebastianstrzalkowski" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        Discord
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-green-400">{t('contact.form.title')}</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="to_email" value="sebastian.strzalkowski@i-can-do.it" />

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{t('contact.form.name')}</label>
                    <input
                        type="text"
                        name="from_name"
                        placeholder={t('contact.form.namePlaceholder')}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{t('contact.form.email')}</label>
                    <input
                        type="email"
                        name="reply_to"
                        placeholder={t('contact.form.emailPlaceholder')}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{t('contact.form.message')}</label>
                    <textarea
                        name="message"
                        placeholder={t('contact.form.messagePlaceholder')}
                        rows="4"
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 transition-colors resize-y"
                        required
                    ></textarea>
                  </div>
                  <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 w-full text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={loading}
                  >
                    {loading ? t('contact.form.sending') : t('contact.form.send')}
                    {!loading && <ArrowRight className="ml-2" size={18} />}
                  </button>

                  {success && (
                      <div className="bg-green-500 bg-opacity-20 text-green-400 p-3 rounded-lg text-center">
                        {t('contact.form.success')}
                      </div>
                  )}

                  {error && (
                      <div className="bg-red-500 bg-opacity-20 text-red-400 p-3 rounded-lg text-center">
                        {t('contact.form.error')}
                      </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;