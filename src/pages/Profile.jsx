import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
  LogOut
} from 'lucide-react';

const Profile = () => {
  // Data profile view-only
  const profileData = {
    name: 'jane',
    email: 'jane.pengawas@example.com',
    phone: '+62 812-3456-7880',
    position: 'Pengawas',
    organization: 'Pengawas Keuangan',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    joinDate: '15 Januari 2023',
    userId: 'IRS-2023-001',
    lastLogin: '2 jam yang lalu'
  };

  // Statistik sederhana
  const stats = [
    { label: 'Laporan Dikirim', value: 42, icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Laporan Berhasil', value: 38, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Laporan Tertunda', value: 3, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Laporan Ditolak', value: 1, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-900">Profil Pengguna</h1>
                <p className="text-red-600 text-sm">Informasi akun dan statistik</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Keluar</span>
            </button>
          </div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>

        {/* Main Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
              
              {/* Profile Header */}
              <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow">
                    JD
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
                        {profileData.position}
                      </span>
                      <span className="text-sm bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                        ID: {profileData.userId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-red-100 pb-2">
                      Informasi Pribadi
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <Mail className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{profileData.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <Phone className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Nomor Telepon</p>
                          <p className="font-medium text-gray-900">{profileData.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <Calendar className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Bergabung Sejak</p>
                          <p className="font-medium text-gray-900">{profileData.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Organization Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-red-100 pb-2">
                      Informasi Organisasi
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <Building className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Organisasi</p>
                          <p className="font-medium text-gray-900">{profileData.organization}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <User className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Jabatan</p>
                          <p className="font-medium text-gray-900">{profileData.position}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Alamat</p>
                          <p className="font-medium text-gray-900">{profileData.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Shield className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Status Akun</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Aktif
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Terakhir Login</span>
                  <span className="text-gray-900 font-medium">{profileData.lastLogin}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Sesi Aktif</span>
                  <span className="text-gray-900 font-medium">1 Device</span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Status Sistem</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span>APOLO</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm">Online</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span>E-Reporting</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm">Online</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span>SIPINA</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-red-400">
                <p className="text-red-100 text-sm">Semua sistem berjalan normal</p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Info Cepat</h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  Untuk perubahan data pribadi, hubungi administrator sistem.
                </p>
                <p className="text-gray-600">
                  Pastikan data kontak Anda selalu diperbarui untuk mendapatkan notifikasi penting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Halaman profil ini bersifat view-only. Hubungi support untuk perubahan data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;