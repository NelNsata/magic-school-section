import React, { useState } from 'react';
import { Users, BookOpen, Clock, MapPin, Plus, Edit, Search, UserCheck } from 'lucide-react';

const ProfDashboardView = () => {
  // ข้อมูลจำลองรายวิชาที่อาจารย์ท่านนี้สอน
  const [myClasses, setMyClasses] = useState([
    { 
      id: 1, 
      title: 'วิชาปรุงยา', 
      sec: 'SEC 1', 
      date: 'พุธ', 
      time: '20:00-20:30', 
      room: 'ห้องปรุงยา ตึกหอพัก', 
      enrolled: 24, 
      max: 60, 
      status: 'open'
    },
    { 
      id: 2, 
      title: 'วิชาปรุงยา', 
      sec: 'SEC 3', 
      date: 'จันทร์', 
      time: '20:00-20:30', 
      room: 'ห้องปรุงยา ตึกหอพัก', 
      enrolled: 60, 
      max: 60, 
      status: 'full'
    },
  ]);

  // ข้อมูลจำลองรายชื่อนักศึกษาในคลาส
  const mockStudents = [
    { id: 'AAU-EX-8744', name: 'Nox Von Lienhaber', house: 'Aeroquill', year: 1 },
    { id: 'AAU-EX-8745', name: 'Ahna Theresa Sepheria', house: 'Terracroft', year: 1 },
    { id: 'AAU-EX-8746', name: 'Erika Rosella', house: 'Serpentide', year: 1 },
    { id: 'AAU-EX-8747', name: 'Matthew Louis Sater', house: 'Pyrefell', year: 1 },
  ];

  const [selectedSec, setSelectedSec] = useState(null);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">จัดการกลุ่มเรียน (SEC)</h1>
          <p className="text-[#8b95a5] text-sm">ตรวจสอบและจัดการรายวิชาที่คุณรับผิดชอบสอน</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(147,51,234,0.3)]">
          <Plus size={16} /> เปิดกลุ่มเรียนใหม่
        </button>
      </div>

      {/* สถิติภาพรวมอาจารย์ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0b1221] border border-purple-900/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-[#8b95a5] text-xs uppercase tracking-wider mb-1">กลุ่มเรียนทั้งหมด</p>
            <p className="text-2xl font-bold text-white">2 SEC</p>
          </div>
        </div>
        <div className="bg-[#0b1221] border border-cyan-900/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[#8b95a5] text-xs uppercase tracking-wider mb-1">นักศึกษาในความดูแล</p>
            <p className="text-2xl font-bold text-white">84 คน</p>
          </div>
        </div>
        <div className="bg-[#0b1221] border border-emerald-900/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-[#8b95a5] text-xs uppercase tracking-wider mb-1">อัตราการเข้าเรียนเฉลี่ย</p>
            <p className="text-2xl font-bold text-white">95%</p>
          </div>
        </div>
      </div>

      {/* รายการวิชาที่สอน */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* คอลัมน์ซ้าย: การ์ดรายวิชา */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-purple-400 mb-4 uppercase tracking-widest border-b border-[#1e293b] pb-2">My Classes</h2>
          
          {myClasses.map(cls => (
            <div 
              key={cls.id} 
              onClick={() => setSelectedSec(cls)}
              className={`bg-[#0b1221] border rounded-xl p-4 cursor-pointer transition-all ${
                selectedSec?.id === cls.id 
                  ? 'border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.15)] bg-purple-900/10' 
                  : 'border-[#1e293b] hover:border-purple-900/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold">{cls.title}</h3>
                  <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded border border-purple-800">{cls.sec}</span>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#64748b]"><Clock size={12} /><span>{cls.date} {cls.time}</span></div>
                <div className="flex items-center gap-2 text-xs text-[#64748b]"><MapPin size={12} /><span>{cls.room}</span></div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8b95a5]">ผู้ลงทะเบียน</span>
                <span className={`font-bold ${cls.enrolled >= cls.max ? 'text-red-400' : 'text-cyan-400'}`}>
                  {cls.enrolled}/{cls.max}
                </span>
              </div>
              <div className="w-full bg-[#1e293b] rounded-full h-1 mt-1.5">
                <div 
                  className={`h-1 rounded-full ${cls.enrolled >= cls.max ? 'bg-red-500' : 'bg-cyan-400'}`} 
                  style={{ width: `${(cls.enrolled / cls.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* คอลัมน์ขวา: รายชื่อนักศึกษาใน SEC ที่เลือก */}
        <div className="lg:col-span-2">
          {selectedSec ? (
            <div className="bg-[#0b1221] border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-full">
              {/* Header รายชื่อ */}
              <div className="p-5 border-b border-[#1e293b] bg-[#111827] flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    รายชื่อนักศึกษา <span className="text-purple-400">| {selectedSec.title} {selectedSec.sec}</span>
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1">จำนวน {selectedSec.enrolled} คน</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-[#1e293b] hover:bg-purple-900/50 text-[#8b95a5] hover:text-purple-300 rounded-lg transition-colors" title="ค้นหา">
                    <Search size={16} />
                  </button>
                  <button className="p-2 bg-[#1e293b] hover:bg-purple-900/50 text-[#8b95a5] hover:text-purple-300 rounded-lg transition-colors" title="ตั้งค่าคลาส">
                    <Edit size={16} />
                  </button>
                </div>
              </div>

              {/* ตารางรายชื่อ */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f172a] text-[#64748b] text-xs uppercase tracking-wider border-b border-[#1e293b]">
                      <th className="p-4 font-semibold">รหัสนักศึกษา</th>
                      <th className="p-4 font-semibold">ชื่อ-นามสกุล</th>
                      <th className="p-4 font-semibold">บ้าน (House)</th>
                      <th className="p-4 font-semibold">ชั้นปี</th>
                      <th className="p-4 font-semibold text-right">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b]">
                    {mockStudents.map((student, idx) => (
                      <tr key={idx} className="hover:bg-[#111827] transition-colors">
                        <td className="p-4 text-xs font-mono text-cyan-400">{student.id}</td>
                        <td className="p-4 text-sm text-white">{student.name}</td>
                        <td className="p-4 text-xs">
                          <span className={`px-2 py-1 rounded border ${
                            student.house === 'Aeroquill' ? 'bg-blue-900/30 text-blue-300 border-blue-800' :
                            student.house === 'Terracroft' ? 'bg-amber-900/30 text-amber-300 border-amber-800' :
                            student.house === 'Serpentide' ? 'bg-emerald-900/30 text-emerald-300 border-emerald-800' :
                            'bg-red-900/30 text-red-300 border-red-800'
                          }`}>
                            {student.house}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-[#8b95a5]">ปี {student.year}</td>
                        <td className="p-4 text-right">
                          <button className="text-xs text-purple-400 hover:text-purple-300 hover:underline">ดูโปรไฟล์</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 text-center text-xs text-[#64748b] border-t border-[#1e293b] mt-auto">
                แสดง 4 จาก {selectedSec.enrolled} รายการ
              </div>
            </div>
          ) : (
            <div className="bg-[#0b1221] border border-[#1e293b] rounded-2xl h-full flex flex-col items-center justify-center text-[#64748b] min-h-[400px]">
              <Users size={48} className="mb-4 opacity-30" />
              <p>เลือก SEC ด้านซ้ายเพื่อดูรายชื่อนักศึกษา</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfDashboardView;