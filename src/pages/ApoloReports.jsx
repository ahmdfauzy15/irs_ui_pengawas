// MonitoringSanggahan.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Download, 
  Search, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  ChevronDown,
  Calendar,
  AlertCircle,
  Eye,
  RefreshCw,
  Building,
  AlertTriangle,
  AlertOctagon,
  MessageSquare,
  FileWarning,
  Download as DownloadIcon,
  ThumbsUp,
  ThumbsDown,
  Check,
  Info,
  History,
  User,
  Filter
} from 'lucide-react';

const MonitoringSanggahan = () => {
  const getCurrentWIBTime = () => {
    const now = new Date();
    return now;
  };

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showDisputeActionModal, setShowDisputeActionModal] = useState(false);
  const [disputeAction, setDisputeAction] = useState(null);
  const [disputeComment, setDisputeComment] = useState('');
  const [rejectionFile, setRejectionFile] = useState(null);
  const [adjustedLateDays, setAdjustedLateDays] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  
  // Data untuk log aktivitas
  const [activityLogs, setActivityLogs] = useState({});

  // Load data dari localStorage
  const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem('monitoringSanggahanData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem('monitoringSanggahanData', JSON.stringify(data));
  };

  const loadLogsFromLocalStorage = () => {
    const savedLogs = localStorage.getItem('sanggahanActivityLogs');
    if (savedLogs) {
      return JSON.parse(savedLogs);
    }
    return {};
  };

  const saveLogsToLocalStorage = (logs) => {
    localStorage.setItem('sanggahanActivityLogs', JSON.stringify(logs));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedLogs = loadLogsFromLocalStorage();
    setActivityLogs(savedLogs);
  }, []);

  const getSafeDate = (year, month, day) => {
    let safeMonth = month;
    let safeYear = year;
    
    if (safeMonth <= 0) {
      safeMonth += 12;
      safeYear -= 1;
    } else if (safeMonth > 12) {
      safeMonth -= 12;
      safeYear += 1;
    }
    
    const lastDayOfMonth = new Date(safeYear, safeMonth, 0).getDate();
    const safeDay = Math.min(day, lastDayOfMonth);
    
    return { year: safeYear, month: safeMonth, day: safeDay };
  };

  // Generate data sanggahan (hanya APOLO yang menyanggah)
  const generateData = () => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1;
    
    const prevMonth15 = getSafeDate(currentYear, currentMonth - 1, 15);
    const prevMonth20 = getSafeDate(currentYear, currentMonth - 1, 20);
    const prevMonth10 = getSafeDate(currentYear, currentMonth - 1, 10);
    const prevMonth25 = getSafeDate(currentYear, currentMonth - 1, 25);
    const prevMonth30 = getSafeDate(currentYear, currentMonth - 1, 30);

    const disputeData = [
      {
        id: "APO001",
        aplikasi: "APOLO",
        sandiLJK: "APO001",
        namaLJK: "Bank ABC",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Rencana Bisnis Bank",
        jenisPeriodeLaporan: "Tahunan",
        periodeData: "2026-04-01",
        tglUpload: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day - 5).padStart(2, '0')} 17:45:23`,
        tglBatas: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 5,
        isDisputed: true,
        disputeReason: "Keterlambatan terjadi karena kendala teknis pada sistem internal LJK. Laporan sudah disiapkan namun gagal terupload.",
        disputeDocument: "/disputes/APO001_dispute_letter.pdf",
        disputeStatus: "pending",
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null
      },
      {
        id: "APO002",
        aplikasi: "APOLO",
        sandiLJK: "APO002",
        namaLJK: "Bank DEF",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Rutin Bulanan",
        jenisPeriodeLaporan: "Bulanan",
        periodeData: "2026-04-02",
        tglUpload: `${prevMonth20.year}-${String(prevMonth20.month).padStart(2, '0')}-${String(prevMonth20.day - 3).padStart(2, '0')} 14:30:15`,
        tglBatas: `${prevMonth20.year}-${String(prevMonth20.month).padStart(2, '0')}-${String(prevMonth20.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 3,
        isDisputed: true,
        disputeReason: "Terjadi kesalahan input data sehingga perlu perbaikan.",
        disputeDocument: "/disputes/APO002_dispute_letter.pdf",
        disputeStatus: "pending",
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null
      },
      {
        id: "APO003",
        aplikasi: "APOLO",
        sandiLJK: "APO003",
        namaLJK: "Bank GHI",
        bidangLJK: "Bank Umum Syariah",
        namaLaporan: "Laporan Keuangan Tahunan",
        jenisPeriodeLaporan: "Tahunan",
        periodeData: "2026-04-03",
        tglUpload: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day + 2).padStart(2, '0')} 09:15:30`,
        tglBatas: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 2,
        isDisputed: true,
        disputeReason: "Keterlambatan karena libur nasional.",
        disputeDocument: "/disputes/APO003_dispute_letter.pdf",
        disputeStatus: "accepted",
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: "Sanggahan diterima, keterlambatan dikurangi menjadi 0 hari.",
        processedBy: "Jane - Bidang Pengawasan Sektor Pasar Modal, Keuangan Derivatif dan Bursa Karbon",
        processedAt: "2026-04-20 10:30:00"
      },
      {
        id: "APO004",
        aplikasi: "APOLO",
        sandiLJK: "APO004",
        namaLJK: "Bank JKL",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan GWM Individual",
        jenisPeriodeLaporan: "Bulanan",
        periodeData: "2026-04-04",
        tglUpload: `${prevMonth25.year}-${String(prevMonth25.month).padStart(2, '0')}-${String(prevMonth25.day + 4).padStart(2, '0')} 11:20:45`,
        tglBatas: `${prevMonth25.year}-${String(prevMonth25.month).padStart(2, '0')}-${String(prevMonth25.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 4,
        isDisputed: true,
        disputeReason: "Kendala teknis server.",
        disputeDocument: "/disputes/APO004_dispute_letter.pdf",
        disputeStatus: "rejected",
        disputeRejectionMessage: "Berdasarkan hasil verifikasi, alasan keterlambatan yang disampaikan tidak dapat diterima karena tidak terdapat bukti pendukung yang memadai sesuai dengan ketentuan POJK.",
        rejectionDocument: "/rejections/APO004_rejection_letter.pdf",
        rejectionDocumentName: "Surat_Penolakan_Sanggahan_APO004.pdf",
        supervisorComment: "Sanggahan ditolak, keterlambatan tetap 4 hari.",
        processedBy: "Jane - Bidang Pengawasan Sektor Pasar Modal, Keuangan Derivatif dan Bursa Karbon",
        processedAt: "2026-04-21 14:15:00"
      },
      {
        id: "APO005",
        aplikasi: "APOLO",
        sandiLJK: "APO005",
        namaLJK: "Bank MNO",
        bidangLJK: "Bank Perkreditan Rakyat",
        namaLaporan: "Laporan Risiko Likuiditas",
        jenisPeriodeLaporan: "Bulanan",
        periodeData: "2026-04-05",
        tglUpload: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day - 2).padStart(2, '0')} 16:00:00`,
        tglBatas: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 2,
        isDisputed: true,
        disputeReason: "Perbaikan data setelah audit internal.",
        disputeDocument: "/disputes/APO005_dispute_letter.pdf",
        disputeStatus: "pending",
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null
      },
      {
        id: "APO006",
        aplikasi: "APOLO",
        sandiLJK: "APO006",
        namaLJK: "Bank PQR",
        bidangLJK: "Bank Umum Syariah",
        namaLaporan: "Laporan GWM Konsolidasi",
        jenisPeriodeLaporan: "Bulanan",
        periodeData: "2026-04-06",
        tglUpload: `${prevMonth20.year}-${String(prevMonth20.month).padStart(2, '0')}-${String(prevMonth20.day + 3).padStart(2, '0')} 13:45:00`,
        tglBatas: `${prevMonth20.year}-${String(prevMonth20.month).padStart(2, '0')}-${String(prevMonth20.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 3,
        isDisputed: true,
        disputeReason: "Kesalahan dalam pengiriman data.",
        disputeDocument: "/disputes/APO006_dispute_letter.pdf",
        disputeStatus: "pending",
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null
      }
    ];

    return disputeData;
  };

  const parentData = useMemo(() => {
    const savedData = loadDataFromLocalStorage();
    if (savedData) {
      return savedData;
    }
    return generateData();
  }, [currentDateTime]);

  // Fungsi untuk filter berdasarkan periode data
  const filterByDateRange = (data) => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return [];
    }
    
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);

    return data.filter(item => {
      const periodeData = new Date(item.periodeData);
      if (isNaN(periodeData.getTime())) return false;
      return periodeData >= startDate && periodeData <= endDate;
    });
  };

  const handleDisputeAction = (action) => {
    setDisputeAction({ action, report: selectedDispute });
    setDisputeComment('');
    setRejectionFile(null);
    setAdjustedLateDays(selectedDispute.jmlHariTerlambat);
    setShowDisputeActionModal(true);
  };

  const addActivityLog = (reportId, action, comment, rejectionDoc = null) => {
    const now = new Date();
    const timestamp = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\./g, ':');
    
    const logEntry = {
      id: Date.now(),
      action: action,
      actionBy: "Jane - Bidang Pengawasan Sektor Pasar Modal, Keuangan Derivatif dan Bursa Karbon",
      timestamp: timestamp,
      comment: comment,
      rejectionDocument: rejectionDoc ? rejectionDoc.name : null
    };
    
    const updatedLogs = { ...activityLogs };
    if (!updatedLogs[reportId]) {
      updatedLogs[reportId] = [];
    }
    updatedLogs[reportId].unshift(logEntry);
    setActivityLogs(updatedLogs);
    saveLogsToLocalStorage(updatedLogs);
  };

  const processDisputeAction = () => {
    const now = new Date();
    const timestamp = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\./g, ':');
    
    if (disputeAction.action === 'accept') {
      const updatedData = parentData.map(item => {
        if (item.id === disputeAction.report.id) {
          return {
            ...item,
            jmlHariTerlambat: adjustedLateDays,
            statusKeterlambatan: "Terlambat",
            isDisputed: false,
            disputeStatus: "accepted",
            supervisorComment: disputeComment || `Sanggahan diterima, keterlambatan menjadi ${adjustedLateDays} hari.`,
            processedBy: "Jane - Bidang Pengawasan Sektor Pasar Modal, Keuangan Derivatif dan Bursa Karbon",
            processedAt: timestamp
          };
        }
        return item;
      });
      
      saveDataToLocalStorage(updatedData);
      addActivityLog(disputeAction.report.id, 'diterima', disputeComment);
      window.location.reload();
      
    } else if (disputeAction.action === 'reject') {
      const updatedData = parentData.map(item => {
        if (item.id === disputeAction.report.id) {
          return {
            ...item,
            isDisputed: false,
            disputeStatus: "rejected",
            disputeRejectionMessage: disputeComment || "Alasan penolakan tidak diisi",
            rejectionDocument: rejectionFile ? URL.createObjectURL(rejectionFile) : null,
            rejectionDocumentName: rejectionFile ? rejectionFile.name : null,
            supervisorComment: disputeComment,
            processedBy: "Jane - Bidang Pengawasan Sektor Pasar Modal, Keuangan Derivatif dan Bursa Karbon",
            processedAt: timestamp
          };
        }
        return item;
      });
      
      saveDataToLocalStorage(updatedData);
      addActivityLog(disputeAction.report.id, 'ditolak', disputeComment, rejectionFile);
      window.location.reload();
    }
    
    setShowDisputeActionModal(false);
    setShowDisputeModal(false);
    setSelectedDispute(null);
    setDisputeAction(null);
    setDisputeComment('');
    setRejectionFile(null);
    setAdjustedLateDays(0);
  };

  const handleRejectionFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRejectionFile(file);
    }
  };

  const handleDownloadRejectionDoc = (report) => {
    if (report.rejectionDocument) {
      const link = document.createElement('a');
      link.href = report.rejectionDocument;
      link.download = report.rejectionDocumentName || 'surat_penolakan.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Dokumen tidak tersedia');
    }
  };

  const handleDownloadDisputeDoc = (report) => {
    if (report.disputeDocument) {
      const link = document.createElement('a');
      link.href = report.disputeDocument;
      link.download = `sanggahan_${report.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Dokumen tidak tersedia');
    }
  };

  // Filter data berdasarkan periode data, search, dan status proses sanggahan
  const filteredData = useMemo(() => {
    let filtered = filterByDateRange(parentData);
    
    if (filtered.length === 0) return [];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.namaLaporan.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term) ||
        item.namaLJK.toLowerCase().includes(term) ||
        item.sandiLJK.toLowerCase().includes(term)
      );
    }
    
    // Filter berdasarkan status proses sanggahan
    if (filterStatus === 'pending') {
      filtered = filtered.filter(item => item.disputeStatus === "pending");
    } else if (filterStatus === 'completed') {
      filtered = filtered.filter(item => item.disputeStatus === "accepted" || item.disputeStatus === "rejected");
    }
    
    return filtered;
  }, [searchTerm, parentData, dateRange, filterStatus]);

  const stats = useMemo(() => {
    const dataWithPeriod = filterByDateRange(parentData);
    const totalLJK = [...new Set(dataWithPeriod.map(p => p.namaLJK))].length;
    const totalLaporan = dataWithPeriod.length;
    const totalSanggahan = dataWithPeriod.filter(p => p.isDisputed === true).length;
    
    return {
      totalLJK,
      totalLaporan,
      totalSanggahan
    };
  }, [parentData, dateRange]);

  const resetFilters = () => {
    setDateRange({
      startDate: '',
      endDate: ''
    });
    setSearchTerm('');
    setFilterStatus('all');
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime || dateTime === "Belum Upload") return "-";
    const d = new Date(dateTime);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\./g, ':');
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "-";
    return d.toISOString().split('T')[0];
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCurrentDateDisplay = () => {
    return currentDateTime.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentTimeDisplay = () => {
    return currentDateTime.toLocaleTimeString('id-ID', { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleExportData = () => {
    const exportData = filteredData.map(item => ({
      'ID': item.id,
      'Nama Aplikasi': item.aplikasi,
      'Sandi LJK': item.sandiLJK,
      'Nama LJK': item.namaLJK,
      'Nama Laporan': item.namaLaporan,
      'Jenis Periode Laporan': item.jenisPeriodeLaporan,
      'Periode Data': formatDateOnly(item.periodeData),
      'Tgl Upload/Penyampaian': formatDateTime(item.tglUpload),
      'Tgl Batas Akhir': formatDateOnly(item.tglBatas),
      'Status': `${item.statusKeterlambatan} (${item.jmlHariTerlambat} Hari Terlambat)`,
      'Status Sanggahan': item.disputeStatus === 'pending' ? 'Menunggu' : item.disputeStatus === 'accepted' ? 'Diterima' : 'Ditolak'
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitoring-sanggahan-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${String(row[header] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    return csv;
  };

  const getStatusBadge = (status, disputeStatus, jmlHariTerlambat) => {
  if (status === 'Terlambat') {
    // Untuk status Terlambat dengan jumlah hari
    if (disputeStatus === 'accepted') {
      return (
        <div className="text-left">
          <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Sanggahan Diterima
          </span>
        </div>
      );
    } else if (disputeStatus === 'rejected') {
      return (
        <div className="text-left">
          <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            Sanggahan Ditolak
          </span>
        </div>
      );
    } else {
      return (
        <div className="text-left">
          <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            Terlambat
          </span>
          <div className="text-xs text-red-600 mt-0.5">{jmlHariTerlambat} Hari Terlambat</div>
          <div className="text-[10px] text-gray-400">*Perhitungan berdasarkan sistem</div>
        </div>
      );
    }
  }
  if (status === 'Lapor') {
    return (
      <div className="text-left">
        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          Lapor
        </span>
      </div>
    );
  }
  if (status === 'Belum Lapor') {
    return (
      <div className="text-left">
        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
          Belum Lapor
        </span>
      </div>
    );
  }
  if (status === 'Tidak Lapor') {
    return (
      <div className="text-left">
        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          Tidak Lapor
        </span>
      </div>
    );
  }
  return (
    <div className="text-left">
      <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
        -
      </span>
    </div>
  );
};

  const getConfirmationButton = (item) => {
  if (item.disputeStatus === "pending") {
    return (
      <button
        onClick={() => {
          setSelectedDispute(item);
          setShowDisputeModal(true);
        }}
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        Proses Sanggahan
      </button>
    );
  } else if (item.disputeStatus === "accepted") {
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700">
        <CheckCircle className="w-3 h-3 mr-1" />
        Selesai
      </span>
    );
  } else if (item.disputeStatus === "rejected") {
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700">
        <XCircle className="w-3 h-3 mr-1" />
        Selesai
      </span>
    );
  }
  return null;
};

  const getAplikasiBadge = (aplikasi) => {
  const colorMap = {
    'APOLO': 'bg-blue-100 text-blue-800',
    'e-Reporting': 'bg-green-100 text-green-800',
    'SIPINA': 'bg-purple-100 text-purple-800',
  };

  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${colorMap[aplikasi] || 'bg-gray-100 text-gray-800'}`}>
      {aplikasi}
    </span>
  );
};

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50/20 to-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Proses Sanggahan</h1>
            <p className="text-gray-600 mt-1">Monitoring Proses Sanggahan Laporan Rutin</p>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Clock className="w-3 h-3 inline mr-1" />
                Waktu Real-time: {getCurrentTimeDisplay()}
              </p>
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Calendar className="w-3 h-3 inline mr-1" />
                {getCurrentDateDisplay()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-200 shadow hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      
      {/* Filter Section */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter Periode Laporan</h3>
                  <p className="text-sm text-gray-600">Pilih rentang tanggal periode data laporan <span className="text-red-500">*Wajib diisi</span></p>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Mulai Periode Laporan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Akhir Periode Laporan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    required
                  />
                </div>
              </div>
              {(!dateRange.startDate || !dateRange.endDate) && (
                <p className="text-sm text-red-500 mt-2">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Harap pilih tanggal mulai dan tanggal akhir periode laporan untuk menampilkan data
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Filter Proses Sanggahan
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="all">Semua Proses Sanggahan</option>
                  <option value="pending">Proses Sanggahan (Belum Diproses)</option>
                  <option value="completed">Selesai Sanggah</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="w-4 h-4 inline mr-2" />
                  Cari Laporan / LJK
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari nama laporan, LJK, atau ID..."
                    className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900">Filter Aktif:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {dateRange.startDate && dateRange.endDate && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          Periode Data: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                        </span>
                      )}
                      {filterStatus !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                          Proses: {filterStatus === 'pending' ? 'Belum Diproses' : 'Selesai Sanggah'}
                          <button 
                            onClick={() => setFilterStatus('all')}
                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          Pencarian: "{searchTerm}"
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="ml-2 text-gray-600 hover:text-gray-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-700">
                  {filteredData.length} laporan ditemukan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total LJK</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalLJK}</p>
              </div>
              <Building className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Laporan</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalLaporan}</p>
              </div>
              <FileText className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 shadow-sm border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Sanggahan</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalSanggahan}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>


      {/* Reports Table */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Daftar Sanggahan Laporan</h3>
                  <p className="text-sm text-gray-600 mt-1">Monitoring semua proses sanggahan APOLO (PMDK)</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredData.length} dari {stats.totalSanggahan} sanggahan
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Aplikasi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sandi LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis Periode Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Upload/Penyampaian</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Konfirmasi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-200 bg-red-50/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getAplikasiBadge(item.aplikasi)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.sandiLJK}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.namaLJK}</div>
                        <div className="text-xs text-gray-500">{item.bidangLJK}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.namaLaporan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.jenisPeriodeLaporan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDateTime(item.tglUpload)}
                    </td>
                    <td className="px-6 py-4">
  {getStatusBadge(item.statusKeterlambatan, item.disputeStatus, item.jmlHariTerlambat)}
