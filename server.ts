import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes (Mocking SIAKAD & WiFi Infrastructure) ---

  // Mock Data Store
  const studentData = {
    name: "Budi Santoso",
    nim: "2023001",
    attendance: 85, // percent
    schedule: [
      { id: 1, course: "Algoritma Pemrograman", time: "08:00 - 09:40", location: "Gedung B, R.204", status: "upcoming" },
      { id: 2, course: "Struktur Data", time: "10:00 - 11:40", location: "Lab Komputer 1", status: "upcoming" },
      { id: 3, course: "Bahasa Inggris", time: "13:00 - 14:40", location: "Gedung A, R.101", status: "finished" },
    ]
  };

  const wifiData = [
    { id: "ap-lib-01", name: "Perpustakaan Lt. 1", signal: "red", clients: 45, suggestion: "Penuh" },
    { id: "ap-lib-02", name: "Perpustakaan Lt. 2", signal: "yellow", clients: 20, suggestion: "Sedang" },
    { id: "ap-gaz-c", name: "Gazebo Gedung C", signal: "green", clients: 5, suggestion: "Lancar Jaya" },
    { id: "ap-kantin", name: "Kantin Utama", signal: "yellow", clients: 25, suggestion: "Cukup Ramai" },
    { id: "ap-hall", name: "Aula Utama", signal: "green", clients: 2, suggestion: "Sangat Lancar" },
  ];

  // API Endpoints
  app.get("/api/student", (req, res) => {
    // In a real app, this would fetch from SIAKAD API using the authenticated user's token
    res.json(studentData);
  });

  app.get("/api/wifi-status", (req, res) => {
    // In a real app, this would fetch from Mikrotik/Radius API
    res.json(wifiData);
  });

  app.post("/api/support/report", (req, res) => {
    const { location, issue } = req.body;
    console.log(`[Support Ticket] New report from ${location}: ${issue}`);
    // Simulate ticket creation
    res.json({ success: true, ticketId: "TICKET-" + Date.now() });
  });

  // --- Vite Middleware ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (if built)
    app.use(express.static(path.resolve(__dirname, "dist")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
