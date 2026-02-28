import { motion } from "framer-motion";
import { Wifi, MapPin, Clock, Calendar, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface StudentData {
  name: string;
  nim: string;
  attendance: number;
  schedule: {
    id: number;
    course: string;
    time: string;
    location: string;
    status: "upcoming" | "finished";
  }[];
}

interface WifiData {
  id: string;
  name: string;
  signal: "green" | "yellow" | "red";
  clients: number;
  suggestion: string;
}

export default function Dashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [wifiStatus, setWifiStatus] = useState<WifiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportStatus, setReportStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // In a real app, these would be fetch calls to the backend
        // const studentRes = await fetch("/api/student");
        // const wifiRes = await fetch("/api/wifi-status");
        
        // Mocking for now since backend might not be fully reachable in preview iframe without full setup
        const mockStudent = {
          name: "Budi Santoso",
          nim: "2023001",
          attendance: 85,
          schedule: [
            { id: 1, course: "Algoritma Pemrograman", time: "08:00 - 09:40", location: "Gedung B, R.204", status: "upcoming" },
            { id: 2, course: "Struktur Data", time: "10:00 - 11:40", location: "Lab Komputer 1", status: "upcoming" },
            { id: 3, course: "Bahasa Inggris", time: "13:00 - 14:40", location: "Gedung A, R.101", status: "finished" },
          ]
        };

        const mockWifi = [
          { id: "ap-lib-01", name: "Perpustakaan Lt. 1", signal: "red", clients: 45, suggestion: "Penuh" },
          { id: "ap-lib-02", name: "Perpustakaan Lt. 2", signal: "yellow", clients: 20, suggestion: "Sedang" },
          { id: "ap-gaz-c", name: "Gazebo Gedung C", signal: "green", clients: 5, suggestion: "Lancar Jaya" },
          { id: "ap-kantin", name: "Kantin Utama", signal: "yellow", clients: 25, suggestion: "Cukup Ramai" },
          { id: "ap-hall", name: "Aula Utama", signal: "green", clients: 2, suggestion: "Sangat Lancar" },
        ];

        setStudent(mockStudent as any);
        setWifiStatus(mockWifi as any);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReport = () => {
    setReportStatus("submitting");
    setTimeout(() => {
      setReportStatus("success");
      setTimeout(() => setReportStatus("idle"), 3000);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Wifi className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">SmartConnect</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{student?.name}</p>
              <p className="text-xs text-slate-500">{student?.nim}</p>
            </div>
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
              {student?.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">Selamat Datang Mahasiswa UNUGHA!</h2>
          <p className="text-indigo-100">Koneksi WiFi Anda stabil. Selamat belajar!</p>
        </motion.div>

        {/* Academic Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Schedule */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                Jadwal Kuliah Hari Ini
              </h3>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                Semester 4
              </span>
            </div>
            <div className="space-y-4">
              {student?.schedule.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex-shrink-0 w-16 text-center">
                    <p className="text-sm font-bold text-slate-900">{item.time.split(" - ")[0]}</p>
                    <p className="text-xs text-slate-500">{item.time.split(" - ")[1]}</p>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-900">{item.course}</h4>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {item.status === "upcoming" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Segera
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-600">
                        Selesai
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Attendance & Quick Links */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                Presensi
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Kehadiran Semester Ini</span>
                <span className="text-2xl font-bold text-slate-900">{student?.attendance}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div 
                  className="bg-emerald-500 h-2.5 rounded-full" 
                  style={{ width: `${student?.attendance}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Minimal kehadiran 75% untuk UAS.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors text-left">
                  Upload Tugas
                </button>
                <button className="p-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors text-left">
                  Materi Kuliah
                </button>
                <button className="p-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors text-left">
                  KRS Online
                </button>
                <button className="p-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors text-left">
                  Perpustakaan
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Crowd-Sensing Signal Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Wifi className="h-5 w-5 text-indigo-600" />
                Peta Kepadatan Sinyal
              </h3>
              <p className="text-sm text-slate-500">Pantau kepadatan Access Point secara real-time.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Lancar</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Ramai</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Padat</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wifiStatus.map((ap) => (
              <div key={ap.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-900">{ap.name}</h4>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    ap.signal === "green" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                    ap.signal === "yellow" ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" :
                    "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  )}></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">{ap.clients} Users</span>
                </div>
                <p className="text-xs text-slate-500 italic">
                  Saran: <span className="font-medium text-slate-700">{ap.suggestion}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </main>

      {/* Floating Action Button for Support */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReport}
          disabled={reportStatus !== "idle"}
          className={cn(
            "flex items-center gap-2 px-6 py-4 rounded-full shadow-lg text-white font-semibold transition-all",
            reportStatus === "success" ? "bg-emerald-500" : "bg-red-600 hover:bg-red-700"
          )}
        >
          {reportStatus === "idle" && (
            <>
              <AlertTriangle className="h-5 w-5" />
              Lapor Lemot
            </>
          )}
          {reportStatus === "submitting" && (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Mengirim...
            </>
          )}
          {reportStatus === "success" && (
            <>
              <CheckCircle className="h-5 w-5" />
              Terkirim!
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
