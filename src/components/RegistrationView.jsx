import React, { useState, useEffect } from 'react';
import { Clock, MapPin, User, Info } from 'lucide-react';
import { supabase } from '../supabaseClient'; // ต้องแน่ใจว่าสร้างไฟล์ supabaseClient.js ไว้ถูกตำแหน่ง

const RegistrationView = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก Database ทันทีเมื่อหน้าเว็บโหลด
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      if (data) setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสลับสถานะลงทะเบียน อัปเดตลง Database และ UI
  const toggleRegistration = async (id) => {
    const course = courses.find(c => c.id === id);
    if (!course || course.status === 'full') return;

    const isRegistering = course.status === 'available';
    const newStatus = isRegistering ? 'registered' : 'available';
    const newEnrolled = isRegistering ? course.enrolled + 1 : course.enrolled - 1;

    // อัปเดต UI ทันทีเพื่อให้ผู้ใช้รู้สึกว่าระบบทำงานเร็ว (Optimistic UI Update)
    setCourses(courses.map(c => 
      c.id === id ? { ...c, status: newStatus, enrolled: newEnrolled } : c
    ));

    try {
      // ส่งคำสั่งอัปเดตไปที่ Database
      const { error } = await supabase
        .from('courses')
        .update({ status: newStatus, enrolled: newEnrolled })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating registration:', error.message);
      alert('เกิดข้อผิดพลาดในการลงทะเบียน โปรดลองรีเฟรชหน้าเว็บ');
      // หากพัง ให้ดึงข้อมูลที่ถูกต้องกลับมาใหม่
      fetchCourses();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-cyan-400 animate-pulse">กำลังโหลดข้อมูลจากคลังเวทมนตร์...</p>
      </div>
    );
  }

  // คัดกรองและจัดกลุ่มข้อมูลสำหรับแสดงผล
  const registeredCourses = courses.filter(c => c.status === 'registered');
  const nextClass = registeredCourses[0]; 

  const groupedByDate = registeredCourses.reduce((acc, course) => {
    if (!acc[course.date]) acc[course.date] = [];
    acc[course.date].push(course);
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      
      {/* ---------------- ส่วนที่ 1: การ์ดลงทะเบียน (ด้านบน) ---------------- */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">ลงทะเบียนเรียน</h1>
        <p className="text-[#8b95a5] text-sm">เลือกรายวิชาที่ต้องการศึกษาในภาคเรียนนี้</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {courses.filter(c => c.status !== 'registered').map(course => (
          <div key={course.id} className="bg-[#0b1221] border border-[#1e293b] rounded-2xl p-5 relative flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-800">{course.date}</span>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-lg font-bold ${course.color}`}>✨ {course.title}</h3>
                <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700">{course.sec}</span>
              </div>
              <p className="text-[#8b95a5] text-xs leading-relaxed h-8">{course.desc}</p>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#64748b]"><Clock size={14} /><span>{course.time}</span></div>
              <div className="flex items-center gap-2 text-xs text-[#64748b]"><MapPin size={14} /><span>{course.room}</span></div>
              <div className="flex items-center gap-2 text-xs text-[#64748b]"><User size={14} /><span className="text-purple-300">{course.prof}</span></div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#8b95a5]">จำนวนผู้ลงทะเบียน</span>
                <span className="font-bold text-white">{course.enrolled}/{course.max} คน</span>
              </div>
              <div className="w-full bg-[#1e293b] rounded-full h-1.5 mb-4">
                <div className="h-1.5 rounded-full bg-cyan-400" style={{ width: `${(course.enrolled / course.max) * 100}%` }}></div>
              </div>
              <button 
                onClick={() => toggleRegistration(course.id)} 
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-400 text-black font-bold py-2.5 rounded-xl transition-all"
              >
                ลงทะเบียน
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- ส่วนที่ 2: ตารางเรียน SEC ของฉัน (ด้านล่าง) ---------------- */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white border-b border-[#1e293b] pb-2 inline-block">ตารางเรียน SEC ของฉัน</h2>
      </div>

      {registeredCourses.length > 0 ? (
        <div className="space-y-8">
          
          {/* คลาสถัดไป (Next Class) */}
          {nextClass && (
            <div className="bg-[#0b1221] border border-teal-900/50 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(20,184,166,0.1)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
              
              <p className="text-teal-400 text-xs tracking-wider mb-4 font-semibold">คลาสถัดไป</p>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-xl font-bold ${nextClass.color}`}>✨ {nextClass.title}</h3>
                    <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700">{nextClass.sec}</span>
                  </div>
                  <p className="text-[#8b95a5] text-sm">{nextClass.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-teal-300 font-bold text-lg">{nextClass.time}</p>
                  <p className="text-[#64748b] text-xs">{nextClass.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6 text-sm text-[#8b95a5]">
                <div className="flex items-center gap-2"><MapPin size={16} /><span>{nextClass.room}</span></div>
                <div className="flex items-center gap-2"><User size={16} /><span className="text-purple-300">{nextClass.prof}</span></div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleRegistration(nextClass.id)}
                  className="bg-transparent hover:bg-red-950 text-white hover:text-red-400 border border-[#1e293b] hover:border-red-900 font-bold py-2 px-6 rounded-lg transition-all text-sm"
                >
                  ยกเลิกการลงทะเบียน
                </button>
                <span className="text-xs text-[#64748b] flex items-center gap-1">
                  <Info size={14} /> ยกเลิกได้ก่อนเวลาเรียนอย่างน้อย 3 ชั่วโมง
                </span>
              </div>
            </div>
          )}

          {/* ไทม์ไลน์รายวัน */}
          <div className="space-y-6">
            {Object.keys(groupedByDate).map((date, index) => (
              <div key={index} className="bg-[#0b1221] border border-[#1e293b] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-amber-500 mb-6 pb-2 border-b border-[#1e293b]">{date}</h3>
                
                <div className="space-y-6 relative">
                  <div className="absolute left-[88px] top-2 bottom-2 w-px bg-[#1e293b]"></div>

                  {groupedByDate[date].map((course, idx) => (
                    <div key={idx} className="flex items-start gap-6 relative z-10 group">
                      
                      <div className="w-[64px] text-right shrink-0 pt-1">
                        <span className="text-cyan-400 font-mono text-sm font-bold">{course.time}</span>
                      </div>

                      <div className="shrink-0 pt-1.5 relative">
                        <div className="absolute -left-[5px] top-1/2 -translate-y-1/2">
                          <div className={`w-3 h-3 rounded-full border-2 ${course.dotColor} bg-[#0b1221]`}></div>
                        </div>
                      </div>

                      <div className="flex-1 flex justify-between items-center bg-[#111827] group-hover:bg-[#151e32] border border-[#1e293b] rounded-xl p-4 transition-colors">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-base font-bold ${course.color}`}>✨ {course.title}</h4>
                            <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700">{course.sec}</span>
                          </div>
                          <p className="text-[#8b95a5] text-xs">
                            {course.desc} · <span className="text-purple-300">{course.prof}</span>
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-6 text-right">
                          <div className="text-xs text-[#64748b] hidden md:flex items-center gap-1 justify-end">
                            <MapPin size={12} /> {course.room}
                          </div>
                          <button 
                            onClick={() => toggleRegistration(course.id)}
                            className="bg-transparent hover:bg-red-950 text-[#8b95a5] hover:text-red-400 border border-[#1e293b] hover:border-red-900 py-1.5 px-4 rounded-lg transition-all text-xs font-bold"
                          >
                            ยกเลิก
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      ) : (
        <div className="bg-[#0b1221] border border-[#1e293b] rounded-2xl p-8 text-center text-[#64748b]">
          <p>คุณยังไม่ได้ลงทะเบียนรายวิชาใดๆ ในภาคเรียนนี้</p>
        </div>
      )}
      
    </div>
  );
};

export default RegistrationView;