</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getConfirmationButton(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(!dateRange.startDate || !dateRange.endDate) && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pilih Periode Tanggal Terlebih Dahulu</h3>
              <p className="text-gray-600">Silakan pilih tanggal mulai dan tanggal akhir periode laporan untuk menampilkan data</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}

          {dateRange.startDate && dateRange.endDate && filteredData.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-gray-600">Tidak ada sanggahan yang sesuai dengan kriteria pencarian</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}

          {dateRange.startDate && dateRange.endDate && filteredData.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Data diperbarui berdasarkan waktu real-time • 
                  Periode Data: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)} • 
                  Total LJK: {stats.totalLJK}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Halaman 1 dari {Math.ceil(filteredData.length / 10) || 1}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal dengan Periode Data, Tgl Batas, dan Log Aktivitas */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Detail Laporan & Sanggahan</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getAplikasiBadge(selectedReport.aplikasi)}
                      <span className="text-gray-600">• Sandi LJK: {selectedReport.id}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Informasi Laporan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedReport.namaLaporan}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Aplikasi</h4>
                  {getAplikasiBadge(selectedReport.aplikasi)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">LJK</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{selectedReport.namaLJK}</p>
                    <p className="text-sm text-gray-600">{selectedReport.bidangLJK}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis Periode Laporan</h4>
                  <p className="text-gray-900">{selectedReport.jenisPeriodeLaporan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode Data</h4>
                  <p className="text-gray-900">{formatDateOnly(selectedReport.periodeData)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Batas Akhir</h4>
                  <p className="text-gray-900">{formatDateOnly(selectedReport.tglBatas)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Upload</h4>
                  <p className="text-gray-900">{formatDateTime(selectedReport.tglUpload)}</p>
                </div>
                <div>
  <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
  <div className="text-left">
    {getStatusBadge(selectedReport.statusKeterlambatan, selectedReport.disputeStatus, selectedReport.jmlHariTerlambat)}
  </div>
</div>
              </div>

              {/* Alasan Sanggahan */}
              <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  <h4 className="text-base font-semibold text-orange-900">Alasan Sanggahan</h4>
                </div>
                <p className="text-gray-800 leading-relaxed">{selectedReport.disputeReason}</p>
                {selectedReport.disputeDocument && (
                  <button
                    onClick={() => handleDownloadDisputeDoc(selectedReport)}
                    className="mt-3 inline-flex items-center space-x-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Download Surat Sanggahan</span>
                  </button>
                )}
              </div>

              {/* Keputusan Pengawas (jika sudah diproses) */}
              {(selectedReport.disputeStatus === 'accepted' || selectedReport.disputeStatus === 'rejected') && (
                <div className={`rounded-xl p-5 border ${selectedReport.disputeStatus === 'accepted' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    {selectedReport.disputeStatus === 'accepted' ? (
                      <ThumbsUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <ThumbsDown className="w-5 h-5 text-red-600" />
                    )}
                    <h4 className={`text-base font-semibold ${selectedReport.disputeStatus === 'accepted' ? 'text-green-900' : 'text-red-900'}`}>
                      {selectedReport.disputeStatus === 'accepted' ? 'Keputusan: Sanggahan Diterima' : 'Keputusan: Sanggahan Ditolak'}
                    </h4>
                  </div>
                  
                  {selectedReport.disputeStatus === 'rejected' && selectedReport.disputeRejectionMessage && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-red-700 mb-1">Alasan Penolakan:</p>
                      <p className="text-gray-800">{selectedReport.disputeRejectionMessage}</p>
                    </div>
                  )}
                  
                  {selectedReport.rejectionDocument && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Dokumen Penolakan dari Pengawas:</p>
                      <button
                        onClick={() => handleDownloadRejectionDoc(selectedReport)}
                        className="inline-flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        <DownloadIcon className="w-4 h-4" />
                        <span>Download Surat Penolakan</span>
                      </button>
                    </div>
                  )}
                  
                  {selectedReport.supervisorComment && (
                    <div className="mt-3 p-3 bg-white rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Komentar Pengawas:</p>
                      <p className="text-gray-800">{selectedReport.supervisorComment}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Log Aktivitas */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <History className="w-5 h-5 text-gray-600" />
                  <h4 className="text-base font-semibold text-gray-900">Log Aktivitas</h4>
                </div>
                
                {activityLogs[selectedReport.id] && activityLogs[selectedReport.id].length > 0 ? (
                  <div className="space-y-3">
                    {activityLogs[selectedReport.id].map((log) => (
                      <div key={log.id} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              {log.action === 'diterima' ? (
                                <ThumbsUp className="w-4 h-4 text-green-600" />
                              ) : (
                                <ThumbsDown className="w-4 h-4 text-red-600" />
                              )}
                              <span className="font-medium text-gray-900">
                                Sanggahan {log.action === 'diterima' ? 'Diterima' : 'Ditolak'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              <User className="w-3 h-3 inline mr-1" />
                              {log.actionBy}
                            </p>
                            {log.comment && (
                              <p className="text-sm text-gray-700 mt-1">
                                <strong>Komentar:</strong> {log.comment}
                              </p>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Belum ada aktivitas</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Detail Modal */}
      {showDisputeModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg">
                    <FileWarning className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-indigo-900">Detail Sanggahan LJK</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getAplikasiBadge(selectedDispute.aplikasi)}
                      <span className="text-gray-600">• ID: {selectedDispute.id}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDisputeModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-indigo-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Building className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-base font-semibold text-indigo-900">Informasi LJK</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nama LJK</p>
                    <p className="font-medium text-gray-900">{selectedDispute.namaLJK}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bidang LJK</p>
                    <p className="font-medium text-gray-900">{selectedDispute.bidangLJK}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h4 className="text-base font-semibold text-green-900">Informasi Laporan</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Jenis Laporan</p>
                    <p className="font-medium text-gray-900">{selectedDispute.namaLaporan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Periode Data</p>
                    <p className="font-medium text-gray-900">{formatDateOnly(selectedDispute.periodeData)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tanggal Batas</p>
                    <p className="font-medium text-gray-900">{formatDateOnly(selectedDispute.tglBatas)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Jumlah Hari Terlambat</p>
                    <p className="font-medium text-red-600">{selectedDispute.jmlHariTerlambat} Hari</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-5 border border-orange-200">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  <h4 className="text-base font-semibold text-orange-900">Alasan Sanggahan</h4>
                </div>
                <p className="text-gray-800 leading-relaxed">{selectedDispute.disputeReason}</p>
                {selectedDispute.disputeDocument && (
                  <button
                    onClick={() => handleDownloadDisputeDoc(selectedDispute)}
                    className="mt-3 inline-flex items-center space-x-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Download Surat Sanggahan</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowDisputeModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => handleDisputeAction('accept')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Terima Sanggahan</span>
                </button>
                <button
                  onClick={() => handleDisputeAction('reject')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Tolak Sanggahan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Action Modal */}
      {showDisputeActionModal && disputeAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${disputeAction.action === 'accept' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {disputeAction.action === 'accept' ? (
                    <ThumbsUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ThumbsDown className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {disputeAction.action === 'accept' ? 'Terima Sanggahan' : 'Tolak Sanggahan'}
                </h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {disputeAction.action === 'accept' ? (
                <>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      Dengan menerima sanggahan ini, Anda dapat melakukan adjustment jumlah hari terlambat.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adjustment Jumlah Hari Terlambat:
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        min="0"
                        max={disputeAction.report.jmlHariTerlambat}
                        value={adjustedLateDays}
                        onChange={(e) => setAdjustedLateDays(parseInt(e.target.value) || 0)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                      <span className="text-sm text-gray-600">
                        (Maks: {disputeAction.report.jmlHariTerlambat} Hari)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      *Sesuaikan dengan keadaan yang sebenarnya
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-xs text-yellow-800">
                      <Info className="w-3 h-3 inline mr-1" />
                      Status baru: <strong>Terlambat</strong> dengan jumlah hari terlambat: <strong>{adjustedLateDays} Hari</strong>
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800 mb-3">
                    Dengan menolak sanggahan ini, status laporan akan tetap <strong>Terlambat</strong> dengan jumlah hari terlambat <strong>{disputeAction.report.jmlHariTerlambat} Hari</strong>.
                  </p>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Surat Keterangan Penolakan:
                    </label>
                    <input
                      type="file"
                      onChange={handleRejectionFileChange}
                      accept=".pdf,.doc,.docx"
                      className="w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    {rejectionFile && (
                      <p className="text-xs text-green-600 mt-1">File terpilih: {rejectionFile.name}</p>
                    )}
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Komentar:
                </label>
                <textarea
                  value={disputeComment}
                  onChange={(e) => setDisputeComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Tulis komentar..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => {
                  setShowDisputeActionModal(false);
                  setDisputeAction(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={processDisputeAction}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  disputeAction.action === 'accept'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Konfirmasi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringSanggahan;