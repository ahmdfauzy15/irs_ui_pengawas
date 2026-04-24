// MonitoringPengawas.jsx
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
  Info,
  History,
  User,
  Filter,
  ChevronRight
} from 'lucide-react';

const MonitoringPengawas = () => {
  const getCurrentWIBTime = () => {
    const now = new Date();
    return now;
  };

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAplikasiDropdown, setShowAplikasiDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [filters, setFilters] = useState({
    aplikasi: [],
    status: []
  });
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);
    return () => clearInterval(timer);
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

  // Generate data untuk semua aplikasi
  const generateData = () => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1;
    
    const prevMonth15 = getSafeDate(currentYear, currentMonth - 1, 15);
    const prevMonth20 = getSafeDate(currentYear, currentMonth - 1, 20);
    const prevMonth10 = getSafeDate(currentYear, currentMonth - 1, 10);
    const prevMonth25 = getSafeDate(currentYear, currentMonth - 1, 25);
    const prevMonth30 = getSafeDate(currentYear, currentMonth - 1, 30);
    const prevMonth5 = getSafeDate(currentYear, currentMonth - 1, 5);

    const reportsData = [
      // APOLO 1 - Terlambat dengan sanggahan
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
        disputeReason: "Keterlambatan terjadi karena kendala teknis pada sistem. Laporan sudah disiapkan namun gagal terupload.",
        disputeDocument: "/disputes/APO001_dispute_letter.pdf",
        disputeStatus: "pending",
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null,
        detailForms: [
          { id: 1, namaForm: "Form Rencana Bisnis Bank - Laporan Utama", fileUrl: "/reports/APO001_form1.pdf" }
        ]
      },
      // APOLO 2 - Lapor (tepat waktu)
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
        statusKeterlambatan: "Lapor",
        jmlHariTerlambat: 0,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        disputeStatus: null,
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null,
        detailForms: [
          { id: 1, namaForm: "Form Laporan Rutin Bulanan - Utama", fileUrl: "/reports/APO002_form1.pdf" }
        ]
      },
      // E-Reporting 1 - Terlambat
      {
        id: "ERP001",
        aplikasi: "e-Reporting",
        sandiLJK: "ERP001",
        namaLJK: "Bank GHI",
        bidangLJK: "Bank Umum Syariah",
        namaLaporan: "Laporan Publikasi Asuransi Jiwa Konvensional",
        jenisPeriodeLaporan: "Tahunan",
        periodeData: "2026-04-03",
        tglUpload: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day + 2).padStart(2, '0')} 09:15:30`,
        tglBatas: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 2,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        disputeStatus: null,
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null,
        detailForms: [
          { id: 1, namaForm: "Form Publikasi Asuransi Jiwa", fileUrl: "/reports/ERP001_form1.pdf" }
        ]
      },
      // E-Reporting 2 - Belum Lapor
      {
        id: "ERP002",
        aplikasi: "e-Reporting",
        sandiLJK: "ERP002",
        namaLJK: "Bank JKL",
        bidangLJK: "Bank Umum Konvensional",
        namaLaporan: "Laporan Asuransi Jiwa Syariah",
        jenisPeriodeLaporan: "Bulanan",
        periodeData: "2026-04-04",
        tglUpload: null,
        tglBatas: `${prevMonth25.year}-${String(prevMonth25.month).padStart(2, '0')}-${String(prevMonth25.day).padStart(2, '0')}`,
        statusKeterlambatan: "Belum Lapor",
        jmlHariTerlambat: 0,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        disputeStatus: null,
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null,
        detailForms: [
          { id: 1, namaForm: "Form Asuransi Jiwa Syariah", fileUrl: null }
        ]
      },
      // SIPINA 1 - Terlambat (tanpa jumlah hari)
      {
        id: "SIP001",
        aplikasi: "SIPINA",
        sandiLJK: "SIP001",
        namaLJK: "Bank MNO",
        bidangLJK: "Bank Perkreditan Rakyat",
        namaLaporan: "Laporan Pengawasan Internal",
        jenisPeriodeLaporan: "Tahunan",
        periodeData: "2026-04-05",
        tglUpload: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day - 2).padStart(2, '0')} 16:00:00`,
        tglBatas: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 2,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        disputeStatus: null,
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null,
        detailForms: [
          { id: 1, namaForm: "Form Pengawasan Internal", fileUrl: "/reports/SIP001_form1.pdf" }
        ]
      },
      // SIPINA 2 - Lapor
      {
        id: "SIP002",
        aplikasi: "SIPINA",
        sandiLJK: "SIP002",
        namaLJK: "Bank PQR",
        bidangLJK: "Bank Umum Syariah",
        namaLaporan: "Laporan Reasuransi",
        jenisPeriodeLaporan: "Bulanan",
        periodeData: "2026-04-06",
        tglUpload: `${prevMonth5.year}-${String(prevMonth5.month).padStart(2, '0')}-${String(prevMonth5.day + 3).padStart(2, '0')} 13:45:00`,
        tglBatas: `${prevMonth5.year}-${String(prevMonth5.month).padStart(2, '0')}-${String(prevMonth5.day).padStart(2, '0')}`,
        statusKeterlambatan: "Lapor",
        jmlHariTerlambat: 0,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        disputeStatus: null,
        disputeRejectionMessage: null,
        rejectionDocument: null,
        rejectionDocumentName: null,
        supervisorComment: null,
        processedBy: null,
        processedAt: null,
        detailForms: [
          { id: 1, namaForm: "Form Reasuransi", fileUrl: "/reports/SIP002_form1.pdf" }
        ]
      }
    ];

    return reportsData;
  };

  const parentData = useMemo(() => {
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

  const handleAplikasiFilterChange = (value) => {
    setFilters(prev => {
      const currentValues = [...prev.aplikasi];
      if (currentValues.includes(value)) {
        return { ...prev, aplikasi: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, aplikasi: [...currentValues, value] };
      }
    });
    // Keep dropdown open for better UX on mobile
    if (window.innerWidth < 768) {
      setShowAplikasiDropdown(true);
    }
  };

  const handleStatusFilterChange = (value) => {
    setFilters(prev => {
      const currentValues = [...prev.status];
      if (currentValues.includes(value)) {
        return { ...prev, status: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, status: [...currentValues, value] };
      }
    });
    // Keep dropdown open for better UX on mobile
    if (window.innerWidth < 768) {
      setShowStatusDropdown(true);
    }
  };

  // Filter data berdasarkan periode data, search, aplikasi, dan status
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
    
    if (filters.aplikasi.length > 0) {
      filtered = filtered.filter(item => filters.aplikasi.includes(item.aplikasi));
    }
    
    if (filters.status.length > 0) {
      filtered = filtered.filter(item => filters.status.includes(item.statusKeterlambatan));
    }
    
    return filtered;
  }, [searchTerm, parentData, dateRange, filters]);

  const stats = useMemo(() => {
    const dataWithPeriod = filterByDateRange(parentData);
    const totalLJK = [...new Set(dataWithPeriod.map(p => p.namaLJK))].length;
    const totalLaporan = dataWithPeriod.length;
    const terlambat = dataWithPeriod.filter(p => p.statusKeterlambatan === "Terlambat").length;
    const lapor = dataWithPeriod.filter(p => p.statusKeterlambatan === "Lapor").length;
    const belumLapor = dataWithPeriod.filter(p => p.statusKeterlambatan === "Belum Lapor").length;
    const tidakLapor = dataWithPeriod.filter(p => p.statusKeterlambatan === "Tidak Lapor").length;
    
    return {
      totalLJK,
      totalLaporan,
      terlambat,
      lapor,
      belumLapor,
      tidakLapor
    };
  }, [parentData, dateRange]);

  const resetFilters = () => {
    setDateRange({
      startDate: '',
      endDate: ''
    });
    setFilters({
      aplikasi: [],
      status: []
    });
    setSearchTerm('');
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

  const handleDownloadForm = (fileUrl, fileName) => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('File tidak tersedia');
    }
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
      'Status': item.statusKeterlambatan === 'Terlambat' && item.aplikasi !== 'SIPINA' 
        ? `${item.statusKeterlambatan} (${item.jmlHariTerlambat} Hari Terlambat)`
        : item.statusKeterlambatan,
      'Status Sanggahan': item.disputeStatus === 'pending' ? 'Menunggu' : item.disputeStatus === 'accepted' ? 'Diterima' : '-'
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitoring-pengawas-${new Date().toISOString().split('T')[0]}.csv`;
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

  // Status badge dengan tampilan teks biasa (bukan button)
  const getStatusBadge = (item) => {
    const { statusKeterlambatan, aplikasi, jmlHariTerlambat } = item;
    
    if (statusKeterlambatan === 'Lapor') {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-green-100 text-green-800">
          Lapor
        </div>
      );
    } else if (statusKeterlambatan === 'Belum Lapor') {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-yellow-100 text-yellow-800">
          Belum Lapor
        </div>
      );
    } else if (statusKeterlambatan === 'Tidak Lapor') {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-gray-100 text-gray-800">
          Tidak Lapor
        </div>
      );
    } else if (statusKeterlambatan === 'Terlambat') {
      if (aplikasi === 'APOLO' || aplikasi === 'e-Reporting') {
        return (
          <div>
            <div className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-red-100 text-red-800">
              Terlambat
            </div>
            <div className="text-xs text-red-600 mt-0.5">{jmlHariTerlambat} Hari Terlambat</div>
            <div className="text-[10px] text-gray-400">*Perhitungan berdasarkan sistem</div>
          </div>
        );
      } else {
        return (
          <div className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-red-100 text-red-800">
            Terlambat
          </div>
        );
      }
    }
    return (
      <div className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-gray-100 text-gray-800">
        -
      </div>
    );
  };

  const getAplikasiBadge = (aplikasi) => {
    const colorMap = {
      'APOLO': 'bg-blue-100 text-blue-800',
      'e-Reporting': 'bg-green-100 text-green-800',
      'SIPINA': 'bg-purple-100 text-purple-800',
    };

    return (
      <div className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${colorMap[aplikasi]}`}>
        {aplikasi}
      </div>
    );
  };

  const getAplikasiOptions = () => {
    const aplikasiList = [...new Set(parentData.map(r => r.aplikasi))];
    return aplikasiList.map(app => ({ value: app, label: app }));
  };

  const getStatusOptions = () => {
    return [
      { value: 'Lapor', label: 'Lapor' },
      { value: 'Terlambat', label: 'Terlambat' },
      { value: 'Belum Lapor', label: 'Belum Lapor' },
      { value: 'Tidak Lapor', label: 'Tidak Lapor' }
    ];
  };

  const toggleRowExpand = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Monitoring Absensi Pengawas</h1>
            <p className="text-gray-600 mt-1">Monitoring Laporan</p>
            <div className="flex items-center space-x-4 mt-1 flex-wrap">
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
          <div className="p-4 md:p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-red-900">Filter Periode Laporan</h3>
                  <p className="text-xs md:text-sm text-gray-600">Pilih rentang tanggal periode data laporan <span className="text-red-500">*Wajib diisi</span></p>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 md:px-4 md:py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Mulai Periode Laporan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Filter Aplikasi - Multiple Select Dropdown Responsive */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Filter Aplikasi (Multiple)
                </label>
                <button
                  onClick={() => setShowAplikasiDropdown(!showAplikasiDropdown)}
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-left flex justify-between items-center"
                >
                  <span className="text-sm text-gray-700 truncate">
                    {filters.aplikasi.length === 0 
                      ? 'Semua Aplikasi' 
                      : `${filters.aplikasi.length} terpilih`}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
                
                {showAplikasiDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                    <div className="p-2">
                      {getAplikasiOptions().map((option) => (
                        <label key={option.value} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.aplikasi.includes(option.value)}
                            onChange={() => handleAplikasiFilterChange(option.value)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Filter Status - Multiple Select Dropdown Responsive */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Filter Status (Multiple)
                </label>
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-left flex justify-between items-center"
                >
                  <span className="text-sm text-gray-700 truncate">
                    {filters.status.length === 0 
                      ? 'Semua Status' 
                      : `${filters.status.length} terpilih`}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                    <div className="p-2">
                      {getStatusOptions().map((option) => (
                        <label key={option.value} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.status.includes(option.value)}
                            onChange={() => handleStatusFilterChange(option.value)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
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
                    className="pl-10 pr-4 py-2 md:py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 md:p-4 rounded-xl border border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-blue-900 text-sm">Filter Aktif:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {dateRange.startDate && dateRange.endDate && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                        </span>
                      )}
                      {filters.aplikasi.map(app => (
                        <span key={app} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Aplikasi: {app}
                          <button 
                            onClick={() => handleAplikasiFilterChange(app)}
                            className="ml-1.5 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {filters.status.map(status => (
                        <span key={status} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Status: {status}
                          <button 
                            onClick={() => handleStatusFilterChange(status)}
                            className="ml-1.5 text-yellow-600 hover:text-yellow-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {searchTerm && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Pencarian: "{searchTerm}"
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="ml-1.5 text-gray-600 hover:text-gray-800"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 md:p-4 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-blue-600 font-medium">Total Laporan</p>
                <p className="text-xl md:text-2xl font-bold text-blue-900">{stats.totalLaporan}</p>
              </div>
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 md:p-4 shadow-sm border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-indigo-600 font-medium">Total LJK</p>
                <p className="text-xl md:text-2xl font-bold text-indigo-900">{stats.totalLJK}</p>
              </div>
              <Building className="w-6 h-6 md:w-8 md:h-8 text-indigo-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 md:p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-green-600 font-medium">Lapor</p>
                <p className="text-xl md:text-2xl font-bold text-green-900">{stats.lapor}</p>
              </div>
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 md:p-4 shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-red-600 font-medium">Terlambat</p>
                <p className="text-xl md:text-2xl font-bold text-red-900">{stats.terlambat}</p>
              </div>
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 md:p-4 shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-yellow-600 font-medium">Belum Lapor</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-900">{stats.belumLapor}</p>
              </div>
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 md:p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Tidak Lapor</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.tidakLapor}</p>
              </div>
              <XCircle className="w-6 h-6 md:w-8 md:h-8 text-gray-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden overflow-x-auto">
          <div className="p-4 md:p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-red-900">Daftar Laporan</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-0.5">Monitoring laporan dari berbagai aplikasi (APOLO, e-Reporting, SIPINA)</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredData.length} dari {stats.totalLaporan} laporan
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1000px] lg:min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Show/Hide</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Aplikasi</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sandi LJK</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama LJK</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Laporan</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis Periode Laporan</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Upload</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                      item.statusKeterlambatan === 'Terlambat' ? 'bg-red-50/30' : 
                      item.statusKeterlambatan === 'Belum Lapor' ? 'bg-yellow-50/30' :
                      item.statusKeterlambatan === 'Tidak Lapor' ? 'bg-gray-50/30' : ''
                    }`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => toggleRowExpand(item.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {expandedRows[item.id] ? 
                            <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          }
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getAplikasiBadge(item.aplikasi)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.sandiLJK}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.namaLJK}</div>
                          <div className="text-xs text-gray-500">{item.bidangLJK}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.namaLaporan}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {item.jenisPeriodeLaporan}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {formatDateTime(item.tglUpload)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(item)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                       </td>
                    </tr>
                    
                    {/* Child Rows - Detail Forms */}
                    {expandedRows[item.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="10" className="px-4 py-4">
                          <div className="ml-0 md:ml-8">
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <div className="px-3 py-2 md:px-4 md:py-3 bg-gray-100 border-b border-gray-200">
                                <h4 className="text-sm font-bold text-gray-700">Detail Form Laporan</h4>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama Form</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {item.detailForms.map((form, idx) => (
                                      <tr key={form.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-sm text-gray-600">{idx + 1}</td>
                                        <td className="px-3 py-2 text-sm font-medium text-gray-900">{form.namaForm}</td>
                                        <td className="px-3 py-2">
                                          {form.fileUrl && (
                                            <button
                                              onClick={() => handleDownloadForm(form.fileUrl, form.namaForm)}
                                              className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                              <DownloadIcon className="w-3 h-3 mr-1" />
                                              Download
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {(!dateRange.startDate || !dateRange.endDate) && (
            <div className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Pilih Periode Tanggal Terlebih Dahulu</h3>
              <p className="text-sm text-gray-600">Silakan pilih tanggal mulai dan tanggal akhir periode laporan untuk menampilkan data</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Reset Filter
              </button>
            </div>
          )}

          {dateRange.startDate && dateRange.endDate && filteredData.length === 0 && (
            <div className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-sm text-gray-600">Tidak ada laporan yang sesuai dengan kriteria pencarian</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Reset Filter
              </button>
            </div>
          )}

          {dateRange.startDate && dateRange.endDate && filteredData.length > 0 && (
            <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs md:text-sm text-gray-600">
                  Data diperbarui berdasarkan waktu real-time • 
                  Periode Data: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)} • 
                  Total LJK: {stats.totalLJK}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs md:text-sm text-gray-600">
                    Halaman 1 dari {Math.ceil(filteredData.length / 10) || 1}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal - Tanpa Detail Form Laporan */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-900">Detail Laporan</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getAplikasiBadge(selectedReport.aplikasi)}
                      <span className="text-gray-600 text-sm">• Sandi LJK: {selectedReport.id}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6 space-y-6">
              {/* Informasi Laporan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-base md:text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedReport.namaLaporan}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Aplikasi</h4>
                  {getAplikasiBadge(selectedReport.aplikasi)}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">LJK</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 text-sm md:text-base">{selectedReport.namaLJK}</p>
                    <p className="text-xs md:text-sm text-gray-600">{selectedReport.bidangLJK}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Jenis Periode Laporan</h4>
                  <p className="text-sm md:text-base text-gray-900">{selectedReport.jenisPeriodeLaporan}</p>
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Periode Data</h4>
                  <p className="text-sm md:text-base text-gray-900">{formatDateOnly(selectedReport.periodeData)}</p>
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Tanggal Batas Akhir</h4>
                  <p className="text-sm md:text-base text-gray-900">{formatDateOnly(selectedReport.tglBatas)}</p>
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Tanggal Upload</h4>
                  <p className="text-sm md:text-base text-gray-900">{formatDateTime(selectedReport.tglUpload)}</p>
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Status</h4>
                  <div>
                    {getStatusBadge(selectedReport)}
                  </div>
                </div>
              </div>

              {/* Alasan Sanggahan (khusus APOLO yang memiliki sanggahan) */}
              {selectedReport.disputeReason && (
                <div className="bg-orange-50 rounded-xl p-4 md:p-5 border border-orange-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                    <h4 className="text-base font-semibold text-orange-900">Alasan Sanggahan</h4>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed">{selectedReport.disputeReason}</p>
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
              )}
              
              <div className="flex justify-end space-x-3 pt-4 md:pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringPengawas;