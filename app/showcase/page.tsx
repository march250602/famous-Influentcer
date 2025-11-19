'use client';

import { useEffect, useState } from "react";
import { Play, Eye, ThumbsUp, ExternalLink } from 'lucide-react';

export default function YouTubePortfolio() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  type Video = {
    id: string;
    title: string;
    thumbnail: string;
    views: number;
    likes: number;
    url: string;
    publishedAt: string;
  };

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
    fetch("/api/showcase")
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('ไม่สามารถโหลดข้อมูลวิดีโอได้');
        setLoading(false);
      });
   
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatViews = (count: number): string => {
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
                <circle cx="25" cy="25" r="15" fill="white" opacity="0.3"/>
                <circle cx="20" cy="30" r="3" fill="white" opacity="0.3"/>
                <circle cx="15" cy="35" r="2" fill="white" opacity="0.3"/>
                <path d="M75 15 L77 22 L84 22 L78 27 L81 34 L75 29 L69 34 L72 27 L66 22 L73 22 Z" fill="white" opacity="0.3"/>
                <path d="M50 65 Q50 55 58 55 Q65 55 65 62 Q65 55 73 55 Q80 55 80 65 Q80 75 65 85 Q50 75 50 65 Z" fill="white" opacity="0.2"/>
                <path d="M25 70 L30 70 L22 85 L27 85 L20 95 L23 82 L18 82 Z" fill="white" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#anime-pattern)"/>
          </svg>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -left-10 w-4 h-4 bg-white rounded-full animate-ping"></div>
          <div className="absolute -top-5 -right-5 w-3 h-3 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute -bottom-8 left-5 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-0 -right-10 w-3 h-3 bg-indigo-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
          
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 border-4 border-cyan-300/40 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 border-4 border-blue-300/30 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
            
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
          
          <div className="mt-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse">
              Loading...
            </h2>
            <p className="text-white/80 text-sm mb-3">กำลังโหลดผลงาน</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
            {[
              { top: 10, left: 20, icon: '⭐', color: 'text-yellow-300' },
              { top: 30, left: 80, icon: '✨', color: 'text-cyan-300' },
              { top: 50, left: 15, icon: '💫', color: 'text-blue-300' },
              { top: 70, left: 85, icon: '🌟', color: 'text-white' },
              { top: 20, left: 60, icon: '⚡', color: 'text-yellow-200' },
              { top: 80, left: 40, icon: '💙', color: 'text-blue-200' },
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
        <div className="absolute top-10 left-10 text-4xl animate-float-slow opacity-20">🎬</div>
        <div className="absolute top-20 right-20 text-3xl animate-float-slow opacity-20" style={{ animationDelay: '1s' }}>📹</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>🎥</div>
        <div className="absolute bottom-32 right-32 text-4xl animate-float-slow opacity-20" style={{ animationDelay: '0.5s' }}>✨</div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-100 rounded-full filter blur-3xl opacity-15 md:opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-slate-100 rounded-full filter blur-3xl opacity-10 md:opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-indigo-50 rounded-full filter blur-3xl opacity-10 md:opacity-15"></div>

        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 border-4 border-blue-300/40 rounded-full animate-spin-slow"></div>
                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white transform hover:scale-110 transition-transform animate-float">
                  <img 
                    src="/DukDik_logo.jpeg" 
                    alt="DUKDIK Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 text-2xl animate-ping">✨</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-ping" style={{ animationDelay: '0.5s' }}>⭐</div>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md mb-4 transform hover:scale-105 transition-transform">
              <span className="font-semibold text-sm tracking-wide">DUKDIKดุ๊กดิ๊ก</span>
              <span className="text-xl animate-bounce">🎬</span>
            </div>
        
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 animate-slide-up">
              ผลงานวิดีโอ YouTube
            </h1>
            <p className="text-gray-600 text-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
              รวมผลงานคลิปวิดีโอคุณภาพสูง พร้อมยอดวิวและไลค์จริง
            </p>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent to-blue-400 rounded animate-expand"></div>
              <div className="w-8 h-8 flex items-center justify-center">
                <Play className="w-full h-full text-blue-600 animate-pulse" />
              </div>
              <div className="w-20 h-1 bg-gradient-to-l from-transparent to-blue-400 rounded animate-expand"></div>
            </div>
          </header>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Loading State */}
            {loading && (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="flex gap-4 mt-3">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 font-medium">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            )}

            {/* Videos Content */}
            {!loading && !error && videos.map((video, index) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 hover:border-blue-300 overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                  {/* Sparkle effects on hover */}
                  
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem]">
                    {video.title}
                  </h3>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{formatViews(video.views)} ครั้ง</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{formatNumber(video.likes)}</span>
                    </div>
                  </div>

                  {/* External Link Icon */}
                  <div className="mt-3 flex items-center gap-1 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>ดูวิดีโอ</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white shadow-xl animate-slide-up" style={{ animationDelay: '800ms' }}>
            <h2 className="text-3xl font-bold mb-3">สนใจจ้างทำคลิปวิดีโอ?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              "DukDIk" พร้อมสร้างสรรค์คอนเทนต์คุณภาพ ด้วยประสบการณ์และผลงานจริง
            </p>
            <a 
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>ดู Rate Card</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
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