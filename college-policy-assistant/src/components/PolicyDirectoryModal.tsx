import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  GraduationCap,
  FileCheck,
  ClipboardList,
  CreditCard,
  Award,
  Home,
  CalendarCheck,
  ShieldAlert,
  AlertOctagon,
  Building2,
  Briefcase
} from 'lucide-react';
import { PolicyCategory, PolicyTopic } from '../types';

interface PolicyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: PolicyCategory[];
  onSelectPrompt: (promptText: string) => void;
}

// Icon mapper for categories
const ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-4 h-4 text-blue-500" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-indigo-500" />,
  FileCheck: <FileCheck className="w-4 h-4 text-emerald-500" />,
  ClipboardList: <ClipboardList className="w-4 h-4 text-amber-500" />,
  CreditCard: <CreditCard className="w-4 h-4 text-purple-500" />,
  Award: <Award className="w-4 h-4 text-amber-600" />,
  BookOpen: <BookOpen className="w-4 h-4 text-teal-500" />,
  Home: <Home className="w-4 h-4 text-orange-500" />,
  CalendarCheck: <CalendarCheck className="w-4 h-4 text-cyan-500" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-rose-500" />,
  AlertOctagon: <AlertOctagon className="w-4 h-4 text-red-600" />,
  Building2: <Building2 className="w-4 h-4 text-slate-600" />,
  Briefcase: <Briefcase className="w-4 h-4 text-blue-600" />
};

export const PolicyDirectoryModal: React.FC<PolicyDirectoryModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSelectPrompt
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || 'attendance');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();

    return categories.map(cat => {
      const matchedTopics = cat.topics.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.keyPoints.some(p => p.toLowerCase().includes(q)) ||
        t.suggestedQuestions.some(sq => sq.toLowerCase().includes(q))
      );
      return {
        ...cat,
        topics: matchedTopics
      };
    }).filter(cat => cat.topics.length > 0);
  }, [categories, searchQuery]);

  const activeCategory = useMemo(() => {
    return filteredCategories.find(c => c.id === selectedCategoryId) || filteredCategories[0];
  }, [filteredCategories, selectedCategoryId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div 
        id="policy-directory-modal"
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Official College Policy Handbook
              </h2>
              <p className="text-xs text-slate-400">
                Authorized regulatory reference guide & verified institutional guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policies (e.g., 75% attendance, Turnitin plagiarism, curfew, hall ticket, refund)..."
              className="w-full pl-9 pr-4 py-2 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Body Split */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Categories Sidebar */}
          <div className="md:col-span-4 border-r border-slate-200 overflow-y-auto bg-slate-50/70 p-3 space-y-1 max-h-[35vh] md:max-h-full">
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Categories ({filteredCategories.length})
            </div>
            {filteredCategories.length === 0 ? (
              <p className="text-xs text-slate-500 p-3">No matching policy categories found.</p>
            ) : (
              filteredCategories.map(cat => {
                const isSelected = activeCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setExpandedTopicId(null);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200/80 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {ICON_MAP[cat.icon] || <BookOpen className="w-4 h-4 text-slate-400" />}
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span className="text-[10px] bg-slate-200/70 text-slate-600 px-1.5 py-0.5 rounded-full">
                      {cat.topics.length}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Topics Details Panel */}
          <div className="md:col-span-8 overflow-y-auto p-5 space-y-4">
            {activeCategory ? (
              <div>
                <div className="mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    {ICON_MAP[activeCategory.icon]}
                    <h3 className="text-base font-semibold text-slate-900">
                      {activeCategory.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeCategory.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {activeCategory.topics.map((topic: PolicyTopic) => {
                    const isExpanded = expandedTopicId === topic.id;
                    return (
                      <div 
                        key={topic.id}
                        className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-800">
                              {topic.title}
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {topic.summary}
                            </p>
                          </div>
                          <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md shrink-0">
                            {topic.concernedDepartment.split('&')[0]}
                          </span>
                        </div>

                        {/* Regulations List */}
                        <div className="mt-3 space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Official Regulations:
                          </div>
                          <ul className="text-xs text-slate-700 space-y-1 pl-1">
                            {topic.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-slate-400">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Official Note */}
                        <div className="mt-2.5 flex items-start gap-2 text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-md border border-amber-200/50">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{topic.officialNote}</span>
                        </div>

                        {/* Suggested Prompt Buttons */}
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <div className="text-[11px] font-medium text-slate-500 mb-1.5">
                            Quick questions students ask:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.suggestedQuestions.map((sq, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  onSelectPrompt(sq);
                                  onClose();
                                }}
                                className="text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>{sq}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a category to view policy guidelines.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Grounding Source: Student Handbook & Academic Council Regulations 2025–26
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
