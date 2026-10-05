import React from 'react';

const LoreView = () => {
  const founders = [
    { id: 'pyrefell', houseEn: 'PYREFELL', nameEn: 'Ignis Pyrefell', accentColor: 'text-[#ff6b4a]', glowBorder: 'border-t-[#ff6b4a]', iconUrl: 'https://placehold.co/120x150/1a1a2e/ff6b4a?text=Pyrefell' },
    { id: 'serpentide', houseEn: 'SERPENTIDE', nameEn: 'Oceana Serpentide', accentColor: 'text-[#2de295]', glowBorder: 'border-t-[#2de295]', iconUrl: 'https://placehold.co/120x150/1a1a2e/2de295?text=Serpentide' },
    { id: 'terracroft', houseEn: 'TERRACROFT', nameEn: 'Sylas Terracroft', accentColor: 'text-[#e5c365]', glowBorder: 'border-t-[#e5c365]', iconUrl: 'https://placehold.co/120x150/1a1a2e/e5c365?text=Terracroft' },
    { id: 'aeroquill', houseEn: 'AEROQUILL', nameEn: 'Zephyr Aeroquill', accentColor: 'text-[#62d2ff]', glowBorder: 'border-t-[#62d2ff]', iconUrl: 'https://placehold.co/120x150/1a1a2e/62d2ff?text=Aeroquill' }
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">ตำนานสถาบัน</h1>
        <p className="text-[#8b95a5] text-sm">ปฐมบทแห่งออร่า-อาร์คาน่า</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {founders.map((founder) => (
          <div key={founder.id} className={`bg-[#0b1221] border border-[#1e293b] rounded-2xl p-6 flex flex-col items-center text-center border-t-4 ${founder.glowBorder} cursor-pointer hover:scale-105 transition-transform`}>
            <div className="w-32 h-40 mb-6 flex items-center justify-center">
              <img src={founder.iconUrl} alt={founder.nameEn} className="max-h-full object-contain rounded" />
            </div>
            <h4 className="text-[#8b95a5] text-xs tracking-[0.2em] mb-3 uppercase">{founder.houseEn}</h4>
            <h2 className={`text-xl font-bold mb-1 ${founder.accentColor}`}>{founder.nameEn}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoreView;