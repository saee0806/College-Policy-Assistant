import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Copy, 
  Check, 
  ShieldAlert, 
  Building 
} from 'lucide-react';
import { DepartmentContact } from '../types';

interface DepartmentContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: DepartmentContact[];
  onSelectDepartmentForChat?: (deptName: string) => void;
}

export const DepartmentContactsModal: React.FC<DepartmentContactsModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onSelectDepartmentForChat
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div 
        id="department-contacts-modal"
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                College Administration & Department Directory
              </h2>
              <p className="text-xs text-slate-400">
                Official contact points for regulations, condonation, fees, & emergencies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Official notifications and policy amendments are published on the Student ERP Noticeboard. In case of discrepancies or urgent approvals, reach out to the respective department during office hours.
          </p>
        </div>

        {/* Contacts List */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100">
          {contacts.map((contact) => (
            <div key={contact.id} className="pt-4 first:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {contact.department}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {contact.name} • <span className="text-blue-600">{contact.role}</span>
                  </p>
                </div>
                {onSelectDepartmentForChat && (
                  <button
                    onClick={() => {
                      onSelectDepartmentForChat(contact.department);
                      onClose();
                    }}
                    className="text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    Ask about {contact.department.split(' ')[0]} Policies
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(contact.email, `email-${contact.id}`)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="Copy Email"
                  >
                    {copiedId === `email-${contact.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{contact.phone}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(contact.phone, `phone-${contact.id}`)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="Copy Phone"
                  >
                    {copiedId === `phone-${contact.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{contact.officeLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{contact.officeHours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
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
