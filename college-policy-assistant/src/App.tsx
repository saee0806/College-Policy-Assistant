/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { PolicyDirectoryModal } from './components/PolicyDirectoryModal';
import { DepartmentContactsModal } from './components/DepartmentContactsModal';
import { ChatMessage, PolicyCategory, DepartmentContact } from './types';
import { POLICY_CATEGORIES, DEPARTMENT_CONTACTS } from './data/policyHandbook';

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-welcome-0',
  role: 'assistant',
  content: `Hello! I am your **College Policy Assistant**. 

I'm here to provide clear, simple, accurate, and student-friendly information about your college policies and rules. You can ask me about:

• **Attendance Policies** & medical condonation limits
• **Examination Rules**, permitted materials & malpractice guidelines
• **Internal Assessments** & grade weightages
• **Assignment Deadlines** & Turnitin plagiarism checks
• **Fee Payment**, installments, late fines & refund schedules
• **Scholarship Criteria** & renewal conditions
• **Library Loan Quotas** & reading room rules
• **Hostel Curfews**, leave passes & resident conduct
• **Medical Leaves** & doctor's certificate requirements
• **Student Code of Conduct** & campus regulations
• **Zero-Tolerance Anti-Ragging Mandate** & 24/7 emergency support
• **Placement & Internship Policies** (One Student, One Job rule)

How can I assist you with college guidelines today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const [categories] = useState<PolicyCategory[]>(POLICY_CATEGORIES);
  const [contacts] = useState<DepartmentContact[]>(DEPARTMENT_CONTACTS);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Send conversation history to server-side Gemini endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data.response || "I don't have confirmed information about this policy. Please contact your college administration or the concerned department.";

      const assistantMsg: ChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([...updatedMessages, assistantMsg]);
    } catch (error) {
      console.error('Failed to get answer:', error);
      const errorMsg: ChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        role: 'assistant',
        content: "I don't have confirmed information about this policy. Please contact your college administration or the concerned department.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        error: true
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([{
      ...INITIAL_GREETING,
      id: `msg-welcome-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleSelectDepartmentForChat = (deptName: string) => {
    handleSendMessage(`What are the key policies and procedures handled by the ${deptName}?`);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 text-slate-900 font-sans overflow-hidden">
      {/* Top Header */}
      <Header
        onOpenHandbook={() => setIsHandbookOpen(true)}
        onOpenContacts={() => setIsContactsOpen(true)}
        onClearChat={handleClearChat}
        messageCount={messages.length}
      />

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          onOpenHandbook={() => setIsHandbookOpen(true)}
          onOpenContacts={() => setIsContactsOpen(true)}
        />
      </main>

      {/* Policy Directory Modal */}
      <PolicyDirectoryModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
        categories={categories}
        onSelectPrompt={(prompt) => {
          handleSendMessage(prompt);
        }}
      />

      {/* Department Contacts Modal */}
      <DepartmentContactsModal
        isOpen={isContactsOpen}
        onClose={() => setIsContactsOpen(false)}
        contacts={contacts}
        onSelectDepartmentForChat={handleSelectDepartmentForChat}
      />
    </div>
  );
}
