import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  PhoneCall, 
  RotateCcw, 
  ShieldCheck, 
  Info
} from 'lucide-react';
import { COLLEGE_NAME, ACADEMIC_YEAR } from '../data/policyHandbook';

interface HeaderProps {
  onOpenHandbook: () => void;
  onOpenContacts: () => void;
  onClearChat: () => void;
  messageCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHandbook,
  onOpenContacts,
  onClearChat,
  messageCount
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-100 tracking-tight">
                College Policy Assistant
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Handbook AI
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>{COLLEGE_NAME}</span>
              <span>•</span>
              <span className="text-slate-500">Session {ACADEMIC_YEAR}</span>
            </p>
          </div>
        </div>

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-open-handbook"
            onClick={onOpenHandbook}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-98 border border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            title="Browse full official policy handbook"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Policy Directory</span>
          </button>

          <button
            id="btn-open-contacts"
            onClick={onOpenContacts}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-98 border border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            title="Department and Emergency Contacts"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dept Contacts</span>
          </button>

          {messageCount > 1 && (
            <button
              id="btn-clear-chat"
              onClick={onClearChat}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
