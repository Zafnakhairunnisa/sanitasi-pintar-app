const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const reportRoutes = require("./routes/reports");
const waterQualityRoutes = require("./routes/waterQuality");
const wasteManagementRoutes = require("./routes/wasteManagement");

app.use("/api/reports", reportRoutes);
app.use("/api/water-quality", waterQualityRoutes);
app.use("/api/waste-management", wasteManagementRoutes);

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
