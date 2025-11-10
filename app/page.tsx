'use client';

import { useEffect, useState } from "react";
import { Sparkles } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';

export default function RateCard() {
  const { data, loading, error } = useAppSelector((state) => state.followers);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [packagesError, setPackagesError] = useState<string | null>(null);
 
  type Package = {
    id: string;
    title: string;
    description: string;
    price: number;
    icon: string;
  };

  useEffect(() => {
    setPackagesLoading(true);
    fetch("/api/packages")
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setPackagesLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPackagesError('ไม่สามารถโหลดข้อมูลแพ็คเกจได้');
        setPackagesLoading(false);
      });
  }, []);
 

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

  // ฟังก์ชันแปลงตัวเลขเป็นคำอ่านภาษาไทย
  const formatFollowerCount = (count: number): string => {
    if (count >= 10000) {
      const tenThousands = Math.floor(count / 10000);
      const remainder = count % 10000;
      if (remainder === 0) {
        return `${tenThousands}หมื่น`;
      } else {
        const thousands = Math.floor(remainder / 1000);
        if (thousands > 0) {
          return `${tenThousands}.${thousands}หมื่น`;
        }
        return `${tenThousands}หมื่น`;
      }
    } else if (count >= 1000) {
      const thousands = Math.floor(count / 1000);
      const remainder = count % 1000;
      if (remainder === 0) {
        return `${thousands}พัน`;
      } else {
        const hundreds = Math.floor(remainder / 100);
        if (hundreds > 0) {
          return `${thousands}.${hundreds}พัน`;
        }
        return `${thousands}พัน`;
      }
    }
    return `${count}`;
  };

  // สร้าง socialLinks จาก Redux store
  const getSocialLinks = () => {
    const links = [
      {
        platform: 'facebook' as const,
        label: data.facebook 
          ? `${data.facebook.label}(${formatFollowerCount(data.facebook.count)}ผู้ติดตาม)`
          : 'DUKDIK_ดุ๊กดิ๊ก(กำลังโหลด...)',
        color: 'from-blue-500 to-blue-600'
      },
      {
        platform: 'tiktok' as const,
        label: data.tiktok
          ? `${data.tiktok.label}(${formatFollowerCount(data.tiktok.count)}ผู้ติดตาม)`
          : 'REAL_DUKDIK(กำลังโหลด...)',
        color: 'from-gray-800 to-black'
      },
      {
        platform: 'youtube' as const,
        label: data.youtube
          ? `${data.youtube.label}(${formatFollowerCount(data.youtube.count)}ผู้ติดตาม)`
          : 'DUKDIK_ดุ๊กดิ๊ก(กำลังโหลด...)',
        color: 'from-red-500 to-red-600'
      }
    ];
    return links;
  };

  const socialLinks = getSocialLinks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-100 to-slate-50 relative overflow-hidden">
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
          {/* Loading State */}
          {packagesLoading && (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 relative overflow-hidden animate-pulse"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-100 rounded-bl-full"></div>
                  <div className="absolute -top-3 -right-3 bg-gray-200 w-12 h-12 rounded-full"></div>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Error State */}
          {packagesError && !packagesLoading && (
            <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-medium">{packagesError}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          )}

          {/* Packages Content */}
          {!packagesLoading && !packagesError && packages.map((pkg, index) => (
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
                    {index+1}.
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
            {/* Loading indicator */}
            {loading && (
              <div className="text-sm text-gray-500 mb-2">
                กำลังโหลดข้อมูลผู้ติดตาม...
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="text-sm text-red-500 mb-2">
                เกิดข้อผิดพลาด: {error}
              </div>
            )}

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
