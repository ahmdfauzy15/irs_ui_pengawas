// src/components/dashboard/ActivityList.jsx
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle, 
  Info, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  FileWarning,
  Timer,
  CalendarCheck,
  AlertTriangle
} from 'lucide-react';

const ActivityList = ({ activities, supervisorView = false, ljkActivities = [] }) => {
  
  // Data aktivitas untuk pengawas (jika supervisorView true)
  const supervisorActivities = supervisorView ? [
    {
      id: 1,
      type: 'compliance',
      title: "LJK Dana Pensiun ASDP - Laporan triwulanan berhasil diverifikasi",
      description: "Kepatuhan 100%, tepat waktu 5 hari sebelum deadline",
      time: 'Hari ini, 10:30',
      status: 'success',
      ljk: 'Dana Pensiun ASDP',
      kategori: 'Program Pensiun Manfaat Pasti'
    },
    {
      id: 2,
      type: 'warning',
      title: "Bank of America, N.A - Potensi keterlambatan laporan bulanan",
      description: "3 hari tersisa sebelum batas akhir, belum ada pengajuan",
      time: 'Hari ini, 09:45',
      status: 'warning',
      ljk: 'Bank of America, N.A',
      kategori: 'EBUS'
    },
    {
      id: 3,
      type: 'compliance',
      title: "Capital Global Ventura - Laporan kuartalan 100% complete",
      description: "Semua dokumen lengkap, telah diaudit internal",
      time: 'Kemarin, 16:20',
      status: 'success',
      ljk: 'Capital Global Ventura',
      kategori: 'Modal Ventura'
    },
    {
      id: 4,
      type: 'alert',
      title: "BANK KALSEL - Laporan bulan Januari belum diterima",
      description: "Melewati batas waktu 2 hari, perlu tindakan lanjut",
      time: 'Kemarin, 14:15',
      status: 'danger',
      ljk: 'BANK KALSEL',
      kategori: 'EBUS'
    },
    {
      id: 5,
      type: 'review',
      title: "CHARLIE SIMANJUNTAK SH - Laporan penilaian under review",
      description: "Dokumen penilaian aset sedang dalam proses verifikasi",
      time: '2 hari lalu, 11:30',
      status: 'info',
      ljk: 'CHARLIE SIMANJUNTAK SH',
      kategori: 'Jasa Penilai'
    },
    {
      id: 6,
      type: 'compliance',
      title: "BERLIANTO HARIS - Update sertifikasi syariah terbaru",
      description: "Sertifikasi diperbarui hingga 2025, status compliance meningkat",
      time: '3 hari lalu, 09:00',
      status: 'success',
      ljk: 'BERLIANTO HARIS',
      kategori: 'Ahli Syariah'
    },
    {
      id: 7,
      type: 'warning',
      title: "Bank Hibank Indonesia - Kinerja compliance menurun",
      description: "Tingkat kepatuhan turun 15% dari periode sebelumnya",
      time: '4 hari lalu, 15:45',
      status: 'warning',
      ljk: 'Bank Hibank Indonesia',
      kategori: 'EBUS'
    },
    {
      id: 8,
      type: 'deadline',
      title: "Benedictus Laurentius Supriyanto - Deadline penilaian properti",
      description: "Batas akhir penilaian aset properti dalam 7 hari",
      time: '5 hari lalu, 13:20',
      status: 'warning',
      ljk: 'Benedictus Laurentius Supriyanto',
      kategori: 'Jasa Penilai'
    }
  ] : activities;

  const getActivityIcon = (type, status) => {
    if (supervisorView) {
      switch (status) {
        case 'success':
          return <CheckCircle className="w-5 h-5 text-green-600" />;
        case 'warning':
          return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
        case 'danger':
          return <XCircle className="w-5 h-5 text-red-600" />;
        case 'info':
          return <Info className="w-5 h-5 text-blue-600" />;
        default:
          return <Clock className="w-5 h-5 text-gray-600" />;
      }
    }
    
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'danger':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      danger: 'bg-red-100 text-red-800 border-red-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
      compliance: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      alert: 'bg-orange-100 text-orange-800 border-orange-200'
    };

    const labels = {
      success: 'Patuh',
      warning: 'Perhatian',
      danger: 'Kritis',
      info: 'Review',
      compliance: 'Compliance',
      alert: 'Alert'
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getCategoryBadge = (kategori) => {
    const styles = {
      'Program Pensiun Manfaat Pasti': 'bg-indigo-100 text-indigo-800',
      'EBUS': 'bg-blue-100 text-blue-800',
      'Modal Ventura': 'bg-purple-100 text-purple-800',
      'Jasa Penilai': 'bg-cyan-100 text-cyan-800',
      'Ahli Syariah': 'bg-emerald-100 text-emerald-800',
      'Dana Pensiun': 'bg-violet-100 text-violet-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[kategori] || 'bg-gray-100 text-gray-800'}`}>
        {kategori}
      </span>
    );
  };

  const getTrendIndicator = (trend) => {
    if (trend === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (trend === 'down') {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const getActivityStyle = (status) => {
    switch (status) {
      case 'success':
        return 'border-l-4 border-l-green-500 bg-white hover:bg-green-50/30';
      case 'warning':
        return 'border-l-4 border-l-yellow-500 bg-white hover:bg-yellow-50/30';
      case 'danger':
        return 'border-l-4 border-l-red-500 bg-white hover:bg-red-50/30';
      case 'info':
        return 'border-l-4 border-l-blue-500 bg-white hover:bg-blue-50/30';
      default:
        return 'border-l-4 border-l-gray-500 bg-white hover:bg-gray-50';
    }
  };

  if (supervisorView) {
    return (
      <div className="space-y-3">
        {supervisorActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-600">Tidak ada aktivitas pengawasan terbaru</p>
          </div>
        ) : (
          supervisorActivities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${getActivityStyle(activity.status)}`}
            >
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-white rounded-lg border shadow-xs">
                  {getActivityIcon(activity.type, activity.status)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{activity.ljk}</h4>
                    {getCategoryBadge(activity.kategori)}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(activity.status)}
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </div>
                </div>
                
                <p className="font-medium text-gray-800 mb-1">{activity.title}</p>
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <button className="text-xs font-medium text-red-600 hover:text-red-800 flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Detail Compliance</span>
                    </button>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                      <FileWarning className="w-3 h-3" />
                      <span>Audit Trail</span>
                    </button>
                    <button className="text-xs font-medium text-green-600 hover:text-green-800 flex items-center space-x-1">
                      <CalendarCheck className="w-3 h-3" />
                      <span>Jadwal Review</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-xs text-gray-500">ID: LJK-{activity.id.toString().padStart(3, '0')}</div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Summary Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-red-100 rounded">
                <Shield className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Summary Compliance Bulanan</p>
                <p className="text-xs text-gray-600">Update: {new Date().toLocaleDateString('id-ID')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-xs text-gray-600">Tingkat Kepatuhan</div>
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">LJK Patuh</span>
                <span className="text-sm font-bold text-green-600">185</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Perlu Perhatian</span>
                <span className="text-sm font-bold text-yellow-600">12</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tidak Patuh</span>
                <span className="text-sm font-bold text-red-600">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center justify-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Timer className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Deadline Monitor</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium">LJK Berisiko</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Compliance Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">Trend Analysis</span>
          </button>
        </div>
      </div>
    );
  }

  // Tampilan default (untuk non-supervisor)
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Info className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">Tidak ada aktivitas terbaru</p>
        </div>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-center justify-between p-4 rounded-lg hover:shadow-md transition-all duration-200 border-l-4 ${
              activity.type === 'success' ? 'border-l-green-500 bg-green-50/50' :
              activity.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50/50' :
              activity.type === 'danger' ? 'border-l-red-500 bg-red-50/50' :
              'border-l-blue-500 bg-blue-50/50'
            }`}
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="p-2 bg-white rounded-lg shadow-sm border mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <span className="text-gray-300">•</span>
                  <div className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border">
                    ID: {activity.id}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                activity.system === 'APOLO' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                activity.system === 'Ereporting' ? 'bg-cyan-100 text-cyan-800 border-cyan-200' :
                activity.system === 'SiPina' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                'bg-gray-100 text-gray-800 border-gray-200'
              }`}>
                {activity.system}
              </span>
            </div>
          </div>
        ))
      )}
      
      {/* Info Tambahan */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="p-1.5 bg-gray-100 rounded">
            <Info className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Informasi Aktivitas</p>
            <p className="text-xs text-gray-600 mt-1">
              Aktivitas menampilkan update terbaru dari sistem pelaporan. Refresh halaman untuk update real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;