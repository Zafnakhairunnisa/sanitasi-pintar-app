import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./components/Alert";
import {
  Camera,
  MapPin,
  Droplet,
  Trash2,
  Book,
  Bell,
  Users,
  BarChart as BarChartIcon,
  Settings,
  Home,
  Menu,
  Wind,
  Droplet as WaterDrop,
  Bug,
  FileText,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetchReports, createReport, updateReport, deleteReport } from "./api";

// Mock data
const mockWaterQualityData = [
  { date: "2024-01", ph: 7.2, turbidity: 5, ecoli: 10 },
  { date: "2024-02", ph: 7.1, turbidity: 6, ecoli: 15 },
  { date: "2024-03", ph: 7.3, turbidity: 4, ecoli: 8 },
  { date: "2024-04", ph: 7.0, turbidity: 7, ecoli: 20 },
  { date: "2024-05", ph: 7.4, turbidity: 3, ecoli: 5 },
];

const mockWasteData = [
  { name: "Organik", value: 400 },
  { name: "Plastik", value: 300 },
  { name: "Kertas", value: 200 },
  { name: "Logam", value: 100 },
];

const StatusCard = ({ title, value, color, icon: Icon }) => {
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-600`;

  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <div className="flex items-center justify-between">
        <Icon className={`${textColor} w-8 h-8`} />
        <span className={`${textColor} font-bold text-lg`}>{value}</span>
      </div>
      <h3 className="text-sm font-medium mt-2">{title}</h3>
    </div>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li
    className={`mb-2 ${
      isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <button
      onClick={onClick}
      className="flex items-center w-full p-3 rounded-lg transition duration-300"
    >
      <Icon size={20} className="mr-3" />
      <span>{label}</span>
    </button>
  </li>
);

const SanitasiPintarWebApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [notifications, setNotifications] = useState([]);
  const [waterQualityData, setWaterQualityData] =
    useState(mockWaterQualityData);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [editingReport, setEditingReport] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: "Ada laporan baru tentang kebocoran pipa di Jalan Merdeka",
          type: "warning",
        },
      ]);
    }, 10000);

    loadReports();

    return () => clearInterval(timer);
  }, []);

  const loadReports = async () => {
    try {
      const response = await fetchReports();
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReport) {
        await updateReport(editingReport.id, newReport);
      } else {
        await createReport(newReport);
      }
      setNewReport({ title: "", description: "", location: "" });
      setEditingReport(null);
      loadReports();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-bold mb-6 text-blue-800">
                Dashboard SanitasiPintar
              </h2>

              {/* Ringkasan Status */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <StatusCard
                  title="Kualitas Air"
                  value="Baik"
                  color="green"
                  icon={Droplet}
                />
                <StatusCard
                  title="Pengelolaan Sampah"
                  value="Perlu Perhatian"
                  color="yellow"
                  icon={Trash2}
                />
                <StatusCard
                  title="Air Limbah"
                  value="Normal"
                  color="green"
                  icon={WaterDrop}
                />
                <StatusCard
                  title="Kualitas Udara"
                  value="Sedang"
                  color="yellow"
                  icon={Wind}
                />
                <StatusCard
                  title="Risiko Vektor"
                  value="Rendah"
                  color="green"
                  icon={Bug}
                />
                <StatusCard
                  title="Sanitasi Publik"
                  value="Baik"
                  color="green"
                  icon={Users}
                />
              </div>

              {/* Peringatan dan Notifikasi */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">
                  Peringatan Terkini
                </h3>
                <Alert className="mb-2 bg-yellow-100 border-yellow-400 text-yellow-800">
                  <AlertTitle className="text-lg font-semibold">
                    Perhatian: Kualitas Udara
                  </AlertTitle>
                  <AlertDescription>
                    Indeks kualitas udara menurun di beberapa area. Disarankan
                    untuk mengurangi aktivitas luar ruangan.
                  </AlertDescription>
                </Alert>
                <Alert className="bg-red-100 border-red-400 text-red-800">
                  <AlertTitle className="text-lg font-semibold">
                    Penting: Pembuangan Air Limbah
                  </AlertTitle>
                  <AlertDescription>
                    Terdeteksi penyumbatan di saluran pembuangan Jalan Merdeka.
                    Tim perbaikan telah dikirim.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Grafik Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-700">
                    Tren Kualitas Air
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockWaterQualityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="ph"
                        stroke="#8884d8"
                        name="pH"
                      />
                      <Line
                        type="monotone"
                        dataKey="turbidity"
                        stroke="#82ca9d"
                        name="Kekeruhan"
                      />
                      <Line
                        type="monotone"
                        dataKey="ecoli"
                        stroke="#ffc658"
                        name="E. coli"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-700">
                    Komposisi Sampah Mingguan
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockWasteData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {mockWasteData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Ringkasan Laporan */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">
                  Ringkasan Laporan Masyarakat
                </h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Total Laporan Minggu Ini:</span>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Laporan Terselesaikan:</span>
                    <span className="font-bold text-green-600">35</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Laporan Dalam Proses:</span>
                    <span className="font-bold text-yellow-600">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "report":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              {editingReport ? "Edit Laporan" : "Laporkan Masalah Sanitasi"}
            </h2>
            <form className="space-y-6" onSubmit={handleReportSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Judul Laporan
                </label>
                <input
                  id="title"
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport({ ...newReport, title: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan judul laporan"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi Masalah
                </label>
                <textarea
                  id="description"
                  value={newReport.description}
                  onChange={(e) =>
                    setNewReport({ ...newReport, description: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Jelaskan masalah sanitasi yang Anda temui"
                  rows={4}
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lokasi
                </label>
                <input
                  id="location"
                  value={newReport.location}
                  onChange={(e) =>
                    setNewReport({ ...newReport, location: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan alamat atau koordinat"
                />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="bg-blue-100 text-blue-600 p-3 rounded-lg flex items-center space-x-2 hover:bg-blue-200 transition duration-300"
                >
                  <Camera size={24} />
                  <span>Tambahkan Foto</span>
                </button>
                <button
                  type="button"
                  className="bg-green-100 text-green-600 p-3 rounded-lg flex items-center space-x-2 hover:bg-green-200 transition duration-300"
                >
                  <MapPin size={24} />
                  <span>Gunakan Lokasi Saat Ini</span>
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition duration-300 text-lg font-semibold"
              >
                {editingReport ? "Update Laporan" : "Kirim Laporan"}
              </button>
              {editingReport && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReport(null);
                    setNewReport({ title: "", description: "", location: "" });
                  }}
                  className="bg-gray-300 text-gray-700 p-3 rounded-lg w-full hover:bg-gray-400 transition duration-300 text-lg font-semibold mt-2"
                >
                  Batal Edit
                </button>
              )}
            </form>
          </div>
        );
      case "water":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-bold mb-6 text-blue-800">
                Monitoring Kualitas Air
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">pH Air</h3>
                  <p className="text-3xl font-bold">7.2</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Kekeruhan</h3>
                  <p className="text-3xl font-bold">3 NTU</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">E. coli</h3>
                  <p className="text-3xl font-bold">5 CFU/100mL</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                Tren Kualitas Air
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={waterQualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ph"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="turbidity"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="ecoli"
                    stroke="#ffc658"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "waste":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-bold mb-6 text-blue-800">
                Manajemen Sampah
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                    Komposisi Sampah
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockWasteData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockWasteData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                    Jadwal Pengambilan Sampah
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center bg-gray-100 p-3 rounded">
                      <span>Senin</span>
                      <span>Sampah Organik</span>
                    </li>
                    <li className="flex justify-between items-center bg-gray-100 p-3 rounded">
                      <span>Rabu</span>
                      <span>Sampah Anorganik</span>
                    </li>
                    <li className="flex justify-between items-center bg-gray-100 p-3 rounded">
                      <span>Jumat</span>
                      <span>Sampah Daur Ulang</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case "wastewater":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              Pembuangan Air Limbah
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Status Saluran Pembuangan
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center bg-green-100 p-3 rounded">
                    <span>Saluran Utama</span>
                    <span className="font-bold text-green-600">Normal</span>
                  </li>
                  <li className="flex justify-between items-center bg-yellow-100 p-3 rounded">
                    <span>Saluran Sekunder A</span>
                    <span className="font-bold text-yellow-600">Perhatian</span>
                  </li>
                  <li className="flex justify-between items-center bg-red-100 p-3 rounded">
                    <span>Saluran Sekunder B</span>
                    <span className="font-bold text-red-600">Tersumbat</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Kapasitas Pengolahan
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Terpakai", value: 70 },
                        { name: "Tersedia", value: 30 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      <Cell fill="#82ca9d" />
                      <Cell fill="#8884d8" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-center mt-2">Kapasitas Terpakai: 70%</p>
              </div>
            </div>
          </div>
        );
      case "airQuality":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              Kualitas Udara
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Indeks Kualitas Udara Saat Ini
                </h3>
                <div className="bg-green-100 p-6 rounded-lg text-center">
                  <p className="text-6xl font-bold text-green-600">72</p>
                  <p className="text-xl mt-2">Baik</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Tren Kualitas Udara
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={[
                      { date: "Senin", aqi: 65 },
                      { date: "Selasa", aqi: 70 },
                      { date: "Rabu", aqi: 68 },
                      { date: "Kamis", aqi: 72 },
                      { date: "Jumat", aqi: 75 },
                    ]}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case "diseaseVector":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              Monitoring Vektor Penyakit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Populasi Vektor
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Nyamuk", populasi: 120 },
                      { name: "Tikus", populasi: 45 },
                      { name: "Lalat", populasi: 80 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="populasi" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Area Berisiko Tinggi
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center bg-red-100 p-3 rounded">
                    <span>Kelurahan A</span>
                    <span className="font-bold text-red-600">Tinggi</span>
                  </li>
                  <li className="flex justify-between items-center bg-yellow-100 p-3 rounded">
                    <span>Kelurahan B</span>
                    <span className="font-bold text-yellow-600">Sedang</span>
                  </li>
                  <li className="flex justify-between items-center bg-green-100 p-3 rounded">
                    <span>Kelurahan C</span>
                    <span className="font-bold text-green-600">Rendah</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "edu":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              Pusat Edukasi Sanitasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Kursus Tersedia
                </h3>
                <ul className="space-y-4">
                  <li className="bg-gray-100 p-4 rounded">
                    <h4 className="text-lg font-semibold">
                      Dasar-dasar Sanitasi
                    </h4>
                    <p className="text-sm text-gray-600">
                      Pelajari konsep dasar sanitasi dan kebersihan lingkungan.
                    </p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                      Mulai Kursus
                    </button>
                  </li>
                  <li className="bg-gray-100 p-4 rounded">
                    <h4 className="text-lg font-semibold">
                      Manajemen Sampah Rumah Tangga
                    </h4>
                    <p className="text-sm text-gray-600">
                      Teknik efektif untuk mengelola sampah di rumah Anda.
                    </p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                      Mulai Kursus
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Artikel Terbaru
                </h3>
                <ul className="space-y-4">
                  <li className="border-b pb-4">
                    <h4 className="text-lg font-semibold">
                      Tips Menghemat Air di Rumah
                    </h4>
                    <p className="text-sm text-gray-600">
                      Pelajari cara mudah menghemat air dalam kehidupan
                      sehari-hari.
                    </p>
                    <a href="#" className="text-blue-500 hover:underline">
                      Baca selengkapnya
                    </a>
                  </li>
                  <li className="border-b pb-4">
                    <h4 className="text-lg font-semibold">
                      Pentingnya Sanitasi bagi Kesehatan
                    </h4>
                    <p className="text-sm text-gray-600">
                      Temukan hubungan antara sanitasi yang baik dan kesehatan
                      masyarakat.
                    </p>
                    <a href="#" className="text-blue-500 hover:underline">
                      Baca selengkapnya
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "community":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              Komunitas Sanitasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Forum Diskusi
                </h3>
                <ul className="space-y-4">
                  <li className="bg-gray-100 p-4 rounded">
                    <h4 className="text-lg font-semibold">
                      Cara Mengatasi Bau Septik Tank
                    </h4>
                    <p className="text-sm text-gray-600">
                      Oleh: Andi Susanto - 15 komentar
                    </p>
                    <a href="#" className="text-blue-500 hover:underline">
                      Lihat diskusi
                    </a>
                  </li>
                  <li className="bg-gray-100 p-4 rounded">
                    <h4 className="text-lg font-semibold">
                      Ide Kreatif Daur Ulang Sampah Plastik
                    </h4>
                    <p className="text-sm text-gray-600">
                      Oleh: Siti Nurhaliza - 23 komentar
                    </p>
                    <a href="#" className="text-blue-500 hover:underline">
                      Lihat diskusi
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Kegiatan Komunitas
                </h3>
                <ul className="space-y-4">
                  <li className="border-b pb-4">
                    <h4 className="text-lg font-semibold">
                      Gotong Royong Bersihkan Sungai
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tanggal: 20 Juni 2024 - Lokasi: Sungai Ciliwung
                    </p>
                    <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                      Daftar Partisipasi
                    </button>
                  </li>
                  <li className="border-b pb-4">
                    <h4 className="text-lg font-semibold">
                      Workshop Pengolahan Sampah Organik
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tanggal: 5 Juli 2024 - Lokasi: Balai Desa Sukamaju
                    </p>
                    <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                      Daftar Partisipasi
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              Analitik Sanitasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Statistik Laporan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Jan", laporan: 65 },
                      { name: "Feb", laporan: 59 },
                      { name: "Mar", laporan: 80 },
                      { name: "Apr", laporan: 81 },
                      { name: "Mei", laporan: 56 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="laporan" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Indeks Kebersihan Desa
                </h3>
                <div className="bg-gray-100 p-4 rounded">
                  <h4 className="text-lg font-semibold">Skor Kebersihan</h4>
                  <p className="text-4xl font-bold text-green-600">78/100</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Meningkat 5 poin dari bulan lalu
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                Analisis dan Saran Perbaikan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-yellow-700">
                    Area yang Perlu Perhatian
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>
                      Frekuensi pengambilan sampah di Kelurahan A masih di bawah
                      standar
                    </li>
                    <li>
                      Sistem drainase di area rawan banjir memerlukan perbaikan
                      segera
                    </li>
                    <li>
                      Tingkat partisipasi masyarakat dalam program sanitasi
                      masih rendah
                    </li>
                    <li>
                      Kualitas air di beberapa titik menunjukkan tren penurunan
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-green-700">
                    Rekomendasi Perbaikan
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>
                      Tingkatkan frekuensi pengambilan sampah di Kelurahan A
                      menjadi 3 kali seminggu
                    </li>
                    <li>
                      Lakukan perbaikan dan pembersihan sistem drainase di Jalan
                      Merdeka dan sekitarnya
                    </li>
                    <li>
                      Adakan kampanye kesadaran sanitasi di sekolah-sekolah dan
                      pusat komunitas
                    </li>
                    <li>
                      Implementasikan program insentif untuk partisipasi
                      masyarakat dalam kegiatan sanitasi
                    </li>
                    <li>
                      Lakukan pemeriksaan dan perbaikan pada sistem pengolahan
                      air di area dengan kualitas air menurun
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                Tren dan Prediksi
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  Berdasarkan analisis tren, diproyeksikan bahwa:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                  <li>
                    Indeks kebersihan desa akan meningkat 10% dalam 3 bulan ke
                    depan jika rekomendasi diterapkan
                  </li>
                  <li>
                    Jumlah laporan masalah sanitasi diperkirakan akan menurun
                    20% pada kuartal berikutnya
                  </li>
                  <li>
                    Kualitas air diproyeksikan membaik di 70% area dalam 6 bulan
                    dengan intervensi yang direkomendasikan
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Unduh Laporan Lengkap
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                Jadwalkan Rapat Evaluasi
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const sidebarItems = [
    { icon: Home, label: "Beranda", key: "home" },
    { icon: Camera, label: "Lapor", key: "report" },
    { icon: Droplet, label: "Air", key: "water" },
    { icon: Trash2, label: "Sampah", key: "waste" },
    { icon: WaterDrop, label: "Air Limbah", key: "wastewater" },
    { icon: Wind, label: "Kualitas Udara", key: "airQuality" },
    { icon: Bug, label: "Vektor Penyakit", key: "diseaseVector" },
    { icon: Book, label: "Edukasi", key: "edu" },
    { icon: Users, label: "Komunitas", key: "community" },
    { icon: BarChartIcon, label: "Analitik", key: "analytics" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md">
        <div className="p-4 bg-blue-600 text-white">
          <h1 className="text-2xl font-bold">SanitasiPintar</h1>
        </div>
        <nav className="flex-grow p-4">
          <ul>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                isActive={activeTab === item.key}
                onClick={() => setActiveTab(item.key)}
              />
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {notifications.length}
                </span>
              )}
            </button>
            <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition duration-300 rounded-full p-2">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md p-4">
            <ul>
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeTab === item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
            </ul>
          </div>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SanitasiPintarWebApp;
