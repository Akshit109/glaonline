
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! 👋 Welcome to GLA Online. I'm your virtual admissions assistant. I can help you explore programmes, eligibility, scholarships, fees and the admission process. What would you like to know?",
};

const QUICK_QUESTIONS = [
  'Explore programmes',
  'Admission eligibility',
  'Fees & scholarships',
  'How do online classes work?',
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    INITIAL_MESSAGE,
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 250);

      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();

    if (!messageText || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.slice(-12),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to get a response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again in a moment, or contact our admissions team for assistance.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed z-[100] bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[390px] max-w-[390px] h-[min(620px,calc(100dvh-130px))] min-h-[400px] bg-white border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden"
            role="dialog"
            aria-label="GLA Online Admissions Assistant"
          >
            {/* Header */}
            <div className="relative bg-[#186534] text-white px-5 py-4 shrink-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 bg-white/10 border border-white/15 flex items-center justify-center">
                    <Bot className="w-6 h-6" />

                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#F9CE3A] border-2 border-[#186534]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm">
                      GLA Online Assistant
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6B7]" />
                      <span className="text-[11px] text-white/75">
                        Online · AI Admissions Support
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={resetChat}
                    aria-label="Restart conversation"
                    title="Restart conversation"
                    className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chatbot"
                    className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto px-4 py-5 bg-[#F8FAF8] space-y-4 overscroll-contain">
              {/* Assistant Intro */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 shrink-0 flex items-center justify-center bg-[#186534] text-white mt-1">
                  <Bot className="w-4 h-4" />
                </div>

                <div className="max-w-[88%] bg-white border border-black/[0.06] px-4 py-3 shadow-sm">
                  <p className="text-[13px] leading-[1.75] text-[#242824] whitespace-pre-wrap">
                    {messages[0].content}
                  </p>
                </div>
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="pl-9 space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-black/40 font-semibold">
                    Explore a topic
                  </p>

                  {QUICK_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      disabled={isLoading}
                      className="block w-full text-left px-3.5 py-2.5 bg-white border border-[#186534]/15 text-[#186534] text-xs font-medium hover:border-[#186534]/50 hover:bg-[#EFF5EF] transition-colors disabled:opacity-50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Messages */}
              {messages.slice(1).map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${
                    message.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 shrink-0 flex items-center justify-center bg-[#186534] text-white mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] px-4 py-3 text-[13px] leading-[1.75] whitespace-pre-wrap break-words ${
                      message.role === 'user'
                        ? 'bg-[#186534] text-white'
                        : 'bg-white text-[#242824] border border-black/[0.06] shadow-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Loading Animation */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 shrink-0 flex items-center justify-center bg-[#186534] text-white mt-1">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="bg-white border border-black/[0.06] px-4 py-4 flex items-center gap-1.5 shadow-sm">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: dot * 0.15,
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-[#186534]"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-black/10 p-3 shrink-0">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2 border border-black/10 bg-[#FAFAFA] p-1.5 focus-within:border-[#186534]/50 transition-colors"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about admissions..."
                  maxLength={1000}
                  disabled={isLoading}
                  className="flex-1 min-w-0 px-2 py-2 bg-transparent outline-none text-sm text-black placeholder:text-black/35 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-10 h-10 flex items-center justify-center bg-[#186534] text-white hover:bg-[#124D27] transition-colors disabled:bg-black/10 disabled:text-black/30 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-1.5 pt-2">
                <Sparkles className="w-3 h-3 text-[#186534]/60" />
                <p className="text-[10px] text-black/40">
                  AI assistant · Verify important admission details with the university
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? 'Close chat' : 'Open admissions assistant'}
        className="fixed z-[100] bottom-5 right-4 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#186534] text-white shadow-[0_8px_30px_rgba(24,101,52,0.35)] flex items-center justify-center hover:bg-[#124D27] transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="relative"
            >
              <MessageCircle className="w-7 h-7" />

              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-[#F56C1F] text-white text-[9px] font-bold rounded-full">
                1
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
