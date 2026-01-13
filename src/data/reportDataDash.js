// src/data/reportDataDash.js
import laporann from '../data/laporann.json';

// Fungsi untuk mengambil dan memproses data dari JSON
export const processReportData = () => {
  const data = laporann;
  
  // Hitung statistik
  const totalReports = data.length;
  const successfulReports = data.filter(report => report.Status_Pengiriman === 'Berhasil').length;
  const onTimeReports = data.filter(report => report.Status_Ketepatan_Waktu === 'Tepat Waktu').length;
  const failedReports = data.filter(report => report.Status_Pengiriman === 'Tidak Berhasil').length;
  const lateReports = data.filter(report => report.Status_Ketepatan_Waktu === 'Terlambat').length;
  
  // Kelompokkan berdasarkan Aplikasi
  const reportsBySystem = {
    'APOLO': data.filter(report => report.Aplikasi === 'APOLO'),
    'Ereporting': data.filter(report => report.Aplikasi === 'Ereporting'),
    'SiPina': data.filter(report => report.Aplikasi === 'SiPina')
  };
  
  // Kelompokkan berdasarkan Jenis LJK
  const reportsByLJKType = {};
  data.forEach(report => {
    const jenis = report.Jenis_LJK;
    if (!reportsByLJKType[jenis]) {
      reportsByLJKType[jenis] = [];
    }
    reportsByLJKType[jenis].push(report);
  });
  
  // Kelompokkan berdasarkan Periode
  const reportsByPeriod = {};
  data.forEach(report => {
    const period = report.Periode_Laporan || 'Tidak Diketahui';
    if (!reportsByPeriod[period]) {
      reportsByPeriod[period] = [];
    }
    reportsByPeriod[period].push(report);
  });
  
  // Laporan terbaru (ambil 10 terbaru)
  const recentReports = [...data]
    .sort((a, b) => b.No - a.No)
    .slice(0, 10)
    .map(report => ({
      id: report.No,
      nama: report.Nama_Laporan,
      sistem: report.Aplikasi,
      jenis: report.Jenis_LJK,
      periode: report.Periode_Laporan,
      status_pengiriman: report.Status_Pengiriman,
      status_ketepatan: report.Status_Ketepatan_Waktu,
      batas_waktu: report.Batas_Waktu_Penyampaian
    }));
  
  return {
    totalReports,
    successfulReports,
    onTimeReports,
    failedReports,
    lateReports,
    reportsBySystem,
    reportsByLJKType,
    reportsByPeriod,
    recentReports,
    allReports: data,
    summary: {
      byStatus: {
        berhasil: successfulReports,
        terlambat: lateReports,
        tidak_berhasil: failedReports
      },
      byApplication: {
        APOLO: reportsBySystem.APOLO?.length || 0,
        Ereporting: reportsBySystem.Ereporting?.length || 0,
        SiPina: reportsBySystem.SiPina?.length || 0
      }
    }
  };
};

// Data untuk dashboard
export const homeReportsData = () => {
  const processedData = processReportData();
  
  return processedData.recentReports.map(report => ({
    id: report.id,
    jenis: report.nama,
    sistem: report.sistem,
    periode: report.periode,
    status: report.status_pengiriman === 'Berhasil' ? 'berhasil' : 'tidak-berhasil',
    ketepatan: report.status_ketepatan,
    tanggal: 'Terbaru',
    jenis_ljk: report.jenis,
    batas_waktu: report.batas_waktu
  }));
};

export const welcomeStats = [
   {
  number: 50,
  label: 'Jumlah LJK',
  icon: 'People',
  color: 'bg-gradient-to-br from-red-500 to-red-600',
  trend: 'up'
},
  
  {
    number: processReportData().totalReports,
    label: 'Total Laporan',
    icon: 'FileText',
    color: 'bg-gradient-to-br from-red-600 to-red-700',
    trend: 'up'
  },
  {
    number: processReportData().successfulReports,
    label: 'Berhasil Dikirim',
    icon: 'CheckCircle',
    color: 'bg-gradient-to-br from-green-600 to-green-700',
    trend: 'up'
  },
 
  {
    number: processReportData().failedReports,
    label: 'Gagal Dikirim',
    icon: 'XCircle',
    color: 'bg-gradient-to-br from-yellow-600 to-yellow-700',
    trend: 'down'
  }
];

