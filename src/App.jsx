import React, { useState } from 'react';
import { Calendar, Home, Scroll, Settings, Book, Users, ShieldAlert } from 'lucide-react';

// นำเข้า Component ที่เราเพิ่งแยกไฟล์ไป
import DashboardView from './components/DashboardView';
import RegistrationView from './components/RegistrationView';
import LoreView from './components/LoreView';
import ProfDashboardView from './components/ProfDashboardView';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState('student');

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'แดชบอร์ด', role: 'all' },
    { id: 'registration', icon: Calendar, label: 'ลงทะเบียนเรียน', role: 'student' },
    { id: 'grades', icon: Book, label: 'หลักสูตร & เกรด', role: 'student' },
    { id: 'lore', icon: Scroll, label: 'ตำนานสถาบัน', role: 'all' },
  ];

  const profNavItems = [
    { id: 'prof-dashboard', icon: Users, label: 'จัดการกลุ่มเรียน (SEC)' },
    { id: 'prof-approve', icon: ShieldAlert, label: 'อนุมัติใบสมัคร' },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 font-sans flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0a0f1c]/90 backdrop-blur-md border-r border-[#1e293b] flex flex-col fixed h-full z-50">
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-200 to-amber-200">
              AURA
            </h1>
            <p className="text-xs tracking-[0.3em] text-[#8b95a5] mt-1">ARCANA</p>
          </div>

          <div className={`border rounded-lg p-3 text-center mb-4 shadow-inner ${
            userRole === 'professor' ? 'bg-purple-900/20 border-purple-800/50' : 'bg-[#111827] border-[#1e293b]'
          }`}>
            <p className="text-[10px] text-[#8b95a5] uppercase tracking-wider mb-1">สถานะบัญชี</p>
            <p className={`text-sm font-bold ${userRole === 'professor' ? 'text-purple-400' : 'text-white'}`}>
              {userRole === 'professor' ? 'ศาสตราจารย์ (Prof.)' : 'นักศึกษา'}
            </p>
          </div>

          <button 
            onClick={() => setUserRole(userRole === 'student' ? 'professor' : 'student')}
            className="w-full py-2 bg-[#5865F2]/20 hover:bg-[#5865F2]/40 text-[#5865F2] border border-[#5865F2]/50 rounded-lg text-xs font-bold transition-colors"
          >
            🔄 จำลองสลับยศ Discord
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] text-[#64748b] font-semibold tracking-wider uppercase mb-2 mt-2">เมนูหลัก</p>
          
          {navItems.filter(item => item.role === 'all' || item.role === userRole).map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                ${currentView === item.id 
                  ? 'bg-blue-900/40 text-blue-300 border border-blue-700/50' 
                  : 'text-[#8b95a5] hover:bg-[#1e293b]/50 hover:text-gray-200'
                }
              `}
            >
              <item.icon size={18} className={currentView === item.id ? 'text-blue-400' : 'text-[#64748b]'} />
              {item.label}
            </button>
          ))}

          {userRole === 'professor' && (
            <>
              <p className="px-3 text-[10px] text-purple-400 font-semibold tracking-wider uppercase mb-2 mt-6">หมวดหมู่อาจารย์</p>
              {profNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                    ${currentView === item.id 
                      ? 'bg-purple-900/40 text-purple-300 border border-purple-700/50' 
                      : 'text-[#8b95a5] hover:bg-[#1e293b]/50 hover:text-purple-200'
                    }
                  `}
                >
                  <item.icon size={18} className={currentView === item.id ? 'text-purple-400' : 'text-[#64748b]'} />
                  {item.label}
                </button>
              ))}
            </>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* เรียกใช้งาน Component ตามเมนูที่เลือก */}
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'registration' && <RegistrationView />}
          {currentView === 'lore' && <LoreView />}
          
          {currentView === 'prof-dashboard' && <ProfDashboardView />}
          
          {['grades', 'prof-approve'].includes(currentView) && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-[#64748b]">
              <div className="w-16 h-16 mb-4 bg-[#1e293b] rounded-full flex items-center justify-center animate-pulse">
                <Settings size={32} className="text-[#8b95a5]" />
              </div>
              <p className="text-lg">กำลังก่อสร้างหน้านี้</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}