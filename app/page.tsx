'use client';

import { useEffect, useState } from "react";
import { Sparkles } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';

export default function RateCard() {
  const { data, loading, error } = useAppSelector((state) => state.followers);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [Facebook, setFacebook] = useState<SocialMedia | null>(null);
  const [Tiktok, setTiktok] = useState<SocialMedia | null>(null);
  const [Youtube, setYoutube] = useState<SocialMedia | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  type Package = {
    id: string;
    title: string;
    description: string;
    price: number;
    icon: string;
  };
  
  interface SocialMedia {
    id: string;
    social_media: string;
    chanel_name: string;
    link: string;
    follower_count: number;
  }

  // Anime Loading Animation
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    const timer2 = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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

  useEffect(() => {
    fetch("/api/social_media")
      .then(res => res.json())
      .then(data => {
        setFacebook(data[0])
        setTiktok(data[1])
        setYoutube(data[2])
      })
  }, []);
  
  const getSocialLinks = () => {
    const links = [
      {
        platform: 'facebook' as const,
        label: Facebook?.chanel_name && Facebook.follower_count
          ? `${Facebook.chanel_name}(${formatFollowerCount(Facebook.follower_count)}ผู้ติดตาม)`
          : 'DUKDIK_ดุ๊กดิ๊ก(กำลังโหลด...)',
        color: 'from-blue-500 to-blue-600',
        link: Facebook?.link
      },
      {
        platform: 'tiktok' as const,
        label: Tiktok?.chanel_name && data.tiktok?.count
          ? `${Tiktok.chanel_name}(${formatFollowerCount(data.tiktok.count)}ผู้ติดตาม)`
          : 'REAL_DUKDIK(กำลังโหลด...)',
        color: 'from-gray-800 to-black',
        link: Tiktok?.link
      },
      {
        platform: 'youtube' as const,
        label: Youtube?.chanel_name && data.youtube?.count
          ? `${Youtube.chanel_name}(${formatFollowerCount(data.youtube.count)}ผู้ติดตาม)`
          : 'DUKDIK_ดุ๊กดิ๊ก(กำลังโหลด...)',
        color: 'from-red-500 to-red-600',
        link: Youtube?.link
      }
    ];
    return links;
  };

  const socialLinks = getSocialLinks();

  return (
    <>
      {/* Anime Loading Screen */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 transition-opacity duration-500 ${
          showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Anime Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <defs>
              <pattern id="anime-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Manga Speech Bubble */}
                <circle cx="25" cy="25" r="15" fill="white" opacity="0.3"/>
                <circle cx="20" cy="30" r="3" fill="white" opacity="0.3"/>
                <circle cx="15" cy="35" r="2" fill="white" opacity="0.3"/>
                
                {/* Star */}
                <path d="M75 15 L77 22 L84 22 L78 27 L81 34 L75 29 L69 34 L72 27 L66 22 L73 22 Z" fill="white" opacity="0.3"/>
                
                {/* Heart */}
                <path d="M50 65 Q50 55 58 55 Q65 55 65 62 Q65 55 73 55 Q80 55 80 65 Q80 75 65 85 Q50 75 50 65 Z" fill="white" opacity="0.2"/>
                
                {/* Lightning Bolt */}
                <path d="M25 70 L30 70 L22 85 L27 85 L20 95 L23 82 L18 82 Z" fill="white" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#anime-pattern)"/>
          </svg>
        </div>

        <div className="relative">
          {/* Sparkle effects */}
          <div className="absolute -top-10 -left-10 w-4 h-4 bg-white rounded-full animate-ping"></div>
          <div className="absolute -top-5 -right-5 w-3 h-3 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute -bottom-8 left-5 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-0 -right-10 w-3 h-3 bg-indigo-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
          
          {/* Main DUKDIK Logo */}
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            {/* Rotating rings */}
            <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 border-4 border-cyan-300/40 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 border-4 border-blue-300/30 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
            
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white shadow-2xl flex items-center justify-center transform animate-float overflow-hidden p-2">
                <img 
                  src="/DukDik_logo.jpeg" 
                  alt="DUKDIK Loading" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          
          {/* Loading text */}
          <div className="mt-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse">
              Loading...
            </h2>
            <p className="text-white/80 text-sm mb-3">กำลังโหลด Rate Card</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
            {[
              { top: 10, left: 20, icon: '⭐', color: 'text-yellow-300' },
              { top: 30, left: 80, icon: '✨', color: 'text-cyan-300' },
              { top: 50, left: 15, icon: '💫', color: 'text-blue-300' },
              { top: 70, left: 85, icon: '🌟', color: 'text-white' },
              { top: 75, left: 75, icon: '💙', color: 'text-blue-200' },
              { top: 40, left: 90, icon: '✨', color: 'text-cyan-200' },
              { top: 60, left: 25, icon: '⭐', color: 'text-white' }
            ].map((item, i) => (
              <div
                key={i}
                className={`absolute ${item.color} text-2xl animate-float`}
                style={{
                  top: `${item.top}%`,
                  left: `${item.left}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + (i % 3)}s`
                }}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-100 to-slate-50 relative overflow-hidden transition-all duration-1000 ${
          animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Floating anime elements */}
        
<div className="absolute top-60 left-20 w-12 h-12 animate-float-slow opacity-20">
  <img
    src="/anime-away-face-svgrepo-com.svg"
    alt="Anime Away Face"
    className="w-full h-full object-contain text-blue-500"
  />
</div>
        <div className="absolute top-10 left-10 text-4xl animate-float-slow opacity-20">🎌</div>
        <div
  className="absolute top-20 right-20 text-3xl animate-float-slow opacity-20"
  style={{ animationDelay: '1s' }}
>
  <img
    src="/gundam.png"
    alt="Anime"
    className="w-18 h-18 object-contain animate-spin-slow" // <-- ลดขนาดที่นี่
  />
</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute bottom-32 right-32 text-4xl animate-float-slow opacity-20" style={{ animationDelay: '0.5s' }}>🎌</div>
        
        {/* Professional decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-100 rounded-full filter blur-3xl opacity-15 md:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-slate-100 rounded-full filter blur-3xl opacity-10 md:opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-indigo-50 rounded-full filter blur-3xl opacity-10 md:opacity-15"></div>

        <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
          {/* Header */}
          <header className="text-center mb-6">
            {/* Logo with anime effect */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
                {/* Rotating ring around logo */}
                <div className="absolute inset-0 border-4 border-blue-300/40 rounded-full animate-spin-slow"></div>
                <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-lg border-4 border-white transform hover:scale-110 transition-transform animate-float">
                  <img 
                    src="/DukDik_logo.jpeg" 
                    alt="DUKDIK Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Sparkles around logo */}
                <div className="absolute -top-2 -right-2 text-2xl animate-ping">✨</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-ping" style={{ animationDelay: '0.5s' }}>⭐</div>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md mb-4 transform hover:scale-105 transition-transform animate-shimmer">
              <span className="font-semibold text-sm tracking-wide">DUKDIKดุ๊กดิ๊ก</span>
             
            </div>
        
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-2 animate-slide-up">
              Rate Card
            </h1>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2 mt-4">
  <div className="w-20 h-1 bg-gradient-to-r from-transparent to-blue-400 rounded animate-expand"></div>
  <div className="w-8 h-8 flex items-center justify-center">
    <img 
      src="/pokeball.png" 
      alt="Anime" 
      className="w-full h-full object-contain animate-spin-slow"
    />
  </div>
  <div className="w-20 h-1 bg-gradient-to-l from-transparent to-blue-400 rounded animate-expand"></div>
</div>
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
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 hover:border-pink-300 relative overflow-hidden group flex flex-col h-full animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Anime sparkle effect on hover */}
                <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute top-2 right-2 text-blue-400 animate-ping">✨</div>
                  <div className="absolute top-5 right-8 text-cyan-400 animate-ping" style={{ animationDelay: '0.2s' }}>⭐</div>
                  <div className="absolute top-8 right-4 text-blue-500 animate-ping" style={{ animationDelay: '0.6s' }}>🌟</div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-40 rounded-bl-full"></div>
                
                {/* Icon badge with anime effect */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-blue-500 to-blue-700 w-12 h-12 rounded-full flex items-center justify-center shadow-md transform group-hover:rotate-12 group-hover:scale-110 transition-all">
                  <span className="text-2xl animate-bounce">{pkg.icon}</span>
                </div>

                <div className="mb-3 flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {index+1}.
                    </span>
                    <h2 className="text-lg font-semibold text-gray-800 leading-tight">{pkg.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mt-2">
                    {pkg.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2.5 rounded-lg text-center font-semibold text-sm shadow-sm hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105">
                    {pkg.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer with Social Links */}
          <footer className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-slide-up" style={{ animationDelay: '600ms' }}>
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
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 bg-gradient-to-r ${social.color} text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden`}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform relative z-10">
                      {getSocialIcon(social.platform)}
                    </div>
                    <span className="font-semibold text-sm flex-1 relative z-10">{social.label}</span>
                    <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: -200% center; }
          50% { background-position: 200% center; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
      `}</style>
    </>
  );
}