import React from 'react';
import { Sparkles, Star } from 'lucide-react';

export default function RateCard() {
  const packages = [
    {
      id: 1,
      title: 'โพสต์, รูปภาพ, ภาพนิ่ง',
      description: 'เริ่มต้นที่โพสต์ละ 500 บาท เพิ่มช่องทางในการโพสต์ช่องละ 200 บาท ช่องทางการโปรโมทคือ Facebook, Tiktok และ Youtube',
      price: 'เริ่มต้น 500.-',
      icon: '📸'
    },
    {
      id: 2,
      title: 'คลิปสั้นไม่เกิน 1นาที',
      description: 'เริ่มต้นที่โพสต์ละ 2,500 บาท เพิ่มช่องทางในการโพสต์ช่องทางละ 500 บาท ช่องทางการโปรโมทคือ Facebook, Tiktok และ Youtube หากต้องการซื้อเนื้อหาไม่ใช้ทางการค้าเพิ่มที่ 1,500 บาท (Gen codeฟรี)',
      price: 'เริ่มต้น 2,500.-',
      icon: '🎬'
    },
    {
      id: 3,
      title: 'ค่าเดินทาง (ถ้ามี)',
      description: 'ในกรณีนี้ต้องมีการถ่ายทำในสถานที่ที่จัดเตรียมไว้ จะค่าใช้จ่ายทางเพิ่มเติม500บาทในกรุงเทพและปริมณฑล ส่วนต่างจังหวัดขึ้นอยู่กับระยะทาง',
      price: 'เริ่มต้น 500.-',
      icon: '📹'
    }
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF0000">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const socialLinks = [
    { 
      platform: 'facebook', 
      label: 'DUKDIK_ดุ๊กดิ๊ก(4.2หมื่นผู้ติดตาม)', 
      color: 'from-blue-500 to-blue-600'
    },
    { 
      platform: 'tiktok', 
      label: 'REAL_DUKDIK(4.1หมื่นผู้ติดตาม)', 
      color: 'from-gray-800 to-black'
    },
    { 
      platform: 'youtube', 
      label: 'DUKDIK_ดุ๊กดิ๊ก(4.1หมื่นผู้ติดตาม)', 
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      {/* Professional decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-100 rounded-full filter blur-3xl opacity-15 md:opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-slate-100 rounded-full filter blur-3xl opacity-10 md:opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-indigo-50 rounded-full filter blur-3xl opacity-10 md:opacity-15"></div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-6">
         {/* Logo */}
         <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-lg border-4 border-white transform hover:scale-110 transition-transform">
                <img 
                  src="/DukDik_logo.jpeg" 
                  alt="DUKDIK Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-2 rounded-full shadow-md mb-4 transform hover:scale-105 transition-transform">
            <span className="font-semibold text-sm tracking-wide">DUKDIKดุ๊กดิ๊ก</span>
          </div>
      
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-2">
            Rate Card
          </h1>
        </header>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 hover:border-blue-300 relative overflow-hidden group flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 opacity-40 rounded-bl-full"></div>
              
              {/* Icon badge */}
              <div className="absolute -top-3 -right-3 bg-blue-800 w-12 h-12 rounded-full flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform">
                <span className="text-2xl">{pkg.icon}</span>
              </div>

              <div className="mb-3 flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-blue-800">
                    {pkg.id}.
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800 leading-tight">{pkg.title}</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mt-2">
                  {pkg.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="bg-blue-800 text-white px-4 py-2.5 rounded-lg text-center font-semibold text-sm shadow-sm hover:bg-blue-900 transition-colors">
                  {pkg.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Social Links */}
        <footer className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col items-center gap-4">
            {/* Social Links */}
            <div className="w-full space-y-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center gap-3 bg-gradient-to-r ${social.color} text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                    {getSocialIcon(social.platform)}
                  </div>
                  <span className="font-semibold text-sm flex-1">{social.label}</span>
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}