// Data untuk Quick Access Cards
export const quickAccessCards = [
  {
    title: "APOLO",
    description: "Aplikasi Pelaporan Online yang dikembangkan oleh Otoritas Jasa Keuangan (OJK) untuk melayani Lembaga Jasa Keuangan (LJK) dalam menyampaikan kewajiban pelaporan secara daring.",
    reports: processReportData().reportsBySystem.APOLO?.length || 0,
    color: "apolo",
    link: "https://pelaporan.id/Account/Login"
  },
  {
    title: "E-Reporting",
    description: "Sistem pelaporan elektronik yang digunakan oleh emiten atau perusahaan publik untuk menyampaikan laporan secara elektronik kepada Otoritas Jasa Keuangan.",
    reports: processReportData().reportsBySystem.Ereporting?.length || 0,
    color: "ereporting",
    link: "https://pelaporan.id/Account/Login"
  },
  {
    title: "SIPINA",
    description: "Penyampaian laporan informasi nasabah asing dilakukan secara daring,dapat mengirimkan data nasabah asing secara terstruktur sesuai ketentuan yang berlaku.",
    reports: processReportData().reportsBySystem.SiPina?.length || 0,
    color: "sipina",
    link: "https://pelaporan.id/Account/Login"
  }
];

// Data aktivitas terbaru
export const recentActivityData = [
  {
    id: 1,
    type: 'compliance',
    title: "Dana Pensiun ASDP - Laporan triwulanan Q4 2023 diverifikasi OJK",
    description: "Laporan lengkap dengan compliance score 98/100, dikirim 5 hari sebelum deadline",
    time: 'Hari ini, 10:30',
    system: 'APOLO',
    status: 'success',
    ljk: 'Dana Pensiun ASDP',
    kategori: 'Program Pensiun Manfaat Pasti',
    compliance_score: 98,
    deadline_status: 'early'
  },
  {
    id: 2,
    type: 'deadline',
    title: "Bank of America, N.A - Batas akhir laporan bulan Januari 2024",
    description: "Deadline: 15 Feb 2024 (3 hari lagi), belum ada pengajuan",
    time: 'Hari ini, 09:45',
    system: 'E-REPORTING',
    status: 'warning',
    ljk: 'Bank of America, N.A',
    kategori: 'EBUS',
    compliance_score: 92,
    deadline_status: 'approaching'
  },
  {
    id: 3,
    type: 'non_compliance',
    title: "BANK KALSEL - Keterlambatan laporan bulan Desember 2023",
    description: "Melewati batas waktu 7 hari, surat peringatan dikirim",
    time: 'Kemarin, 16:20',
    system: 'APOLO',
    status: 'danger',
    ljk: 'BANK KALSEL KANTOR PUSAT',
    kategori: 'EBUS',
    compliance_score: 85,
    deadline_status: 'late'
  },
  {
    id: 4,
    type: 'review',
    title: "CHARLIE SIMANJUNTAK SH - Laporan penilaian properti dalam review",
    description: "Penilaian aset senilai Rp 45 Miliar, proses verifikasi OJK",
    time: 'Kemarin, 14:15',
    system: 'E-REPORTING',
    status: 'info',
    ljk: 'CHARLIE SIMANJUNTAK SH',
    kategori: 'Jasa Penilai',
    compliance_score: 95,
    deadline_status: 'on_time'
  },
  {
    id: 5,
    type: 'compliance',
    title: "Capital Global Ventura - Laporan kuartalan Q4 2023 approved",
    description: "Semua dokumen lengkap, audit internal selesai, rating compliance: Excellent",
    time: '2 hari lalu, 11:30',
    system: 'APOLO',
    status: 'success',
    ljk: 'Capital Global Ventura',
    kategori: 'Modal Ventura',
    compliance_score: 96,
    deadline_status: 'on_time'
  }
];

// Fungsi untuk mendapatkan statistik real-time
export const getRealTimeStats = () => {
  const data = processReportData();
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  
  // Hitung laporan yang mendekati batas waktu
  const nearDeadlineReports = data.allReports.filter(report => {
    if (!report.Batas_Waktu_Penyampaian) return false;
    // Logika sederhana untuk menentukan laporan yang mendekati deadline
    const deadlineText = report.Batas_Waktu_Penyampaian.toLowerCase();
    return deadlineText.includes('hari') || deadlineText.includes('besok');
  }).length;
  
  // Hitung laporan bulan ini
  const monthlyReports = data.allReports.filter(report => {
    const period = report.Periode_Laporan?.toLowerCase();
    return period === 'bulanan' || period === 'mingguan' || period === 'harian';
  }).length;
  
  return {
    successRate: data.totalReports > 0 
      ? Math.round((data.successfulReports / data.totalReports) * 100) 
      : 0,
    activeReports: data.allReports.filter(r => r.Status_Pengiriman === 'Berhasil').length,
    needsAttention: data.allReports.filter(r => 
      r.Status_Pengiriman === 'Tidak Berhasil' || r.Status_Ketepatan_Waktu === 'Terlambat'
    ).length,
    daysToDeadline: nearDeadlineReports,
    monthlyReports
  };
};