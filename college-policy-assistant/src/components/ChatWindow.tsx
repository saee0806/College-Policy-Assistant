import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onOpenHandbook: () => void;
  onOpenContacts: () => void;
}

const QUICK_PROMPTS = [
  "What is the minimum attendance required?",
  "What are the examination rules and allowed items?",
  "How are internal assessment marks calculated?",
  "What is the penalty for late assignment submission?",
  "What are the hostel curfew timings and leave rules?",
  "What is the college's anti-ragging policy?",
  "Can I pay my semester fee in installments?",
  "What is the refund policy if I withdraw admission?",
  "What are the eligibility criteria for merit scholarships?",
  "What is the 'One Student, One Job' placement rule?"
];

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onOpenHandbook,
  onOpenContacts
}) => {
  const [input, setInput] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize height
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 max-w-4xl w-full mx-auto">
        
        {/* Intro Card when only initial message exists */}
        {messages.length <= 1 && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Welcome to the College Policy Assistant
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  I am your official AI guide for institutional rules and academic regulations. I provide simple, accurate, and student-friendly information grounded directly in the university policy handbook.
                </p>
              </div>
            </div>

            {/* Coverage categories */}
            <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 text-xs text-slate-700">
              <div className="font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>You can ask me about:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <span className="flex items-center gap-1.5">• Attendance Policies</span>
                <span className="flex items-center gap-1.5">• Examination Rules</span>
                <span className="flex items-center gap-1.5">• Internal Assessment</span>
                <span className="flex items-center gap-1.5">• Assignment Submissions</span>
                <span className="flex items-center gap-1.5">• Fee Payments & Fines</span>
                <span className="flex items-center gap-1.5">• Merit Scholarships</span>
                <span className="flex items-center gap-1.5">• Library Loan Rules</span>
                <span className="flex items-center gap-1.5">• Hostel Curfews & Leaves</span>
                <span className="flex items-center gap-1.5">• Medical Leaves</span>
                <span className="flex items-center gap-1.5">• Student Conduct</span>
                <span className="flex items-center gap-1.5">• Anti-Ragging Mandates</span>
                <span className="flex items-center gap-1.5">• Placement & Internships</span>
              </div>
            </div>

            {/* Assistant rules reassurance */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100">
              <span className="text-slate-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                Answers are grounded in official guidelines without guessing.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenHandbook}
                  className="text-xs font-medium text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  View Policy Directory
                </button>
                <button
                  onClick={onOpenContacts}
                  className="text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  Department Directory
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Thread */}
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs transition-all ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-4 mb-1.5">
                  <span className={`text-[11px] font-semibold tracking-wide ${isUser ? 'text-blue-100' : 'text-slate-500'}`}>
                    {isUser ? 'Student' : 'College Policy Assistant'}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${isUser ? 'text-blue-200' : 'text-slate-400'}`}>
                      {message.timestamp}
                    </span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
                        title="Copy policy answer"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                {isUser ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                    {message.content}
                  </p>
                ) : (
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                    <div className="markdown-body prose prose-slate max-w-none text-xs sm:text-sm [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>p]:mb-2 [&>strong]:font-semibold [&>strong]:text-slate-900">
                      <Markdown>{message.content}</Markdown>
                    </div>

                    {/* Official verification reminder tag for assistant */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-blue-500" />
                        Official Handbook Grounding
                      </span>
                      <span>Apex University Policy Framework</span>
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex gap-3 sm:gap-4 justify-start">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs max-w-[70%]">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
                <span>Consulting college policy regulations...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts bar */}
      <div className="px-4 sm:px-6 py-2 border-t border-slate-200/60 bg-white/70 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Popular:
          </span>
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(qp)}
              disabled={isLoading}
              className="text-[11px] text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap transition-all shrink-0 cursor-pointer disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Area */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-3.5 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-end gap-2">
            <div className="flex-1 relative rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 bg-white transition-all">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask about attendance, exam rules, internal marks, hostel, fees, scholarships, or conduct..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent resize-none focus:outline-none max-h-32"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              id="btn-send-message"
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all shrink-0 shadow-sm cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Verification Disclaimer */}
          <div className="mt-2 text-center">
            <p className="text-[10px] text-slate-400">
              Disclaimer: Policy answers are advisory. For formal appeals, medical waivers, or official records, please contact your department or the Registrar's Office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
