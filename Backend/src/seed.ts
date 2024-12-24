import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model"; // Pastikan model User diimpor dengan benar

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Data dummy
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "operator", password: "operator123", role: "operator" },
      { username: "user1", password: "user123", role: "user" },
    ];

    // Hapus semua pengguna yang ada
    await User.deleteMany({});

    // Tambahkan data dummy
    await User.insertMany(users);

    console.log("Data dummy berhasil ditambahkan");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });