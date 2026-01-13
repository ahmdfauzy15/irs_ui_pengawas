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
  User
} from 'lucide-react';

const ApoloReports = () => {
  // Fungsi untuk mendapatkan waktu saat ini di WIB (menggunakan local time Indonesia)
  const getCurrentWIBTime = () => {
    const now = new Date();
    return now;
  };

  // State untuk waktu real-time
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [reportsWithPeriod, setReportsWithPeriod] = useState([]);
  
  // State untuk periode tanggal - default 2 tahun kebelakang hingga 1 tahun ke depan
  const [dateRange, setDateRange] = useState(() => {
    const currentDate = getCurrentWIBTime();
    const currentYear = currentDate.getFullYear();
    
    return {
      startDate: `${currentYear - 2}-01-01`, // 2 tahun ke belakang
      endDate: `${currentYear + 1}-12-31`    // 1 tahun ke depan
    };
  });
  
  // State untuk filter
  const [filters, setFilters] = useState({
    periodeStatus: 'aktif',
    subFilters: {
      statusDetail: 'all',
      jenisLJK: 'all',
      periode: 'all',
      searchTerm: '',
      pengawas: 'all'
    }
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showSubFilters, setShowSubFilters] = useState(true);

  // DATA PENGAWAS - TARUH DIBAWAH BANGET
  const pengawasData = [
    { nama: "Zulhamdi", bidang: "Jasa Penilai" },
    { nama: "Yuyu Wahyudin SE", bidang: "Jasa Penilai" },
    { nama: "YUSI KRISMURTIASTUTI", bidang: "Konsultan Aktuaria" },
    { nama: "Yunus Nego Purwono", bidang: "Jasa Penilai" },
    { nama: "Yulizar Djamaluddin Sanrego", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Yulhendri", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Yuke Rahmawati", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Yuhal", bidang: "Jasa Penilai" },
    { nama: "Yudistira Ananda SE", bidang: "Jasa Penilai" },
    { nama: "Yosa Gumelar", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Yos Hendra", bidang: "Jasa Penilai" },
    { nama: "YOHN PS. NAPITUPULU IR", bidang: "Jasa Penilai" },
    { nama: "YENNY TJIAMUDJAJA", bidang: "Jasa Penilai" },
    { nama: "Yanuar Bey", bidang: "Jasa Penilai" },
    { nama: "Y. Tri Sunindyo", bidang: "Jasa Penilai" },
    { nama: "Wisnu Wardhana", bidang: "Jasa Penilai" },
    { nama: "WILLYAMS", bidang: "Jasa Penilai" },
    { nama: "Willy D. Kusnanto", bidang: "Jasa Penilai" },
    { nama: "Willson Kalip", bidang: "Penilai Pasar Modal" },
    { nama: "WIDODO TRIADI NUGROHO", bidang: "Jasa Penilai" },
    { nama: "Wahyu Sri Utomo", bidang: "Penilai Pasar Modal" },
    { nama: "Wahyu Mahendra", bidang: "Jasa Penilai" },
    { nama: "Wahyono Adi", bidang: "Jasa Penilai" },
    { nama: "WAHJU ROHMANTI", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Vivien Heriyanthi", bidang: "Jasa Penilai" },
    { nama: "VENY RINALNY", bidang: "Jasa Penilai" },
    { nama: "Venantius Agus Basuki", bidang: "Konsultan Aktuaria" },
    { nama: "Vania Saphira", bidang: "Jasa Penilai" },
    { nama: "Uswatun Hasanah", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "USMAN HIDAYAT", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Uji Prasetyo", bidang: "Jasa Penilai" },
    { nama: "Tubagus Yoga Maulana", bidang: "Jasa Penilai" },
    { nama: "TUBAGUS SYAFRIAL", bidang: "Konsultan Aktuaria" },
    { nama: "Tri Meryta", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "TOTO SUHARTO IR", bidang: "Jasa Penilai" },
    { nama: "Titik Hinawati", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Timbul Nauli Nainggolan", bidang: "Jasa Penilai" },
    { nama: "TEUKU RAHMATSYAH", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "TEUKU FARDLY NOESHRAN", bidang: "Jasa Penilai" },
    { nama: "Teguh Hermawan", bidang: "Jasa Penilai" },
    { nama: "TASLIM", bidang: "Jasa Penilai" },
    { nama: "Syamsuddin B. Salam", bidang: "Konsultan Aktuaria" },
    { nama: "Syaiful Hasan", bidang: "Jasa Penilai" },
    { nama: "Suzy Israwati", bidang: "Jasa Penilai" },
    { nama: "Suwendho Kemandjaja", bidang: "Penilai Pasar Modal" },
    { nama: "SUWADANA VENTURE CAPITAL", bidang: "Perusahaan Modal Ventura" },
    { nama: "Sutrisno Lasmana", bidang: "Perusahaan Pialang Reasuransi" },
    { nama: "Sutrisna Amijaya", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Susi Meirizki", bidang: "Jasa Penilai" },
    { nama: "Susan Widjojo", bidang: "Jasa Penilai" },
    { nama: "SURYADI", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Sumarno", bidang: "Jasa Penilai" },
    { nama: "Sulistyawati Sendjaja", bidang: "Jasa Penilai" },
    { nama: "SUKARDI", bidang: "Jasa Penilai" },
    { nama: "SUHERWIN ST", bidang: "Jasa Penilai" },
    { nama: "Suhartanto Budhihardjo", bidang: "Jasa Penilai" },
    { nama: "Sugeng Budiyono", bidang: "Jasa Penilai" },
    { nama: "STEVEN TANNER", bidang: "Konsultan Aktuaria" },
    { nama: "Standard Chartered Bank", bidang: "Perantara Pedagang Efek - EBUS" },
    { nama: "SOLUSI GADAI PINTAR", bidang: "Perusahaan Pergadaian" },
    { nama: "Siti Zainab", bidang: "Jasa Penilai" },
    { nama: "SISCA DEBYOLA WIDUHUNG", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Sipo e-Reporting", bidang: "Perusahaan Efek" },
    { nama: "SINAR GADAI PRATAMA", bidang: "Perusahaan Pergadaian" },
    { nama: "Sih Wiryadi", bidang: "Jasa Penilai" },
    { nama: "SIGIT PARYANTO", bidang: "Penilai Pasar Modal" },
    { nama: "Shaifurrokhman Mahfudz", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Setyo Utomo", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Setyo Budi Legowo", bidang: "Jasa Penilai" },
    { nama: "SETIAWAN HERMAN RATMOKO", bidang: "Jasa Penilai" },
    { nama: "SENDANG PANGGANJAR", bidang: "Penilai Pasar Modal" },
    { nama: "SATYA BIMA NUGRAHA", bidang: "Jasa Penilai" },
    { nama: "Satria Wicaksono, SE", bidang: "Jasa Penilai" },
    { nama: "Sarwono", bidang: "Jasa Penilai" },
    { nama: "SAPTO HAJI", bidang: "Jasa Penilai" },
    { nama: "Samsul Rahman", bidang: "Jasa Penilai" },
    { nama: "SALMAN FARIZY", bidang: "Jasa Penilai" },
    { nama: "SALAM", bidang: "Jasa Penilai" },
    { nama: "Safrinal Firdaus", bidang: "Jasa Penilai" },
    { nama: "RYAN PICAL PRATAMA", bidang: "Jasa Penilai" },
    { nama: "RYAN", bidang: "NULL" },
    { nama: "RULLY INTAN AGUSTIAN R", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Rudi Muhamad Safrudin", bidang: "Jasa Penilai" },
    { nama: "Rudi Hendrapurnama", bidang: "Jasa Penilai" },
    { nama: "Rudi Astron Siagian", bidang: "Jasa Penilai" },
    { nama: "RUDDY TRI SANTOSO", bidang: "Jasa Penilai" },
    { nama: "RR. Santi Dewiyani", bidang: "Jasa Penilai" },
    { nama: "Rosye Yunita", bidang: "Jasa Penilai" },
    { nama: "Rosikhun Fadlol", bidang: "Jasa Penilai" },
    { nama: "Ronald Tulus Maruli Silitonga", bidang: "Jasa Penilai" },
    { nama: "Rofiqul Umam", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Rizki Novarino", bidang: "Jasa Penilai" },
    { nama: "Riza Abdilla Chairil", bidang: "Jasa Penilai" },
    { nama: "RIRI ARIESTINI", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Rini Subarningsih", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "RINALDI", bidang: "Konsultan Aktuaria" },
    { nama: "Riki Aryadi Nugraha", bidang: "Jasa Penilai" },
    { nama: "Rikarnadi", bidang: "Jasa Penilai" },
    { nama: "Rifki Khoirudin", bidang: "Jasa Penilai" },
    { nama: "RICHARD KADAR UTOMO", bidang: "Jasa Penilai" },
    { nama: "RIANA MAGDALENA", bidang: "Konsultan Aktuaria" },
    { nama: "RIAN WISNU MURTI", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "Rengganis Kartomo", bidang: "Jasa Penilai" },
    { nama: "Raymunda Norita Kurniati", bidang: "Konsultan Aktuaria" },
    { nama: "Raymond Yoranouw", bidang: "Jasa Penilai" },
    { nama: "Ratna Rosalina", bidang: "Jasa Penilai" },
    { nama: "Rahmat Hidayat", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "RAGIL RAMADHONA SETYADI", bidang: "Konsultan Aktuaria" },
    { nama: "RADITHE PRAMUDITO, SE", bidang: "Jasa Penilai" },
    { nama: "Rachmat Yusuf Kresno Wibowo ST", bidang: "Jasa Penilai" },
    { nama: "Rachmat Manggala Purba", bidang: "Jasa Penilai" },
    { nama: "R. Budi Ginanjar", bidang: "Ahli Syariah Pasar Modal" },
    { nama: "R. Achmanan Ruzally M.Sc", bidang: "Jasa Penilai" }
  ];

  // PERBAIKAN: Simpan mapping pengawas untuk setiap laporan secara tetap
  const [pengawasMapping, setPengawasMapping] = useState({});

  // Update waktu real-time WIB setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // PERBAIKAN: Inisialisasi pengawas mapping sekali saja
  useEffect(() => {
    const initialPengawasMapping = {};
    initialReports.forEach(report => {
      const randomPengawas = pengawasData[Math.floor(Math.random() * pengawasData.length)];
      initialPengawasMapping[report.id] = randomPengawas;
    });
    setPengawasMapping(initialPengawasMapping);
  }, []); // Hanya dijalankan sekali saat mount

  // Data reports APOLO dengan tanggal real-time TANPA pengawas random
  const initialReports = useMemo(() => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1; // 1-indexed
    
    // Fungsi untuk mendapatkan tanggal yang aman (handle rollover tahun)
    const getSafeDate = (year, month, day) => {
      let safeMonth = month;
      let safeYear = year;
      
      // Handle jika bulan minus (dari tahun sebelumnya)
      if (safeMonth <= 0) {
        safeMonth += 12;
        safeYear -= 1;
      }
      // Handle jika bulan lebih dari 12 (dari tahun depan)
      else if (safeMonth > 12) {
        safeMonth -= 12;
        safeYear += 1;
      }
      
      // Pastikan hari valid untuk bulan tersebut
      const lastDayOfMonth = new Date(safeYear, safeMonth, 0).getDate();
      const safeDay = Math.min(day, lastDayOfMonth);
      
      return { year: safeYear, month: safeMonth, day: safeDay };
    };
    
    // Hitung tanggal yang aman untuk berbagai periode
    const prevMonth15 = getSafeDate(currentYear, currentMonth - 1, 15);
    const prevMonth31 = getSafeDate(currentYear, currentMonth - 1, 31);
    const prevMonth10 = getSafeDate(currentYear, currentMonth - 1, 10);
    const prevMonth25 = getSafeDate(currentYear, currentMonth - 1, 25);
    const prevMonth30 = getSafeDate(currentYear, currentMonth - 1, 30);
    
    const currentMonth5 = getSafeDate(currentYear, currentMonth, 5);
    const currentMonth7 = getSafeDate(currentYear, currentMonth, 7);
    const currentMonth10 = getSafeDate(currentYear, currentMonth, 10);
    const currentMonth15 = getSafeDate(currentYear, currentMonth, 15);
    const currentMonth20 = getSafeDate(currentYear, currentMonth, 20);
    const currentMonth25 = getSafeDate(currentYear, currentMonth, 25);
    const currentMonth28 = getSafeDate(currentYear, currentMonth, 28);
    const currentMonth30 = getSafeDate(currentYear, currentMonth, 30);
    
    const nextMonth5 = getSafeDate(currentYear, currentMonth + 1, 5);
    const nextMonth10 = getSafeDate(currentYear, currentMonth + 1, 10);
    const nextMonth15 = getSafeDate(currentYear, currentMonth + 1, 15);
    const nextMonth20 = getSafeDate(currentYear, currentMonth + 1, 20);
    const nextMonth25 = getSafeDate(currentYear, currentMonth + 1, 25);
    
    return [
      {
        id: 1,
        aplikasi: "APOLO",
        jenisLJK: "BU",
        namaLaporan: "LCR Individual",
        periodeLaporan: "Bulanan",
        batasWaktu: "Tanggal 15 bulan berikutnya",
        deadlineDate: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day - 5).padStart(2, '0')}T14:30:00`,
        waktuSubmit: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day - 5).padStart(2, '0')}T14:30:00`,
        waktuDeadline: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu"
      },
      {
        id: 2,
        aplikasi: "APOLO",
        jenisLJK: "BU",
        namaLaporan: "LCR Konsolidasi",
        periodeLaporan: "Bulanan",
        batasWaktu: "Akhir bulan berikutnya",
        deadlineDate: `${prevMonth31.year}-${String(prevMonth31.month).padStart(2, '0')}-${String(prevMonth31.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${prevMonth31.year}-${String(prevMonth31.month).padStart(2, '0')}-${String(prevMonth31.day).padStart(2, '0')}T10:15:00`,
        waktuSubmit: `${prevMonth31.year}-${String(prevMonth31.month).padStart(2, '0')}-${String(prevMonth31.day).padStart(2, '0')}T10:15:00`,
        waktuDeadline: `${prevMonth31.year}-${String(prevMonth31.month).padStart(2, '0')}-${String(prevMonth31.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu"
      },
      {
        id: 3,
        aplikasi: "APOLO",
        jenisLJK: "BPR / BPRS",
        namaLaporan: "Laporan Bulanan BPR/BPRS",
        periodeLaporan: "Bulanan",
        batasWaktu: "Tanggal 10 bulan berikutnya",
        deadlineDate: `${currentMonth10.year}-${String(currentMonth10.month).padStart(2, '0')}-${String(currentMonth10.day).padStart(2, '0')}T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${currentMonth10.year}-${String(currentMonth10.month).padStart(2, '0')}-${String(currentMonth10.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Belum Submit"
      },
      {
        id: 4,
        aplikasi: "APOLO",
        jenisLJK: "Biro Administrasi Efek",
        namaLaporan: "Laporan Biro Administrasi Efek",
        periodeLaporan: "Triwulanan",
        batasWaktu: "Tanggal deadline sesuai ketentuan",
        deadlineDate: `${currentMonth30.year}-${String(currentMonth30.month).padStart(2, '0')}-${String(currentMonth30.day).padStart(2, '0')}T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${currentMonth30.year}-${String(currentMonth30.month).padStart(2, '0')}-${String(currentMonth30.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Belum Submit"
      },
      {
        id: 5,
        aplikasi: "APOLO",
        jenisLJK: "Perusahaan Pemeringkat Efek",
        namaLaporan: "Laporan Perusahaan Pemeringkat Efek",
        periodeLaporan: "Tahunan",
        batasWaktu: "Tanggal deadline sesuai ketentuan",
        deadlineDate: `${nextMonth15.year}-${String(nextMonth15.month).padStart(2, '0')}-${String(nextMonth15.day).padStart(2, '0')}T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${nextMonth15.year}-${String(nextMonth15.month).padStart(2, '0')}-${String(nextMonth15.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Belum Submit"
      },
      {
        id: 6,
        aplikasi: "APOLO",
        jenisLJK: "Bank Kustodian",
        namaLaporan: "Laporan Aktivitas Bank Kustodian",
        periodeLaporan: "Bulanan",
        batasWaktu: "12 H pada bulan berikutnya",
        deadlineDate: `${nextMonth20.year}-${String(nextMonth20.month).padStart(2, '0')}-${String(nextMonth20.day).padStart(2, '0')}T12:00:00`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${nextMonth20.year}-${String(nextMonth20.month).padStart(2, '0')}-${String(nextMonth20.day).padStart(2, '0')}T12:00:00`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Belum Submit"
      },
      {
        id: 7,
        aplikasi: "APOLO",
        jenisLJK: "Bank Kustodian",
        namaLaporan: "Laporan Hasil Pemeriksaan Operasional",
        periodeLaporan: "Tahunan",
        batasWaktu: "90 H setelah laporan tahunan berakhir",
        deadlineDate: `${currentMonth15.year}-${String(currentMonth15.month).padStart(2, '0')}-${String(currentMonth15.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${currentMonth15.year}-${String(currentMonth15.month).padStart(2, '0')}-${String(currentMonth15.day - 1).padStart(2, '0')}T09:30:00`,
        waktuSubmit: `${currentMonth15.year}-${String(currentMonth15.month).padStart(2, '0')}-${String(currentMonth15.day - 1).padStart(2, '0')}T09:30:00`,
        waktuDeadline: `${currentMonth15.year}-${String(currentMonth15.month).padStart(2, '0')}-${String(currentMonth15.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu"
      },
      {
        id: 8,
        aplikasi: "APOLO",
        jenisLJK: "Lembaga Pembiayaan",
        namaLaporan: "Laporan Lembaga Pembiayaan",
        periodeLaporan: "Insidentil",
        batasWaktu: "Tanggal deadline sesuai ketentuan",
        deadlineDate: `${currentMonth25.year}-${String(currentMonth25.month).padStart(2, '0')}-${String(currentMonth25.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${currentMonth25.year}-${String(currentMonth25.month).padStart(2, '0')}-${String(currentMonth25.day).padStart(2, '0')}T14:00:00`,
        waktuSubmit: `${currentMonth25.year}-${String(currentMonth25.month).padStart(2, '0')}-${String(currentMonth25.day).padStart(2, '0')}T14:00:00`,
        waktuDeadline: `${currentMonth25.year}-${String(currentMonth25.month).padStart(2, '0')}-${String(currentMonth25.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Gagal",
        statusKetepatan: "Gagal Kirim"
      },
      {
        id: 9,
        aplikasi: "APOLO",
        jenisLJK: "BU",
        namaLaporan: "Laporan Bulanan BU",
        periodeLaporan: "Bulanan",
        batasWaktu: "Tanggal 20 bulan berikutnya",
        deadlineDate: `${nextMonth20.year}-${String(nextMonth20.month).padStart(2, '0')}-${String(nextMonth20.day).padStart(2, '0')}T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${nextMonth20.year}-${String(nextMonth20.month).padStart(2, '0')}-${String(nextMonth20.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Belum Submit"
      },
      {
        id: 10,
        aplikasi: "APOLO",
        jenisLJK: "BPR / BPRS",
        namaLaporan: "Laporan Triwulan BPR/BPRS",
        periodeLaporan: "Triwulanan",
        batasWaktu: "Tanggal 15 bulan berikutnya",
        deadlineDate: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day + 1).padStart(2, '0')}T14:30:00`,
        waktuSubmit: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day + 1).padStart(2, '0')}T14:30:00`,
        waktuDeadline: `${prevMonth15.year}-${String(prevMonth15.month).padStart(2, '0')}-${String(prevMonth15.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Terlambat"
      },
      {
        id: 11,
        aplikasi: "APOLO",
        jenisLJK: "Bank Kustodian",
        namaLaporan: "Laporan Triwulan Bank Kustodian",
        periodeLaporan: "Triwulanan",
        batasWaktu: "Tanggal 30 bulan berikutnya",
        deadlineDate: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day).padStart(2, '0')}T23:59:59`,
        waktuSubmit: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day).padStart(2, '0')}T23:59:59`,
        waktuDeadline: `${prevMonth30.year}-${String(prevMonth30.month).padStart(2, '0')}-${String(prevMonth30.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Berhasil",
        statusKetepatan: "Tepat Waktu"
      },
      {
        id: 12,
        aplikasi: "APOLO",
        jenisLJK: "Perusahaan Efek",
        namaLaporan: "Laporan Keuangan Perusahaan Efek",
        periodeLaporan: "Bulanan",
        batasWaktu: "Tanggal 5 bulan berikutnya",
        deadlineDate: `${nextMonth5.year}-${String(nextMonth5.month).padStart(2, '0')}-${String(nextMonth5.day).padStart(2, '0')}T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${nextMonth5.year}-${String(nextMonth5.month).padStart(2, '0')}-${String(nextMonth5.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Belum Submit"
      },
      {
        id: 13,
        aplikasi: "APOLO",
        jenisLJK: "Perusahaan Asuransi",
        namaLaporan: "Laporan Bulanan Asuransi",
        periodeLaporan: "Bulanan",
        batasWaktu: "Tanggal 25 bulan berikutnya",
        deadlineDate: `${nextMonth25.year}-${String(nextMonth25.month).padStart(2, '0')}-${String(nextMonth25.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${nextMonth25.year}-${String(nextMonth25.month).padStart(2, '0')}-${String(nextMonth25.day - 2).padStart(2, '0')}T11:20:00`,
        waktuSubmit: `${nextMonth25.year}-${String(nextMonth25.month).padStart(2, '0')}-${String(nextMonth25.day - 2).padStart(2, '0')}T11:20:00`,
        waktuDeadline: `${nextMonth25.year}-${String(nextMonth25.month).padStart(2, '0')}-${String(nextMonth25.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Gagal",
        statusKetepatan: "Gagal Kirim"
      },
      {
        id: 14,
        aplikasi: "APOLO",
        jenisLJK: "Dana Pensiun",
        namaLaporan: "Laporan Triwulan Dana Pensiun",
        periodeLaporan: "Triwulanan",
        batasWaktu: "Tanggal 20 bulan berikutnya",
        deadlineDate: `${nextMonth20.year}-${String(nextMonth20.month).padStart(2, '0')}-${String(nextMonth20.day).padStart(2, '0')}T23:59:59`,
        submissionDate: null,
        waktuSubmit: null,
        waktuDeadline: `${nextMonth20.year}-${String(nextMonth20.month).padStart(2, '0')}-${String(nextMonth20.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Belum Lapor",
        statusKetepatan: "Belum Submit"
      },
      {
        id: 15,
        aplikasi: "APOLO",
        jenisLJK: "Perusahaan Gadai",
        namaLaporan: "Laporan Bulanan Perusahaan Gadai",
        periodeLaporan: "Bulanan",
        batasWaktu: "Tanggal 8 bulan berikutnya",
        deadlineDate: `${currentMonth28.year}-${String(currentMonth28.month).padStart(2, '0')}-${String(currentMonth28.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${currentMonth28.year}-${String(currentMonth28.month).padStart(2, '0')}-${String(currentMonth28.day).padStart(2, '0')}T14:00:00`,
        waktuSubmit: `${currentMonth28.year}-${String(currentMonth28.month).padStart(2, '0')}-${String(currentMonth28.day).padStart(2, '0')}T14:00:00`,
        waktuDeadline: `${currentMonth28.year}-${String(currentMonth28.month).padStart(2, '0')}-${String(currentMonth28.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Gagal",
        statusKetepatan: "Gagal Kirim"
      },
      {
        id: 16,
        aplikasi: "APOLO",
        jenisLJK: "Perusahaan Modal Ventura",
        namaLaporan: "Laporan Tahunan Modal Ventura",
        periodeLaporan: "Tahunan",
        batasWaktu: "Tanggal 31 Maret",
        deadlineDate: `${currentYear}-03-31T23:59:59`,
        submissionDate: `${currentYear}-03-31T16:45:00`,
        waktuSubmit: `${currentYear}-03-31T16:45:00`,
        waktuDeadline: `${currentYear}-03-31T23:59:59`,
        statusPengiriman: "Gagal",
        statusKetepatan: "Gagal Kirim"
      },
      {
        id: 17,
        aplikasi: "APOLO",
        jenisLJK: "Perusahaan Penjaminan",
        namaLaporan: "Laporan Semesteran Penjaminan",
        periodeLaporan: "Semesteran",
        batasWaktu: "Tanggal 30 Juni dan 31 Desember",
        deadlineDate: `${currentYear}-06-30T23:59:59`,
        submissionDate: `${currentYear}-06-30T11:20:00`,
        waktuSubmit: `${currentYear}-06-30T11:20:00`,
        waktuDeadline: `${currentYear}-06-30T23:59:59`,
        statusPengiriman: "Gagal",
        statusKetepatan: "Gagal Kirim"
      },
      {
        id: 18,
        aplikasi: "APOLO",
        jenisLJK: "Wali Amanat",
        namaLaporan: "Laporan Wali Amanat",
        periodeLaporan: "Semesteran",
        batasWaktu: "Tanggal deadline sesuai ketentuan",
        deadlineDate: `${nextMonth10.year}-${String(nextMonth10.month).padStart(2, '0')}-${String(nextMonth10.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-10T10:30:00`,
        waktuSubmit: `${currentYear}-${String(currentMonth).padStart(2, '0')}-10T10:30:00`,
        waktuDeadline: `${nextMonth10.year}-${String(nextMonth10.month).padStart(2, '0')}-${String(nextMonth10.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Gagal",
        statusKetepatan: "Gagal Kirim"
      },
      {
        id: 19,
        aplikasi: "APOLO",
        jenisLJK: "Asuransi Jiwa",
        namaLaporan: "Laporan Asuransi Jiwa",
        periodeLaporan: "Bulanan",
        batasWaktu: "Tanggal deadline sesuai ketentuan",
        deadlineDate: `${nextMonth25.year}-${String(nextMonth25.month).padStart(2, '0')}-${String(nextMonth25.day).padStart(2, '0')}T23:59:59`,
        submissionDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-05T10:30:00`,
        waktuSubmit: `${currentYear}-${String(currentMonth).padStart(2, '0')}-05T10:30:00`,
        waktuDeadline: `${nextMonth25.year}-${String(nextMonth25.month).padStart(2, '0')}-${String(nextMonth25.day).padStart(2, '0')}T23:59:59`,
        statusPengiriman: "Gagal",
        statusKetepatan: "Gagal Kirim"
      }
    ];
  }, [currentDateTime]);

  // Proses data reports dengan tanggal dan hitung status - PERBAIKAN: Tambahkan pengawas dari mapping
  useEffect(() => {
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);

    const now = currentDateTime;
    
    const updatedReports = initialReports.map(report => {
      const deadlineDate = new Date(report.deadlineDate);
      const submissionDate = report.submissionDate ? new Date(report.submissionDate) : null;
      
      // Cek apakah deadline dalam range tanggal yang dipilih
      const isInDateRange = deadlineDate >= startDate && deadlineDate <= endDate;
      
      if (!isInDateRange) {
        return null;
      }
      
      // PERBAIKAN: Ambil pengawas dari mapping yang sudah dibuat
      const pengawasInfo = pengawasMapping[report.id] || { nama: 'Belum ditetapkan', bidang: 'Tidak tersedia' };
      
      // Hitung apakah deadline sudah lewat
      const isDeadlinePassed = deadlineDate < now;
      
      // Tentukan periodeStatus berdasarkan aturan
      let periodeStatus = '';
      
      if (submissionDate) {
        // Sudah ada submission
        if (report.statusPengiriman === 'Gagal' || report.id === 8 || report.id === 13 || report.id === 15 || report.id === 16 || report.id === 17 || report.id === 18 || report.id === 19) {
          // Status Gagal
          periodeStatus = 'aktif';
        } else {
          const isSubmittedOnTime = submissionDate <= deadlineDate;
          if (isSubmittedOnTime) {
            // Berhasil dan tepat waktu -> masuk periode aktif
            periodeStatus = 'aktif';
          } else {
            // Berhasil tapi terlambat -> masuk terlambat
            periodeStatus = 'terlambat';
          }
        }
      } else {
        // Belum submit
        if (isDeadlinePassed) {
          periodeStatus = 'terlambat';
        } else {
          periodeStatus = 'aktif';
        }
      }
      
      // Tentukan status pengiriman dan ketepatan waktu
      let status = 'belum-lapor';
      let statusPengiriman = 'Belum Lapor';
      let statusKetepatanWaktu = 'Belum Submit';
      
      if (submissionDate) {
        const isSubmittedOnTime = submissionDate <= deadlineDate;
        
        // Untuk data Gagal
        if (report.statusPengiriman === 'Gagal' || report.id === 8 || report.id === 13 || report.id === 15 || report.id === 16 || report.id === 17 || report.id === 18 || report.id === 19) {
          status = 'gagal';
          statusPengiriman = 'Gagal';
          statusKetepatanWaktu = 'Gagal Kirim';
        } else {
          status = 'berhasil';
          statusPengiriman = 'Berhasil';
          statusKetepatanWaktu = isSubmittedOnTime ? 'Tepat Waktu' : 'Terlambat';
        }
      } else {
        // Belum submit
        if (isDeadlinePassed) {
          statusKetepatanWaktu = 'Terlambat';
        } else {
          statusKetepatanWaktu = 'Belum Submit';
        }
      }
      
      // Hitung waktu remaining atau terlambat
      const timeDiffMs = deadlineDate - now;
      let hoursRemaining = 0;
      let hoursLate = 0;
      
      if (timeDiffMs > 0) {
        // Masih ada waktu
        hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60));
      } else {
        // Sudah terlambat
        hoursLate = Math.floor(Math.abs(timeDiffMs) / (1000 * 60 * 60));
      }
      
      // Format tanggal untuk display dengan WIB - HANYA TANGGAL SAJA
      const formatDateOnly = (date) => {
        if (!date) return 'Belum ada';
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      };
      
      return {
        ...report,
        pengawas: pengawasInfo.nama,
        bidangPengawas: pengawasInfo.bidang,
        deadlineDate: deadlineDate.toISOString(),
        submissionDate: submissionDate ? submissionDate.toISOString() : null,
        status,
        statusPengiriman,
        statusKetepatanWaktu,
        periodeStatus,
        isDeadlinePassed,
        hoursRemaining,
        hoursLate,
        displayDeadline: formatDateOnly(deadlineDate),
        displaySubmit: submissionDate ? formatDateOnly(submissionDate) : 'Belum submit',
        deadlineObj: deadlineDate,
        submitObj: submissionDate,
        waktuSubmit: submissionDate ? submissionDate.toISOString() : null,
        waktuDeadline: deadlineDate.toISOString()
      };
    }).filter(report => report !== null);
    
    setReportsWithPeriod(updatedReports);
  }, [dateRange, initialReports, currentDateTime, pengawasMapping]); // PERBAIKAN: Tambahkan pengawasMapping ke dependency

  // Get unique pengawas untuk filter
  const uniquePengawas = useMemo(() => {
    const pengawas = [...new Set(reportsWithPeriod.map(report => report.pengawas))];
    return pengawas.map(p => ({
      value: p,
      label: p
    }));
  }, [reportsWithPeriod]);

  // Get unique bidang pengawas
  const uniqueBidangPengawas = useMemo(() => {
    const bidang = [...new Set(reportsWithPeriod.map(report => report.bidangPengawas))];
    return bidang.map(b => ({
      value: b,
      label: b
    }));
  }, [reportsWithPeriod]);

  // Hitung filteredReports berdasarkan filter
  const filteredReports = useMemo(() => {
    let filtered = [...reportsWithPeriod];

    // Filter berdasarkan periode status
    if (filters.periodeStatus !== 'all') {
      filtered = filtered.filter(report => report.periodeStatus === filters.periodeStatus);
    }
    
    // Filter sub-filters
    if (filters.subFilters.statusDetail !== 'all') {
      filtered = filtered.filter(report => {
        switch(filters.subFilters.statusDetail) {
          case 'berhasil-sesuai-waktu':
            return report.status === 'berhasil' && report.statusKetepatanWaktu === 'Tepat Waktu';
          case 'belum-lapor':
            return report.status === 'belum-lapor' && report.periodeStatus === 'aktif';
          case 'gagal':
            return report.status === 'gagal' && report.periodeStatus === 'aktif';
          case 'sudah-lapor':
            return report.status === 'berhasil' && report.periodeStatus === 'terlambat';
          case 'belum-lapor-terlambat':
            return report.status === 'belum-lapor' && report.periodeStatus === 'terlambat';
          default:
            return true;
        }
      });
    }

    if (filters.subFilters.jenisLJK !== 'all') {
      filtered = filtered.filter(report => report.jenisLJK === filters.subFilters.jenisLJK);
    }

    if (filters.subFilters.periode !== 'all') {
      filtered = filtered.filter(report => {
        const periode = report.periodeLaporan.toLowerCase();
        const filterPeriode = filters.subFilters.periode.toLowerCase();
        return periode.includes(filterPeriode);
      });
    }

    // Filter berdasarkan pengawas
    if (filters.subFilters.pengawas !== 'all') {
      filtered = filtered.filter(report => report.pengawas === filters.subFilters.pengawas);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.namaLaporan.toLowerCase().includes(term) ||
        report.jenisLJK.toLowerCase().includes(term) ||
        report.periodeLaporan.toLowerCase().includes(term) ||
        report.batasWaktu.toLowerCase().includes(term) ||
        report.pengawas.toLowerCase().includes(term) ||
        report.bidangPengawas.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filters, searchTerm, reportsWithPeriod]);

  // Get unique jenisLJK
  const uniqueJenisLJK = useMemo(() => {
    const jenisLJK = [...new Set(reportsWithPeriod.map(report => report.jenisLJK))];
    return jenisLJK.map(j => ({
      value: j,
      label: j
    }));
  }, [reportsWithPeriod]);

  // Get unique periode
  const uniquePeriode = useMemo(() => {
    const periode = [...new Set(reportsWithPeriod.map(report => report.periodeLaporan))];
    return periode.map(p => ({
      value: p,
      label: p
    }));
  }, [reportsWithPeriod]);

  // Hitung stats
  const stats = useMemo(() => {
    const activeReports = reportsWithPeriod.filter(r => r.periodeStatus === 'aktif');
    const lateReports = reportsWithPeriod.filter(r => r.periodeStatus === 'terlambat');
    
    return {
      total: reportsWithPeriod.length,
      aktif: activeReports.length,
      terlambat: lateReports.length,
      berhasilTepatWaktu: activeReports.filter(r => r.status === 'berhasil' && r.statusKetepatanWaktu === 'Tepat Waktu').length,
      berhasilTerlambat: lateReports.filter(r => r.status === 'berhasil' && r.statusKetepatanWaktu === 'Terlambat').length,
      belumLaporAktif: activeReports.filter(r => r.status === 'belum-lapor').length,
      belumLaporTerlambat: lateReports.filter(r => r.status === 'belum-lapor').length,
      gagal: activeReports.filter(r => r.status === 'gagal').length,
    };
  }, [reportsWithPeriod]);

  // Status summary
  const periodeStatusSummary = useMemo(() => {
    const summary = {};
    const allStatus = ['aktif', 'terlambat'];
    
    allStatus.forEach(status => {
      summary[status] = reportsWithPeriod.filter(r => r.periodeStatus === status).length;
    });
    
    return summary;
  }, [reportsWithPeriod]);

  // Get date suggestions untuk 1 tahun kebelakang dan bulan realtime saat ini
  const getDateSuggestions = () => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1;
    
    const suggestions = [];
    
    // Tambahkan bulan-bulan dari 1 tahun kebelakang
    for (let year = currentYear - 1; year <= currentYear; year++) {
      const startMonth = year === currentYear - 1 ? 1 : 1;
      const endMonth = year === currentYear - 1 ? 12 : currentMonth;
      
      for (let month = startMonth; month <= endMonth; month++) {
        const monthNames = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const lastDay = new Date(year, month, 0).getDate();
        
        suggestions.push({
          label: `${monthNames[month - 1]} ${year}`,
          start: `${year}-${String(month).padStart(2, '0')}-01`,
          end: `${year}-${String(month).padStart(2, '0')}-${lastDay}`
        });
      }
    }
    
    return suggestions;
  };

  // Sub-filter options
  const getSubFilterOptions = () => {
    if (filters.periodeStatus === 'aktif') {
      return [
        { value: 'all', label: 'Semua Status' },
        { value: 'berhasil-sesuai-waktu', label: 'Berhasil Sesuai Waktu' },
        { value: 'belum-lapor', label: 'Belum Lapor' },
        { value: 'gagal', label: 'Gagal' }
      ];
    } else if (filters.periodeStatus === 'terlambat') {
      return [
        { value: 'all', label: 'Semua Status' },
        { value: 'sudah-lapor', label: 'Sudah Lapor' },
        { value: 'belum-lapor-terlambat', label: 'Belum Lapor' }
      ];
    }
    return [];
  };

  const resetFilters = () => {
    const currentYear = currentDateTime.getFullYear();
    
    setDateRange({
      startDate: `${currentYear - 2}-01-01`,
      endDate: `${currentYear + 1}-12-31`
    });
    
    setFilters({
      periodeStatus: 'aktif',
      subFilters: {
        statusDetail: 'all',
        jenisLJK: 'all',
        periode: 'all',
        searchTerm: '',
        pengawas: 'all'
      }
    });
    setSearchTerm('');
    setSelectedReport(null);
    setShowSubFilters(true);
  };

  const handlePeriodeStatusChange = (periodeStatus) => {
    setFilters(prev => ({ 
      periodeStatus,
      subFilters: {
        statusDetail: 'all',
        jenisLJK: 'all',
        periode: 'all',
        searchTerm: '',
        pengawas: 'all'
      }
    }));
    
    setShowSubFilters(true);
  };

  const handleSubFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      subFilters: {
        ...prev.subFilters,
        [key]: value
      }
    }));
  };

  const handleDateSuggestion = (suggestion) => {
    setDateRange({
      startDate: suggestion.start,
      endDate: suggestion.end
    });
  };

  // Function untuk badge pengawas - TETAP DESIGN MERAH
  const getPengawasBadge = (pengawas, bidang) => {
    return (
      <div className="space-y-1">
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <User className="w-3 h-3 inline mr-1" />
          {pengawas}
        </div>
        <div className="text-xs text-gray-500 pl-1">
          {bidang}
        </div>
      </div>
    );
  };

  // Function untuk badge status pengiriman
  const getStatusBadge = (status) => {
    const styles = {
      'berhasil': 'bg-green-100 text-green-800 border-green-200',
      'belum-lapor': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'gagal': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      'berhasil': 'Berhasil',
      'belum-lapor': 'Belum Lapor',
      'gagal': 'Gagal',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  // Function untuk badge ketepatan waktu
  const getKetepatanBadge = (status) => {
    if (status === 'Tepat Waktu') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Tepat Waktu</span>;
    } else if (status === 'Terlambat') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Terlambat</span>;
    } else if (status === 'Gagal Kirim') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">Gagal Kirim</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
    }
  };

  // Function untuk badge periode status
  const getPeriodeStatusBadge = (status) => {
    const styles = {
      'aktif': 'bg-green-100 text-green-800 border-green-200',
      'terlambat': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      'aktif': 'Periode Aktif',
      'terlambat': 'Terlambat',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  // Function untuk badge jenis LJK
  const getJenisLKJBadge = (jenis) => {
    const colorMap = {
      'BU': 'bg-red-100 text-red-800 border-red-200',
      'BPR / BPRS': 'bg-blue-100 text-blue-800 border-blue-200',
      'Bank Kustodian': 'bg-purple-100 text-purple-800 border-purple-200',
      'Biro Administrasi Efek': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Perusahaan Pemeringkat Efek': 'bg-pink-100 text-pink-800 border-pink-200',
      'Lembaga Pembiayaan': 'bg-teal-100 text-teal-800 border-teal-200',
      'Perusahaan Efek': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Perusahaan Asuransi': 'bg-sky-100 text-sky-800 border-sky-200',
      'Dana Pensiun': 'bg-violet-100 text-violet-800 border-violet-200',
      'Perusahaan Gadai': 'bg-rose-100 text-rose-800 border-rose-200',
      'Perusahaan Modal Ventura': 'bg-lime-100 text-lime-800 border-lime-200',
      'Perusahaan Penjaminan': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      'Wali Amanat': 'bg-amber-100 text-amber-800 border-amber-200',
      'Asuransi Jiwa': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-200';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colorMap[jenis] || defaultStyle}`}>
        {jenis}
      </span>
    );
  };

  // MODIFIKASI: Tampilkan sisa waktu untuk laporan aktif yang Gagal dan Belum Lapor dalam HARI
  const getTimeDisplay = (report) => {
    if (report.periodeStatus === 'aktif') {
      const daysRemaining = Math.floor(report.hoursRemaining / 24);
      
      if (report.status === 'berhasil') {
        return (
          <div className="space-y-1">
            <div className="text-xs text-green-600">
              <span>Submit: {report.displaySubmit}</span>
            </div>
            <div className="text-xs text-blue-600">
              <span>Deadline: {report.displayDeadline}</span>
            </div>
          </div>
        );
      } else if (report.status === 'gagal') {
        // TAMBAHKAN SISA WAKTU UNTUK LAPORAN AKTIF YANG Gagal (dalam hari)
        return (
          <div className="space-y-1">
            <div className="text-xs text-red-600">
              <span>Deadline: {report.displayDeadline}</span>
            </div>
            <div className="text-xs text-yellow-600">
              <span>
                {report.hoursRemaining > 0 ? (
                  <>
                    Sisa waktu: {daysRemaining > 0 ? `${daysRemaining} hari` : 'Kurang dari 1 hari'}
                  </>
                ) : 'Sisa waktu: Segera!'}
              </span>
            </div>
          </div>
        );
      } else {
        // Belum lapor
        return (
          <div className="space-y-1">
            <div className="text-xs text-blue-600">
              <span>Deadline: {report.displayDeadline}</span>
            </div>
            <div className="text-xs text-yellow-600">
              <span>
                {report.hoursRemaining > 0 ? (
                  <>
                    Sisa waktu: {daysRemaining > 0 ? `${daysRemaining} hari` : 'Kurang dari 1 hari'}
                  </>
                ) : 'Sisa waktu: Segera!'}
              </span>
            </div>
          </div>
        );
      }
    } else {
      // Terlambat
      const daysLate = Math.floor(Math.abs(report.hoursLate) / 24);
      
      return (
        <div className="space-y-1">
          {report.status === 'berhasil' ? (
            <div className="text-xs text-green-600">
              <span>Submit: {report.displaySubmit}</span>
            </div>
          ) : (
            <div className="text-xs text-yellow-600">
              <span>Belum submit</span>
            </div>
          )}
          <div className="text-xs text-red-600">
            <span>Deadline: {report.displayDeadline}</span>
          </div>
          <div className="text-xs text-red-500">
            Terlambat: {daysLate > 0 ? `${daysLate} hari` : 'Kurang dari 1 hari'}
          </div>
        </div>
      );
    }
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleExportData = () => {
    const exportData = filteredReports.map(report => ({
      'No': report.id,
      'Nama LJK': report.pengawas,
      'Bidang Pengawas': report.bidangPengawas,
      'Jenis LJK': report.jenisLJK,
      'Nama Laporan': report.namaLaporan,
      'Deadline': report.displayDeadline,
      'Submit': report.displaySubmit,
      'Status Periode': report.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat',
      'Status Pengiriman': report.statusPengiriman,
      'Status Ketepatan Waktu': report.statusKetepatanWaktu,
      'Sisa Waktu': report.periodeStatus === 'aktif' ? 
        (report.hoursRemaining > 0 ? 
          `${Math.floor(report.hoursRemaining / 24)} hari` : 
          'Segera!') : 
        (report.hoursLate > 0 ? 
          `Terlambat ${Math.floor(report.hoursLate / 24)} hari` : 
          'Terlambat')
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apolo-pengawas-reports-${new Date().toISOString().split('T')[0]}.csv`;
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

  // Format date for display
  const formatDateDisplay = (dateString) => {
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

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-blue-50/20 to-white min-h-screen">
      {/* Page Header - TETAP MERAH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Sistem Pengawasan LJK APOLO {currentDateTime.getFullYear()}</h1>
            <p className="text-gray-600 mt-1">Monitoring Pengawasa LJK Laporan APOLO - Total {stats.total} Laporan • {pengawasData.length} LJK</p>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Clock className="w-3 h-3 inline mr-1" />
                Waktu Real-time: {getCurrentTimeDisplay()}
              </p>
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Calendar className="w-3 h-3 inline mr-1" />
                {getCurrentDateDisplay()}
              </p>
              <p className="text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-lg shadow-sm border border-red-200">
                <User className="w-3 h-3 inline mr-1" />
                {pengawasData.length} LJK
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

      {/* Filter Section - TETAP MERAH */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter Periode Laporan {currentDateTime.getFullYear()}</h3>
                  <p className="text-sm text-gray-600">Pilih rentang tanggal deadline terlebih dahulu</p>
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
            {/* Level 0: Periode Tanggal Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Level 0: Pilih Rentang Tanggal Deadline ({currentDateTime.getFullYear() - 2} - {currentDateTime.getFullYear() + 1})
              </h4>
              
              {/* Quick Date Suggestions - MODIFIKASI: 1 tahun kebelakang dan bulan realtime */}
              <div className="mb-4">
                <div className="text-xs text-gray-600 mb-2">
                  Pilihan Cepat Periode {currentDateTime.getFullYear() - 1} - {currentDateTime.getFullYear()} (Bulanan):
                </div>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                  {getDateSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSuggestion(suggestion)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors flex-shrink-0 ${
                        dateRange.startDate === suggestion.start && dateRange.endDate === suggestion.end
                          ? 'bg-blue-100 text-blue-700 border-blue-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Mulai ({currentDateTime.getFullYear() - 2})
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    min={`${currentDateTime.getFullYear() - 2}-01-01`}
                    max={`${currentDateTime.getFullYear() + 1}-12-31`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Akhir ({currentDateTime.getFullYear() + 1})
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    min={`${currentDateTime.getFullYear() - 2}-01-01`}
                    max={`${currentDateTime.getFullYear() + 1}-12-31`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Info Periode & LJK
                  </label>
                  <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                    <div className="text-sm font-medium text-red-900">
                      {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                    </div>
                    <div className="text-xs text-red-700 mt-1">
                      {stats.total} laporan • {pengawasData.length} LJK
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Aktif: {stats.aktif} • Terlambat: {stats.terlambat}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 1: Periode Status Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Level 1: Pilih Status Periode</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handlePeriodeStatusChange('aktif')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.periodeStatus === 'aktif' 
                      ? 'border-green-500 bg-green-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CalendarCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Periode Aktif</div>
                      <div className="text-sm text-gray-600">{periodeStatusSummary.aktif || 0} laporan</div>
                      <div className="text-xs text-green-600">
                        Status: Berhasil, Belum Lapor, Gagal
                      </div>
                    </div>
                  </div>
                  {filters.periodeStatus === 'aktif' && <ChevronDown className="w-5 h-5 text-green-500" />}
                </button>

                <button
                  onClick={() => handlePeriodeStatusChange('terlambat')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.periodeStatus === 'terlambat' 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ClockAlert className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Terlambat</div>
                      <div className="text-sm text-gray-600">{periodeStatusSummary.terlambat || 0} laporan</div>
                      <div className="text-xs text-red-600">
                        Status: Sudah Lapor, Belum Lapor
                      </div>
                    </div>
                  </div>
                  {filters.periodeStatus === 'terlambat' && <ChevronDown className="w-5 h-5 text-red-500" />}
                </button>

                <div className="p-4 rounded-xl border-2 border-gray-200 bg-gradient-to-r from-red-50 to-white">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <User className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Info LJK</div>
                      <div className="text-sm text-red-700 font-medium">
                        {pengawasData.length} LJK Terdaftar
                      </div>
                      <div className="text-xs text-gray-500">
                        Tahun {currentDateTime.getFullYear()} • {uniquePengawas.length} aktif
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2: Sub Filters - TAMBAHKAN FILTER PENGAWAS */}
            {(filters.periodeStatus !== 'all' || showSubFilters) && (
              <div className="mb-6 animate-slide-down">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Level 2: Filter Detail Status & LJK</h4>
                  <button
                    onClick={() => setShowSubFilters(!showSubFilters)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                  >
                    {showSubFilters ? (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Sembunyikan</span>
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4" />
                        <span>Tampilkan</span>
                      </>
                    )}
                  </button>
                </div>
                
                {showSubFilters && (
                  <div className="space-y-6">
                    {/* Status Detail Filter */}
                    <div className="bg-gradient-to-br from-red-50 to-blue-50 p-4 rounded-xl border border-red-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-red-100 rounded-lg mr-3">
                          <Filter className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-red-900">Detail Status dalam {filters.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat'}</h5>
                          <p className="text-sm text-red-700">
                            Pilih status detail untuk memfilter lebih spesifik
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {getSubFilterOptions().map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSubFilterChange('statusDetail', option.value)}
                            className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                              filters.subFilters.statusDetail === option.value
                                ? 'border-red-500 bg-red-50 shadow-sm'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900">{option.label}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {option.value === 'all' 
                                ? 'Tampilkan semua' 
                                : option.value === 'berhasil-sesuai-waktu'
                                ? 'Laporan berhasil sesuai deadline'
                                : option.value === 'belum-lapor'
                                ? 'Belum melakukan pelaporan'
                                : option.value === 'gagal'
                                ? 'Gagal dalam pelaporan (tampilkan sisa waktu)'
                                : option.value === 'sudah-lapor'
                                ? 'Sudah lapor tapi terlambat'
                                : 'Belum lapor dan terlambat'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Filters - TAMBAHKAN FILTER PENGAWAS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Nama LJK
                          <span className="ml-1 text-xs text-gray-500">
                            ({uniquePengawas.length} tersedia)
                          </span>
                        </label>
                        <select
                          value={filters.subFilters.pengawas}
                          onChange={(e) => handleSubFilterChange('pengawas', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                          disabled={uniquePengawas.length === 0}
                        >
                          <option value="all">
                            {uniquePengawas.length === 0 ? 'Tidak tersedia' : 'Nama LJK'}
                          </option>
                          {uniquePengawas.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Building className="w-4 h-4 inline mr-2" />
                          Jenis LJK
                          <span className="ml-1 text-xs text-gray-500">
                            ({uniqueJenisLJK.length} tersedia)
                          </span>
                        </label>
                        <select
                          value={filters.subFilters.jenisLJK}
                          onChange={(e) => handleSubFilterChange('jenisLJK', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                          disabled={uniqueJenisLJK.length === 0}
                        >
                          <option value="all">
                            {uniqueJenisLJK.length === 0 ? 'Tidak tersedia' : 'Semua Jenis LJK'}
                          </option>
                          {uniqueJenisLJK.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Periode Laporan
                          <span className="ml-1 text-xs text-gray-500">
                            ({uniquePeriode.length} tersedia)
                          </span>
                        </label>
                        <select
                          value={filters.subFilters.periode}
                          onChange={(e) => handleSubFilterChange('periode', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                          disabled={uniquePeriode.length === 0}
                        >
                          <option value="all">
                            {uniquePeriode.length === 0 ? 'Tidak tersedia' : 'Semua Periode'}
                          </option>
                          {uniquePeriode.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-3">
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
                            placeholder="Cari nama laporan, LJK, atau bidang..."
                            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Filter Info Summary */}
            <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 rounded-xl border border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Filter className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-red-900">Filter Aktif Tahun {currentDateTime.getFullYear()}:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        {filters.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat'}
                      </span>
                      {filters.subFilters.statusDetail !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                          Detail: {getSubFilterOptions().find(opt => opt.value === filters.subFilters.statusDetail)?.label}
                          <button 
                            onClick={() => handleSubFilterChange('statusDetail', 'all')}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.pengawas !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                          LJK: {filters.subFilters.pengawas}
                          <button 
                            onClick={() => handleSubFilterChange('LJK', 'all')}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.jenisLJK !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          LJK: {filters.subFilters.jenisLJK}
                          <button 
                            onClick={() => handleSubFilterChange('jenisLJK', 'all')}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.periode !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Periode: {filters.subFilters.periode}
                          <button 
                            onClick={() => handleSubFilterChange('periode', 'all')}
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
                <div className="text-sm font-medium text-red-700">
                  {filteredReports.length} laporan ditemukan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table - TAMBAHKAN KOLOM PENGAWAS */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Daftar LJK APOLO {currentDateTime.getFullYear()}</h3>
                  <p className="text-sm text-gray-600">
                    Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)} • 
                    Tanggal: {getCurrentDateDisplay()} • {pengawasData.length} LJK
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Menampilkan {filteredReports.length} dari {stats.total} laporan
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Periode</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Pengiriman</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Ketepatan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Deadline & Sisa Waktu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className={`hover:bg-red-50/50 transition-colors duration-200 ${
                    report.periodeStatus === 'terlambat' ? 'bg-red-50/30' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPengawasBadge(report.pengawas, report.bidangPengawas)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPeriodeStatusBadge(report.periodeStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getJenisLKJBadge(report.jenisLJK)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-md">
                        {report.namaLaporan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getKetepatanBadge(report.statusKetepatanWaktu)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-1 min-w-[200px]">
                        {getTimeDisplay(report)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(report)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada laporan ditemukan</h3>
              <p className="text-gray-600">Tidak ada laporan yang sesuai dengan kriteria pencarian atau filter</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                {pengawasData.length} LJK
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Halaman 1 dari {Math.ceil(filteredReports.length / 10)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal - TAMBAHKAN INFO PENGAWAS */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-900">Detail LJK APOLO {currentDateTime.getFullYear()}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getPeriodeStatusBadge(selectedReport.periodeStatus)}
                      <span className="text-gray-600">• ID: {selectedReport.id}</span>
                      <span className="text-red-600">• LJK: {selectedReport.pengawas}</span>
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
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama LJK</h4>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-lg font-medium text-red-900">
                      {selectedReport.pengawas}
                    </p>
                    <p className="text-sm text-red-700">
                      {selectedReport.bidangPengawas}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis LJK</h4>
                  {getJenisLKJBadge(selectedReport.jenisLJK)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Periode</h4>
                  <div className="flex items-center space-x-2">
                    {getPeriodeStatusBadge(selectedReport.periodeStatus)}
                    <span className="text-sm text-gray-600">
                      Deadline: {selectedReport.displayDeadline}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Saat Ini</h4>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-medium text-blue-900">
                      {getCurrentDateDisplay()}
                    </p>
                    <p className="text-sm text-blue-700">
                      {getCurrentTimeDisplay()}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {selectedReport.namaLaporan}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Waktu Submit</h4>
                  <div className={`p-3 rounded-lg ${
                    selectedReport.status === 'berhasil' ? 'bg-green-50' : 
                    selectedReport.status === 'belum-lapor' ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedReport.displaySubmit}
                    </p>
                    <div className="mt-2 text-sm text-gray-600">
                      {selectedReport.status === 'berhasil' ? '✅ Berhasil submit' : 
                       selectedReport.status === 'belum-lapor' ? '⏳ Belum submit' : '❌ Gagal submit'}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Ketepatan Waktu</h4>
                  {getKetepatanBadge(selectedReport.statusKetepatanWaktu)}
                  <div className="mt-2 text-sm text-gray-600">
                    {selectedReport.periodeStatus === 'aktif' ? (
                      selectedReport.status === 'berhasil' ? (
                        <div className="text-green-600">
                          ✅ Submit: {selectedReport.displaySubmit}
                        </div>
                      ) : (
                        <div className="text-blue-600">
                          ⏳ Sisa waktu: {selectedReport.hoursRemaining > 0 ? 
                            `${Math.floor(selectedReport.hoursRemaining / 24)} hari` : 
                            'Segera!'}
                        </div>
                      )
                    ) : (
                      <div className="text-red-600">
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Pengiriman</h4>
                  {getStatusBadge(selectedReport.status)}
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedReport.status === 'berhasil' 
                      ? 'Laporan berhasil dikirim' 
                      : selectedReport.status === 'belum-lapor'
                      ? 'Belum melakukan pengiriman'
                      : 'Gagal dalam pengiriman'}
                  </p>
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
    </div>
  );
};

export default ApoloReports;