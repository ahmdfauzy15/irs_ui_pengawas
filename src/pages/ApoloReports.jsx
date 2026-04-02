import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  Download, 
  Search, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Calendar,
  AlertCircle,
  Eye,
  RefreshCw,
  Shield,
  Building,
  FileCheck,
  AlertTriangle,
  CalendarCheck,
  CalendarDays,
  ClockAlert,
  Calendar as CalendarIcon,
  Clock4,
  CheckSquare,
  Hourglass,
  AlertOctagon,
  User,
  Edit2,
  Save,
  X,
  Check,
  Info,
  AlertTriangle as AlertTriangleIcon,
  MessageSquare,
  FileWarning,
  Download as DownloadIcon,
  ThumbsUp,
  ThumbsDown,
  Send,
  MessageCircle,
  History,
  Mail
} from 'lucide-react';

const ApoloReports = () => {
  // Fungsi untuk mendapatkan waktu saat ini di WIB
  const getCurrentWIBTime = () => {
    const now = new Date();
    return now;
  };

  // State untuk waktu real-time
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [reportsWithPeriod, setReportsWithPeriod] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [showAcknowledgmentModal, setShowAcknowledgmentModal] = useState(false);
  const [selectedAcknowledgment, setSelectedAcknowledgment] = useState(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showDisputeActionModal, setShowDisputeActionModal] = useState(false);
  const [disputeAction, setDisputeAction] = useState(null);
  const [disputeLateDays, setDisputeLateDays] = useState(0);
  const [disputeComment, setDisputeComment] = useState('');
  
  // State untuk filter
  const [filters, setFilters] = useState({
    aplikasi: 'all',
    statusKeterlambatan: 'all'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk filter tanggal
  const [dateRange, setDateRange] = useState(() => {
    const currentDate = getCurrentWIBTime();
    const currentYear = currentDate.getFullYear();
    
    return {
      startDate: `${currentYear - 1}-01-01`,
      endDate: `${currentYear + 1}-12-31`
    };
  });

  // Load data dari localStorage
  const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem('apoloReportsData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

  // Save data ke localStorage
  const saveDataToLocalStorage = (data) => {
    localStorage.setItem('apoloReportsData', JSON.stringify(data));
  };

  // Update waktu real-time WIB setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fungsi untuk menghitung tanggal yang aman
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

  // Generate data untuk setiap aplikasi
  const generateData = () => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1;
    const currentDay = currentDateTime.getDate();
    
    // Hitung tanggal yang aman
    const prevMonth5 = getSafeDate(currentYear, currentMonth - 1, 5);
    const prevMonth10 = getSafeDate(currentYear, currentMonth - 1, 10);
    const prevMonth15 = getSafeDate(currentYear, currentMonth - 1, 15);
    const prevMonth20 = getSafeDate(currentYear, currentMonth - 1, 20);
    const prevMonth25 = getSafeDate(currentYear, currentMonth - 1, 25);
    const prevMonth30 = getSafeDate(currentYear, currentMonth - 1, 30);
    const prevMonth31 = getSafeDate(currentYear, currentMonth - 1, 31);
    
    const currentMonth10 = getSafeDate(currentYear, currentMonth, 10);
    const currentMonth15 = getSafeDate(currentYear, currentMonth, 15);
    const currentMonth20 = getSafeDate(currentYear, currentMonth, 20);
    const currentMonth25 = getSafeDate(currentYear, currentMonth, 25);
    const currentMonth30 = getSafeDate(currentYear, currentMonth, 30);
    
    const nextMonth15 = getSafeDate(currentYear, currentMonth + 1, 15);

    // Data APOLO
    const apoloData = [
      {
        id: "APO001",
        aplikasi: "APOLO",
        jenisLJK: "BU",
        namaLaporan: "LCR Individual",
        periodeLaporan: "Maret 2026",
        tglUpload: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day - 5).padStart(2, '0')}`,
        tglBatas: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day).padStart(2, '0')}`,
        statusKeterlambatan: "Tepat Waktu",
        jmlHariTerlambat: 0,
        LJK: "Bank ABC",
        bidangLJK: "Bank Umum Konvensional",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: false,
        followUpStatus: null,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        disputeStatus: null,
        disputeRejectionMessage: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form LCR Individual - Laporan Utama", fileUrl: "/reports/APO001_form1.pdf" },
          { id: 2, namaForm: "Form LCR Individual - Detail Aset", fileUrl: "/reports/APO001_form2.pdf" }
        ]
      },
      {
        id: "APO002",
        aplikasi: "APOLO",
        jenisLJK: "BU",
        namaLaporan: "LCR Konsolidasi",
        periodeLaporan: "Maret 2026",
        tglUpload: `${prevMonth31.year}-${String(prevMonth31.month).padStart(2, '0')}-${String(prevMonth31.day - 2).padStart(2, '0')}`,
        tglBatas: `${prevMonth31.year}-${String(prevMonth31.month).padStart(2, '0')}-${String(prevMonth31.day).padStart(2, '0')}`,
        statusKeterlambatan: "Tepat Waktu",
        jmlHariTerlambat: 0,
        LJK: "Bank DEF",
        bidangLJK: "Bank Umum Konvensional",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: false,
        followUpStatus: null,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        disputeStatus: null,
        disputeRejectionMessage: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form LCR Konsolidasi - Laporan Utama", fileUrl: "/reports/APO002_form1.pdf" },
          { id: 2, namaForm: "Form LCR Konsolidasi - Detail Liabilitas", fileUrl: "/reports/APO002_form2.pdf" }
        ]
      },
      {
        id: "APO006",
        aplikasi: "APOLO",
        jenisLJK: "BU",
        namaLaporan: "Laporan GWM Individual",
        periodeLaporan: "Maret 2026",
        tglUpload: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day + 3).padStart(2, '0')}`,
        tglBatas: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 3,
        LJK: "BANK BSE",
        bidangLJK: "Bank Umum Syariah",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: true,
        followUpStatus: "pending",
        isDisputed: true,
        disputeReason: "Keterlambatan terjadi karena kendala teknis pada sistem internal LJK. Laporan sudah disiapkan namun gagal terupload. Mohon diberikan keringanan.",
        disputeDocument: "/disputes/APO006_dispute_letter.pdf",
        disputeStatus: "pending",
        disputeRejectionMessage: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form GWM Individual - Utama", fileUrl: "/reports/APO006_form1.pdf" }
        ]
      }
    ];

    // Data eReporting
    const eReportingData = [
      {
        id: "ERP003",
        aplikasi: "eReporting",
        jenisLJK: "BU",
        namaLaporan: "Laporan GWM",
        periodeLaporan: "-",
        tglUpload: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day + 2).padStart(2, '0')}`,
        tglBatas: `${prevMonth10.year}-${String(prevMonth10.month).padStart(2, '0')}-${String(prevMonth10.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 2,
        LJK: "Bank BNI",
        bidangLJK: "Bank Umum Konvensional",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: true,
        followUpStatus: "pending",
        isDisputed: true,
        disputeReason: "Petugas yang bertanggung jawab sedang sakit, laporan akan segera diupload dalam 1-2 hari ke depan.",
        disputeDocument: "/disputes/ERP003_dispute_letter.pdf",
        disputeStatus: "pending",
        disputeRejectionMessage: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form GWM - Utama", fileUrl: "/reports/ERP003_form1.pdf" },
          { id: 2, namaForm: "Form GWM - Detail", fileUrl: "/reports/ERP003_form2.pdf" }
        ]
      }
      
      
    ];
     // Data SIPINA
    const sipinaData = [
      {
        id: "SIP001",
        aplikasi: "SIPINA",
        jenisLJK: "BU",
        namaLaporan: "Laporan Pengawasan Internal",
        periodeLaporan: "2026",
        tglUpload: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day - 4).padStart(2, '0')}`,
        tglBatas: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day).padStart(2, '0')}`,
        statusKeterlambatan: "Tepat Waktu",
        jmlHariTerlambat: 0,
        LJK: "Bank CIMB Niaga",
        bidangLJK: "Bank Umum Konvensional",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: false,
        followUpStatus: null,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form Pengawasan Internal", fileUrl: "/reports/SIP001_form1.pdf" },
          { id: 2, namaForm: "Form Audit Internal", fileUrl: "/reports/SIP001_form2.pdf" }
        ]
      },
      {
        id: "SIP002",
        aplikasi: "SIPINA",
        jenisLJK: "BPR / BPRS",
        namaLaporan: "Laporan Kepatuhan BPR",
        periodeLaporan: "2026",
        tglUpload: "Belum Upload",
        tglBatas: `${currentMonth30.year}-${String(currentMonth30.month).padStart(2, '0')}-${String(currentMonth30.day).padStart(2, '0')}`,
        statusKeterlambatan: "Belum Lapor",
        jmlHariTerlambat: 0,
        LJK: "BPR Dana Mulia",
        bidangLJK: "Bank Perkreditan Rakyat",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: true,
        followUpStatus: "pending",
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form Laporan Kepatuhan", fileUrl: null }
        ]
      },
      {
        id: "SIP003",
        aplikasi: "SIPINA",
        jenisLJK: "Bank Syariah",
        namaLaporan: "Laporan Pengawasan Syariah",
        periodeLaporan: "2026",
        tglUpload: `${prevMonth20.year}-${String(prevMonth20.month).padStart(2, '0')}-${String(prevMonth20.day + 6).padStart(2, '0')}`,
        tglBatas: `${prevMonth20.year}-${String(prevMonth20.month).padStart(2, '0')}-${String(prevMonth20.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 6,
        LJK: "Bank Muamalat",
        bidangLJK: "Bank Umum Syariah",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: true,
        followUpStatus: "pending",
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form Pengawasan Syariah", fileUrl: "/reports/SIP003_form1.pdf" }
        ]
      },
      {
        id: "SIP004",
        aplikasi: "SIPINA",
        jenisLJK: "BU",
        namaLaporan: "Laporan Manajemen Risiko",
        periodeLaporan: "2026",
        tglUpload: `${currentMonth25.year}-${String(currentMonth25.month).padStart(2, '0')}-${String(currentMonth25.day - 3).padStart(2, '0')}`,
        tglBatas: `${currentMonth25.year}-${String(currentMonth25.month).padStart(2, '0')}-${String(currentMonth25.day).padStart(2, '0')}`,
        statusKeterlambatan: "Tepat Waktu",
        jmlHariTerlambat: 0,
        LJK: "Bank Permata",
        bidangLJK: "Bank Umum Konvensional",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: false,
        followUpStatus: null,
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form Manajemen Risiko", fileUrl: "/reports/SIP004_form1.pdf" }
        ]
      },
      {
        id: "SIP005",
        aplikasi: "SIPINA",
        jenisLJK: "BU",
        namaLaporan: "Laporan GCG",
        periodeLaporan: "2026",
        tglUpload: `${currentMonth10.year}-${String(currentMonth10.month).padStart(2, '0')}-${String(currentMonth10.day + 8).padStart(2, '0')}`,
        tglBatas: `${currentMonth10.year}-${String(currentMonth10.month).padStart(2, '0')}-${String(currentMonth10.day).padStart(2, '0')}`,
        statusKeterlambatan: "Terlambat",
        jmlHariTerlambat: 8,
        LJK: "Bank Danamon",
        bidangLJK: "Bank Umum Konvensional",
        ljkAcknowledged: false,
        acknowledgedLateDays: null,
        needFollowUp: true,
        followUpStatus: "pending",
        isDisputed: false,
        disputeReason: null,
        disputeDocument: null,
        supervisorComment: null,
        chatHistory: [],
        detailForms: [
          { id: 1, namaForm: "Form GCG - Utama", fileUrl: "/reports/SIP005_form1.pdf" },
          { id: 2, namaForm: "Form GCG - Detail", fileUrl: "/reports/SIP005_form2.pdf" }
        ]
      }
    ];


    return [...apoloData, ...eReportingData, ...sipinaData];
  };

  const parentData = useMemo(() => {
    const savedData = loadDataFromLocalStorage();
    if (savedData) {
      return savedData;
    }
    return generateData();
  }, [currentDateTime]);

  // Fungsi untuk filter berdasarkan tanggal
  const filterByDateRange = (data) => {
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);

    return data.filter(item => {
      const tglBatas = new Date(item.tglBatas);
      if (isNaN(tglBatas.getTime())) return true;
      return tglBatas >= startDate && tglBatas <= endDate;
    });
  };

  // Fungsi untuk menangani ekspansi baris
  const toggleRowExpand = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Fungsi untuk mengecek apakah aplikasi dapat diedit (APOLO atau eReporting)
  const canEditAplikasi = (aplikasi) => {
    return aplikasi === "APOLO" || aplikasi === "eReporting";
  };

  // Konfirmasi acknowledgment dari LJK (penyesuaian jumlah hari)
  const confirmAcknowledgment = () => {
    if (selectedAcknowledgment) {
      const updatedData = parentData.map(item => {
        if (item.id === selectedAcknowledgment.id) {
          const updatedItem = {
            ...item,
            jmlHariTerlambat: selectedAcknowledgment.newLateDays,
            ljkAcknowledged: true,
            acknowledgedLateDays: selectedAcknowledgment.newLateDays,
            needFollowUp: selectedAcknowledgment.newLateDays > 0 ? true : false,
            followUpStatus: selectedAcknowledgment.newLateDays > 0 ? "pending" : "completed",
            statusKeterlambatan: selectedAcknowledgment.newLateDays === 0 ? "Tepat Waktu" : "Terlambat",
            chatHistory: (item.chatHistory && Array.isArray(item.chatHistory) ? [...item.chatHistory] : []).concat([{
              id: Date.now(),
              type: 'system',
              message: `Pengawas menyesuaikan jumlah hari terlambat menjadi ${selectedAcknowledgment.newLateDays} hari`,
              timestamp: new Date().toISOString(),
              user: 'Pengawas'
            }])
          };
          return updatedItem;
        }
        return item;
      });
      
      setReportsWithPeriod(updatedData);
      saveDataToLocalStorage(updatedData);
      
      setShowAcknowledgmentModal(false);
      setSelectedAcknowledgment(null);
    }
  };

  // Fungsi untuk membuka modal aksi sanggahan
  const handleDisputeAction = (action) => {
    setDisputeAction({ action, report: selectedDispute });
    setDisputeComment('');
    setShowDisputeActionModal(true);
  };

  // Fungsi untuk memproses aksi sanggahan
  const processDisputeAction = () => {
  if (disputeAction.action === 'accept') {
    // Accept dispute - LANGSUNG SET 0 HARI (Tepat Waktu)
    const updatedData = parentData.map(item => {
      if (item.id === disputeAction.report.id) {
        const updatedItem = {
          ...item,
          jmlHariTerlambat: 0,
          statusKeterlambatan: "Tepat Waktu",
          ljkAcknowledged: true,
          acknowledgedLateDays: 0,
          needFollowUp: false,
          followUpStatus: "completed",
          isDisputed: false,
          disputeStatus: "accepted",
          supervisorComment: disputeComment,
          chatHistory: (item.chatHistory && Array.isArray(item.chatHistory) ? [...item.chatHistory] : []).concat([{
            id: Date.now(),
            type: 'supervisor',
            message: `Sanggahan diterima. Status menjadi Tepat Waktu (0 hari terlambat). ${disputeComment ? 'Catatan: ' + disputeComment : ''}`,
            timestamp: new Date().toISOString(),
            user: 'Pengawas'
          }])
        };
        return updatedItem;
      }
      return item;
    });
    
    setReportsWithPeriod(updatedData);
    saveDataToLocalStorage(updatedData);
    
  } else if (disputeAction.action === 'reject') {
    // Reject dispute - tetap dengan jumlah hari terlambat awal
    const updatedData = parentData.map(item => {
      if (item.id === disputeAction.report.id) {
        return {
          ...item,
          isDisputed: false,
          disputeStatus: "rejected",
          disputeRejectionMessage: disputeComment,
          needFollowUp: true,
          followUpStatus: "pending",
          supervisorComment: disputeComment,
          chatHistory: (item.chatHistory && Array.isArray(item.chatHistory) ? [...item.chatHistory] : []).concat([{
            id: Date.now(),
            type: 'supervisor',
            message: `Sanggahan ditolak. Jumlah hari terlambat tetap ${item.jmlHariTerlambat} hari. ${disputeComment ? 'Alasan: ' + disputeComment : ''}`,
            timestamp: new Date().toISOString(),
            user: 'Pengawas'
          }])
        };
      }
      return item;
    });
    
    setReportsWithPeriod(updatedData);
    saveDataToLocalStorage(updatedData);
  }
  
  setShowDisputeActionModal(false);
  setShowDisputeModal(false);
  setSelectedDispute(null);
  setDisputeAction(null);
  setDisputeComment('');
  };

  // Fungsi untuk download file
  const handleDownloadFile = (fileUrl, fileName) => {
    if (fileUrl) {
      alert(`Downloading ${fileName}...`);
      window.open(fileUrl, '_blank');
    } else {
      alert('File tidak tersedia');
    }
  };

  // Proses data dengan periode
  useEffect(() => {
    setReportsWithPeriod(parentData);
  }, [parentData]);

  // Hitung filtered data dengan filter tanggal
  const filteredData = useMemo(() => {
    let filtered = [...parentData];
    
    // Filter berdasarkan tanggal
    filtered = filterByDateRange(filtered);
    
    // Filter berdasarkan search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(parent => 
        parent.namaLaporan.toLowerCase().includes(term) ||
        parent.id.toLowerCase().includes(term) ||
        parent.LJK.toLowerCase().includes(term)
      );
    }
    
    // Filter berdasarkan aplikasi
    if (filters.aplikasi !== 'all') {
      filtered = filtered.filter(parent => parent.aplikasi === filters.aplikasi);
    }
    
    // Filter berdasarkan status keterlambatan
    if (filters.statusKeterlambatan !== 'all') {
      filtered = filtered.filter(parent => parent.statusKeterlambatan === filters.statusKeterlambatan);
    }
    
    return filtered;
  }, [searchTerm, filters, parentData, dateRange]);

  // Options untuk filter
  const getAplikasiOptions = () => {
    const aplikasiList = [...new Set(parentData.map(p => p.aplikasi))];
    return [
      { value: 'all', label: 'Semua Aplikasi' },
      ...aplikasiList.map(app => ({ value: app, label: app }))
    ];
  };

  const getStatusOptions = () => {
    const statusList = [...new Set(parentData.map(p => p.statusKeterlambatan))];
    return [
      { value: 'all', label: 'Semua Status' },
      ...statusList.map(status => ({ value: status, label: status }))
    ];
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Hitung stats
  const stats = useMemo(() => {
    const total = parentData.length;
    const apoloCount = parentData.filter(p => p.aplikasi === "APOLO").length;
    const eReportingCount = parentData.filter(p => p.aplikasi === "eReporting").length;
    const sipinaCount = parentData.filter(p => p.aplikasi === "SIPINA").length;
    const tepatWaktu = parentData.filter(p => p.statusKeterlambatan === "Tepat Waktu").length;
    const terlambat = parentData.filter(p => p.statusKeterlambatan === "Terlambat").length;
    const belumLapor = parentData.filter(p => p.statusKeterlambatan === "Belum Lapor").length;
    const totalLJK = [...new Set(parentData.map(p => p.LJK))].length;
    const needFollowUp = parentData.filter(p => p.needFollowUp === true).length;
    const disputedCount = parentData.filter(p => p.isDisputed === true && p.disputeStatus === "pending").length;
    
    return {
      total,
      apoloCount,
      eReportingCount,
      sipinaCount,
      tepatWaktu,
      terlambat,
      belumLapor,
      totalLJK,
      needFollowUp,
      disputedCount
    };
  }, [parentData]);

  // Reset filters
  const resetFilters = () => {
    const currentDate = getCurrentWIBTime();
    const currentYear = currentDate.getFullYear();
    
    setDateRange({
      startDate: `${currentYear - 1}-01-01`,
      endDate: `${currentYear + 1}-12-31`
    });
    
    setFilters({
      aplikasi: 'all',
      statusKeterlambatan: 'all'
    });
    setSearchTerm('');
  };

  const getAplikasiBadge = (aplikasi) => {
    const styles = {
      'APOLO': 'bg-blue-100 text-blue-800 border-blue-200',
      'eReporting': 'bg-green-100 text-green-800 border-green-200',
      'SIPINA': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[aplikasi] || 'bg-gray-100'}`}>
        {aplikasi}
      </span>
    );
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleExportData = () => {
    const exportData = filteredData.map(parent => ({
      'ID': parent.id,
      'Aplikasi': parent.aplikasi,
      'Nama Laporan': parent.namaLaporan,
      'LJK': parent.LJK,
      'Bidang LJK': parent.bidangLJK,
      'Periode Laporan': parent.periodeLaporan,
      'Tanggal Upload': parent.tglUpload,
      'Tanggal Batas': parent.tglBatas,
      'Status Keterlambatan': parent.statusKeterlambatan,
      'Jumlah Hari Terlambat': parent.jmlHariTerlambat,
      'Jumlah Form': parent.detailForms.length,
      'Dikonfirmasi LJK': parent.ljkAcknowledged ? 'Ya' : 'Tidak',
      'Perlu Tindak Lanjut': parent.needFollowUp ? 'Ya' : 'Tidak',
      'Menyanggah': parent.isDisputed ? 'Ya' : 'Tidak'
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-${new Date().toISOString().split('T')[0]}.csv`;
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

  // Format date for display - hanya tanggal bulan tahun
  const formatDateDisplay = (dateString) => {
    if (dateString === "Belum Upload") return "Belum Upload";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format current date display
  const getCurrentDateDisplay = () => {
    return currentDateTime.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format current time display
  const getCurrentTimeDisplay = () => {
    return currentDateTime.toLocaleTimeString('id-ID', { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Handle konfirmasi LJK (penyesuaian jumlah hari)
  const handleConfirmLJK = (report) => {
    setSelectedAcknowledgment({
      id: report.id,
      oldLateDays: report.jmlHariTerlambat,
      newLateDays: report.jmlHariTerlambat
    });
    setShowAcknowledgmentModal(true);
  };

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-blue-50/20 to-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Monitoring Absensi</h1>
            <p className="text-gray-600 mt-1">Total {stats.total} Laporan • APOLO: {stats.apoloCount} • eReporting: {stats.eReportingCount} • SIPINA: {stats.sipinaCount}</p>
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
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
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

      {/* Stats Cards */}
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Laporan</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Tepat Waktu</p>
                <p className="text-2xl font-bold text-green-900">{stats.tepatWaktu}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Terlambat</p>
                <p className="text-2xl font-bold text-red-900">{stats.terlambat}</p>
              </div>
              <ClockAlert className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Belum Lapor</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.belumLapor}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 shadow-sm border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total LJK</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalLJK}</p>
              </div>
              <Building className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 shadow-sm border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Sanggahan Pending</p>
                <p className="text-2xl font-bold text-orange-900">{stats.disputedCount}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Filter className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter Laporan</h3>
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
            {/* Filter Tanggal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Tanggal Mulai (Min: {currentDateTime.getFullYear() - 1})
                </label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  min={`${currentDateTime.getFullYear() - 1}-01-01`}
                  max={`${currentDateTime.getFullYear() + 1}-12-31`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Tanggal Akhir (Max: {currentDateTime.getFullYear() + 1})
                </label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  min={`${currentDateTime.getFullYear() - 1}-01-01`}
                  max={`${currentDateTime.getFullYear() + 1}-12-31`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Filter Aplikasi
                </label>
                <select
                  value={filters.aplikasi}
                  onChange={(e) => handleFilterChange('aplikasi', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  {getAplikasiOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Filter Status
                </label>
                <select
                  value={filters.statusKeterlambatan}
                  onChange={(e) => handleFilterChange('statusKeterlambatan', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  {getStatusOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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

            {/* Filter Info Summary */}
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900">Filter Aktif:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                      </span>
                      {filters.aplikasi !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Aplikasi: {filters.aplikasi}
                          <button 
                            onClick={() => handleFilterChange('aplikasi', 'all')}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.statusKeterlambatan !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Status: {filters.statusKeterlambatan}
                          <button 
                            onClick={() => handleFilterChange('statusKeterlambatan', 'all')}
                            className="ml-2 text-yellow-600 hover:text-yellow-800"
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

      {/* Reports Table */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-red-900 truncate">
                    Daftar Laporan APOLO, eReporting & SIPINA
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 truncate">
                      Data Aplikasi Pelaporan
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Tanggal:</span> {getCurrentDateDisplay()}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {filteredData.length} dari {stats.total} laporan ditampilkan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredData.length} dari {stats.total} laporan
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Show/Hide</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aplikasi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sandi LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Periode Data</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jml Form</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Upload/Penyampaian</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Batas Akhir</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jml Hari Terlambat</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Konfirmasi LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((parent) => (
                  <React.Fragment key={parent.id}>
                    <tr className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                      parent.statusKeterlambatan === 'Terlambat' ? 'bg-red-50/30' : 
                      parent.statusKeterlambatan === 'Belum Lapor' ? 'bg-yellow-50/30' : ''
                    }`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleRowExpand(parent.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {expandedRows[parent.id] ? 
                            <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          }
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getAplikasiBadge(parent.aplikasi)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parent.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{parent.LJK}</div>
                          <div className="text-xs text-gray-500">{parent.bidangLJK}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {parent.periodeLaporan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                        {parent.detailForms.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDateDisplay(parent.tglUpload)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDateDisplay(parent.tglBatas)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          parent.statusKeterlambatan === 'Terlambat' 
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : parent.statusKeterlambatan === 'Tepat Waktu'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }`}>
                          {parent.statusKeterlambatan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {parent.jmlHariTerlambat > 0 ? `${parent.jmlHariTerlambat} Hari` : '0 Hari'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {/* STEP 1: Konfirmasi LJK - Hanya untuk APOLO/eReporting yang TERLAMBAT dan BELUM dikonfirmasi */}
                          {canEditAplikasi(parent.aplikasi) && 
                           !parent.ljkAcknowledged && 
                           parent.statusKeterlambatan === "Terlambat" && (
                            <button
                              onClick={() => handleConfirmLJK(parent)}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors"
                              title="Konfirmasi penyesuaian jumlah hari terlambat"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Konfirmasi LJK
                            </button>
                          )}
                          
                          {/* STEP 2: Setelah konfirmasi LJK selesai, tampilkan tombol untuk memproses sanggahan */}
                          {canEditAplikasi(parent.aplikasi) && 
                           parent.ljkAcknowledged && 
                           parent.isDisputed && 
                           parent.disputeStatus === "pending" && (
                            <button
                              onClick={() => {
                                setSelectedDispute(parent);
                                setShowDisputeModal(true);
                              }}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 transition-colors"
                              title="Proses sanggahan"
                            >
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Proses Sanggahan
                            </button>
                          )}
                          
                          {/* Status setelah diproses */}
                          {parent.disputeStatus === "accepted" && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Sanggahan Diterima
                            </span>
                          )}
                          
                          {parent.disputeStatus === "rejected" && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                              <XCircle className="w-3 h-3 mr-1" />
                              Sanggahan Ditolak
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(parent)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Lihat detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {parent.chatHistory && parent.chatHistory.length > 0 && (
                            <div className="relative">
                              <MessageCircle className="w-4 h-4 text-gray-400" />
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center">
                                {parent.chatHistory.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                    
                    {/* Child Rows - Detail Forms */}
                    {expandedRows[parent.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="12" className="px-6 py-4">
                          <div className="ml-8">
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                                <h4 className="text-sm font-bold text-gray-700">Detail Form Laporan</h4>
                              </div>
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama Form</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {parent.detailForms.map((form, idx) => (
                                    <tr key={form.id} className="hover:bg-gray-50">
                                      <td className="px-4 py-2 text-sm text-gray-600">{idx + 1}</td>
                                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{form.namaForm}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
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

          {filteredData.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-gray-600">Tidak ada laporan yang sesuai dengan kriteria pencarian atau filter</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Data diperbarui berdasarkan waktu real-time • 
                Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)} • 
                Total LJK: {stats.totalLJK}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Halaman 1 dari {Math.ceil(filteredData.length / 10)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal - Sama seperti sebelumnya */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Detail Laporan</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getAplikasiBadge(selectedReport.aplikasi)}
                      <span className="text-gray-600">• ID: {selectedReport.id}</span>
                      {selectedReport.jmlHariTerlambat > 0 && (
                        <span className="text-red-600 font-medium">
                          • Terlambat: {selectedReport.jmlHariTerlambat} hari
                        </span>
                      )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-lg font-medium text-red-900">
                      {selectedReport.namaLaporan}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Aplikasi</h4>
                  {getAplikasiBadge(selectedReport.aplikasi)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">LJK</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{selectedReport.LJK}</p>
                    <p className="text-sm text-gray-600">{selectedReport.bidangLJK}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Periode Data</h4>
                  <p className="text-gray-900">{selectedReport.periodeLaporan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Upload</h4>
                  <p className="text-gray-900">{formatDateDisplay(selectedReport.tglUpload)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Batas</h4>
                  <p className="text-gray-900">{formatDateDisplay(selectedReport.tglBatas)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Keterlambatan</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    selectedReport.statusKeterlambatan === 'Terlambat' 
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : selectedReport.statusKeterlambatan === 'Tepat Waktu'
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  }`}>
                    {selectedReport.statusKeterlambatan}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jumlah Hari Terlambat</h4>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-medium text-gray-900">
                      {selectedReport.jmlHariTerlambat > 0 ? `${selectedReport.jmlHariTerlambat} Hari` : '0 Hari'}
                    </p>
                  </div>
                  {selectedReport.ljkAcknowledged && (
                    <p className="text-xs text-blue-600 mt-1">
                      <Info className="w-3 h-3 inline mr-1" />
                      Jumlah hari terlambat telah dikonfirmasi oleh LJK
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jumlah Form</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedReport.detailForms.length}</p>
                </div>
              </div>

              {/* Chat History Section */}
              {selectedReport.chatHistory && selectedReport.chatHistory.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Riwayat Konfirmasi LJK</h4>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedReport.chatHistory.map((chat) => (
                      <div key={chat.id} className={`p-3 rounded-lg ${
                        chat.type === 'system' ? 'bg-gray-100 border-l-4 border-gray-400' :
                        chat.type === 'supervisor' ? 'bg-blue-100 border-l-4 border-blue-500' :
                        'bg-white border border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium text-gray-600">{chat.user}</span>
                          <span className="text-xs text-gray-400">{new Date(chat.timestamp).toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-sm text-gray-700">{chat.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport.isDisputed && selectedReport.disputeStatus === "pending" && canEditAplikasi(selectedReport.aplikasi) && (
                <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
                  <div className="flex items-start space-x-3">
                    <FileWarning className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-indigo-900 mb-2">Informasi Sanggahan LJK</h4>
                      <p className="text-sm text-indigo-800 mb-3">{selectedReport.disputeReason}</p>
                      {selectedReport.disputeDocument && (
                        <button
                          onClick={() => handleDownloadFile(selectedReport.disputeDocument, `Sanggahan_${selectedReport.id}`)}
                          className="inline-flex items-center space-x-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                        >
                          <DownloadIcon className="w-4 h-4" />
                          <span>Download Surat Sanggahan</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedReport.supervisorComment && (
                <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900 mb-2">Komentar Pengawas</h4>
                      <p className="text-sm text-green-800">{selectedReport.supervisorComment}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Detail Form Laporan</h4>
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Form</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {selectedReport.detailForms.map((form, idx) => (
                        <tr key={form.id}>
                          <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{form.namaForm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

      {/* Acknowledgment Modal */}
      {showAcknowledgmentModal && selectedAcknowledgment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Konfirmasi</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Atur jumlah hari keterlambatan berdasarkan hari kerja:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Jumlah Hari Terlambat Sebelum:</span>
                    <span className="font-medium text-red-600">{selectedAcknowledgment.oldLateDays} Hari</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Hari Terlambat Sesudah:
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={selectedAcknowledgment.newLateDays}
                        onChange={(e) => setSelectedAcknowledgment({
                          ...selectedAcknowledgment,
                          newLateDays: Math.max(0, parseInt(e.target.value) || 0)
                        })}
                        min="0"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-600">Hari</span>
                    </div>
                    {selectedAcknowledgment.newLateDays === 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        * Jika diatur 0 hari, status akan berubah menjadi Tepat Waktu
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                * Konfirmasi ini akan mengubah status keterlambatan dan memperbarui data form
              </p>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAcknowledgmentModal(false);
                  setSelectedAcknowledgment(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmAcknowledgment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Konfirmasi LJK</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Detail Modal */}
      {showDisputeModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
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
              {/* Informasi LJK */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-indigo-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-lg font-semibold text-indigo-900">Informasi LJK</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nama LJK</p>
                    <p className="font-medium text-gray-900">{selectedDispute.LJK}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bidang LJK</p>
                    <p className="font-medium text-gray-900">{selectedDispute.bidangLJK}</p>
                  </div>
                </div>
              </div>

              {/* Informasi Laporan */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-900">Informasi Laporan</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Jenis Laporan</p>
                    <p className="font-medium text-gray-900">{selectedDispute.namaLaporan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Periode Data</p>
                    <p className="font-medium text-gray-900">{selectedDispute.periodeLaporan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tanggal Batas</p>
                    <p className="font-medium text-gray-900">{formatDateDisplay(selectedDispute.tglBatas)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status Saat Ini</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      selectedDispute.statusKeterlambatan === 'Terlambat' 
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : selectedDispute.statusKeterlambatan === 'Tepat Waktu'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {selectedDispute.statusKeterlambatan}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alasan Sanggahan */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-5 border border-orange-200">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  <h4 className="text-lg font-semibold text-orange-900">Alasan Sanggahan</h4>
                </div>
                <p className="text-gray-800 leading-relaxed">{selectedDispute.disputeReason}</p>
              </div>

              {/* Dokumen Pendukung */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <FileWarning className="w-5 h-5 text-purple-600" />
                  <h4 className="text-lg font-semibold text-purple-900">Dokumen Pendukung</h4>
                </div>
                {selectedDispute.disputeDocument ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleDownloadFile(selectedDispute.disputeDocument, `Sanggahan_${selectedDispute.id}`)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      <span>Download Surat Sanggahan</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Tidak ada dokumen pendukung</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDisputeModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => handleDisputeAction('accept')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Proses Sanggahan</span>
                </button>
                <button
                  onClick={() => handleDisputeAction('reject')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
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
      {/* Dispute Action Modal - LINE 1900-1950 */}
{showDisputeActionModal && disputeAction && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            disputeAction.action === 'accept' ? 'bg-green-100' : 'bg-red-100'
          }`}>
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
          <div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="space-y-2">
                <p className="text-sm text-green-800 font-medium">
                  Dengan menerima sanggahan ini, status laporan akan menjadi:
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Status Saat Ini:</span>
                  <span className="font-medium text-red-600">{disputeAction.report.statusKeterlambatan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Jumlah Hari Terlambat Saat Ini:</span>
                  <span className="font-medium text-red-600">{disputeAction.report.jmlHariTerlambat} Hari</span>
                </div>
                <div className="border-t border-green-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Status Setelah:</span>
                  <span className="font-medium text-green-600">Tepat Waktu</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Jumlah Hari Terlambat Setelah:</span>
                  <span className="font-medium text-green-600">0 Hari</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="space-y-2">
                <p className="text-sm text-red-800 font-medium">
                  Dengan menolak sanggahan ini, status laporan akan tetap:
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Status:</span>
                  <span className="font-medium text-red-600">{disputeAction.report.statusKeterlambatan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Jumlah Hari Terlambat:</span>
                  <span className="font-medium text-red-600">{disputeAction.report.jmlHariTerlambat} Hari</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Comment Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Komentar (Opsional):
          </label>
          <textarea
            value={disputeComment}
            onChange={(e) => setDisputeComment(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tulis komentar untuk LJK..."
          />
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
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
          className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
            disputeAction.action === 'accept'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Konfirmasi</span>
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ApoloReports;