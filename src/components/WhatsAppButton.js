import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppSVG = (props) => (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="32" height="32" rx="16" fill="#25D366" />
    <path d="M16 6C10.477 6 6 10.477 6 16c0 2.01.59 3.89 1.61 5.47L6 26l4.7-1.54A9.96 9.96 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6zm0 18c-1.7 0-3.29-.44-4.66-1.2l-.33-.19-2.79.92.93-2.72-.21-.34A7.96 7.96 0 018 16c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.36-6.13c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.43-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.54.58.2 1.03.32 1.38.41.58.15 1.1.13 1.52.08.46-.05 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" fill="#fff" />
  </svg>
);

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/7069940681"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-40 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-lg font-semibold transition-all duration-300 group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1, boxShadow: '0 20px 60px rgba(34, 197, 94, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-2xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <WhatsAppSVG />
          </motion.span>
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
