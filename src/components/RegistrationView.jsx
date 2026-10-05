import React, { useState } from 'react';

const RegistrationView = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'วิชาปรุงยา', sec: 'SEC 1', desc: 'บทที่ 3 - สสารและการเปลี่ยนแปลงของวัตถุดิบ', date: 'พุธ 07 ต.ค. 2569', time: '22:00-22:30', room: 'ห้องปรุงยา ตึกหอพัก', prof: 'Marshal', enrolled: 24, max: 60, status: 'available', type: 'potion' },
    { id: 2, title: 'วิชาคาถา', sec: 'SEC 4', desc: 'บทที่ 3 - ทฤษฎีสนามพลังเวทมนตร์และการแปลสภาพสสาร', date: 'พุธ 07 ต.ค. 2569', time: '22:30-23:00', room: 'อาคารตรี ชั้น2 ห้อง Prof. Morel', prof: 'Claudia Morel', enrolled: 56, max: 60, status: 'registered', type: 'spell' },
    { id: 3, title: 'วิชาแปลงร่าง', sec: 'SEC 2', desc: 'บทที่ 1 - พื้นฐานการเปลี่ยนรูปลักษณ์', date: 'พฤหัส 08 ต.ค. 2569', time: '20:00-21:00', room: 'ลานฝึกซ้อมเวท', prof: 'Zeypher', enrolled: 65, max: 65, status: 'full', type: 'transmorph' },
  ]);

  const toggleRegistration = (id) => {
    setCourses(courses.map(course => {
      if (course.id === id && course.status !== 'full') {
        const isRegistering = course.status === 'available';
        return {
          ...course,
          status: isRegistering ? 'registered' : 'available',
          enrolled: isRegistering ? course.enrolled + 1 : course.enrolled - 1
        };
      }
      return course;
    }));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">ลงทะเบียนเรียน</h1>
        <p className="text-[#8b95a5] text-sm">เลือกรายวิชาที่ต้องการศึกษาในภาคเรียนนี้</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-[#0b1221] border border-[#1e293b] rounded-2xl p-5 hover:border-[#334155] transition-colors relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-800">
                {course.date}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">{course.title}</h3>
                <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700">{course.sec}</span>
              </div>
              <p className="text-[#8b95a5] text-xs leading-relaxed h-8">{course.desc}</p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <span className="w-4 flex justify-center">🕒</span>
                <span>{course.time}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <span className="w-4 flex justify-center">🏛️</span>
                <span>{course.room}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <span className="w-4 flex justify-center">🧙‍♂️</span>
                <span className="text-purple-300">{course.prof}</span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#8b95a5]">จำนวนผู้ลงทะเบียน</span>
                <span className="font-bold text-white">{course.enrolled}/{course.max} คน</span>
              </div>
              <div className="w-full bg-[#1e293b] rounded-full h-1.5 mb-4">
                <div 
                  className={`h-1.5 rounded-full ${course.status === 'full' ? 'bg-red-500' : 'bg-cyan-400'}`}
                  style={{ width: `${(course.enrolled / course.max) * 100}%` }}
                ></div>
              </div>

              {course.status === 'available' && (
                <button 
                  onClick={() => toggleRegistration(course.id)}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold py-2.5 rounded-xl transition-all"
                >
                  ลงทะเบียน
                </button>
              )}
              {course.status === 'registered' && (
                <div className="space-y-2">
                  <div className="w-full bg-cyan-900/40 border border-cyan-800 text-cyan-400 font-bold py-2.5 rounded-xl text-center text-sm">
                    ลงทะเบียนแล้ว
                  </div>
                  <button 
                    onClick={() => toggleRegistration(course.id)}
                    className="w-full bg-transparent hover:bg-red-950 text-[#8b95a5] hover:text-red-400 border border-[#1e293b] hover:border-red-900 font-bold py-2 rounded-xl transition-all text-xs"
                  >
                    ยกเลิกการลงทะเบียน
                  </button>
                </div>
              )}
              {course.status === 'full' && (
                <button disabled className="w-full bg-[#1e293b] text-[#64748b] font-bold py-2.5 rounded-xl cursor-not-allowed">
                  ที่นั่งเต็ม
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationView;