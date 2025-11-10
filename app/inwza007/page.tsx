'use client';

import { useEffect,useState } from 'react';
import { Lock, User, Eye, EyeOff, LogOut, Edit2, Save, Plus, Trash2 } from 'lucide-react';

// Types
interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

interface SocialMedia {
  label: string;
  count: number;
}

interface Followers {
  facebook: SocialMedia;
  tiktok: SocialMedia;
  youtube: SocialMedia;
}

type PlatformKey = keyof Followers;

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
 
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetch("/api/packages")
      .then(res => res.json())
      .then(data => {
        // แปลง price ให้เหลือแค่ตัวเลข
        const formatted = data.map((pkg: Package) => ({
          ...pkg,
          price: parseInt(pkg.price.replace(/\D/g, ''), 10) // เอาเฉพาะตัวเลข
        }));
        setPackages(formatted);
      })
      .finally(() => setLoading(false));
  }, []);

  const [followers, setFollowers] = useState<Followers>({
    facebook: { label: 'DUKDIK_ดุ๊กดิ๊ก', count: 15000 },
    tiktok: { label: 'REAL_DUKDIK', count: 25000 },
    youtube: { label: 'DUKDIK_ดุ๊กดิ๊ก', count: 8000 }
  });

  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [editingFollowers, setEditingFollowers] = useState<boolean>(false);

  // Login handler
  const handleLogin = (): void => {
    setIsLoggingIn(true);
    setLoginError('');

    // Simulate API call
    setTimeout(() => {
      // Demo credentials (ในการใช้งานจริงควรตรวจสอบกับ Backend)
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Logout handler
  const handleLogout = (): void => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Package handlers
  const handleEditPackage = (pkg: Package): void => {
    setEditingPackage({ ...pkg });
  };

  const handleSavePackage = (): void => {
    if (!editingPackage) return;
    
    setPackages(packages.map(pkg => 
      pkg.id === editingPackage.id ? editingPackage : pkg
    ));
    setEditingPackage(null);
  };

  const handleDeletePackage = (id: string): void => {
    if (confirm('คุณต้องการลบแพ็คเกจนี้หรือไม่?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const handleAddPackage = (): void => {
    const newId = (Math.max(...packages.map(p => parseInt(p.id))) + 1).toString();
    const newPackage: Package = {
      id: newId,
      title: 'New Package',
      description: 'Description here',
      price: '0 บาท',
      icon: '📦'
    };
    setPackages([...packages, newPackage]);
    setEditingPackage(newPackage);
  };

  // Followers handlers
  const handleSaveFollowers = (): void => {
    setEditingFollowers(false);
    // ในการใช้งานจริงควรส่งไป API
  };

  const handleFollowerChange = (
    platform: PlatformKey, 
    field: keyof SocialMedia, 
    value: string | number
  ): void => {
    setFollowers({
      ...followers,
      [platform]: { 
        ...followers[platform], 
        [field]: field === 'count' ? (typeof value === 'string' ? parseInt(value) || 0 : value) : value 
      }
    });
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative w-full max-w-md">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl p-8">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Admin Login
            </h1>
            <p className="text-center text-gray-500 mb-8">
              เข้าสู่ระบบเพื่อจัดการข้อมูล
            </p>

            {/* Login Inputs */}
            <div className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อผู้ใช้
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="admin"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    type="button"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              {/* Demo Info */}
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
                <strong>Demo:</strong> username: <code className="bg-blue-100 px-2 py-0.5 rounded">admin</code> | password: <code className="bg-blue-100 px-2 py-0.5 rounded">admin123</code>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {isLoggingIn ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">จัดการข้อมูล Rate Card</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              type="button"
            >
              <LogOut className="w-4 h-4" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Followers Section */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">ข้อมูลโซเชียลมีเดีย</h2>
              {!editingFollowers ? (
                <button
                  onClick={() => setEditingFollowers(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  type="button"
                >
                  <Edit2 className="w-4 h-4" />
                  แก้ไข
                </button>
              ) : (
                <button
                  onClick={handleSaveFollowers}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  type="button"
                >
                  <Save className="w-4 h-4" />
                  บันทึก
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {(Object.entries(followers) as [PlatformKey, SocialMedia][]).map(([platform, data]) => (
                <div key={platform} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-semibold text-gray-700 mb-3 capitalize">{platform}</div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">ชื่อช่อง</label>
                      <input
                        type="text"
                        value={data.label}
                        onChange={(e) => handleFollowerChange(platform, 'label', e.target.value)}
                        disabled={!editingFollowers}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">จำนวนผู้ติดตาม</label>
                      <input
                        type="number"
                        value={data.count}
                        onChange={(e) => handleFollowerChange(platform, 'count', e.target.value)}
                        disabled={!editingFollowers}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">แพ็คเกจบริการ</h2>
              <button
                onClick={handleAddPackage}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                type="button"
              >
                <Plus className="w-4 h-4" />
                เพิ่มแพ็คเกจ
              </button>
            </div>

            <div className="space-y-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                  {editingPackage?.id === pkg.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">ชื่อแพ็คเกจ</label>
                          <input
                            type="text"
                            value={editingPackage.title}
                            onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">ราคา</label>
                          <input
                            type="text"
                            value={editingPackage.price}
                            onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">คำอธิบาย</label>
                        <textarea
                          value={editingPackage.description}
                          onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">ไอคอน (Emoji)</label>
                        <input
                          type="text"
                          value={editingPackage.icon}
                          onChange={(e) => setEditingPackage({ ...editingPackage, icon: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="📱"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSavePackage}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          type="button"
                        >
                          <Save className="w-4 h-4" />
                          บันทึก
                        </button>
                        <button
                          onClick={() => setEditingPackage(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                          type="button"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{pkg.icon}</span>
                          <h3 className="text-lg font-semibold text-gray-800">{pkg.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-2">{pkg.description}</p>
                        <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {pkg.price}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditPackage(pkg)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          type="button"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}