const mongoose = require("mongoose");
const Article = require("./models/Article"); // Adjust path if needed

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/hospitalkb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("✅ Connected to MongoDB");

  // Sample articles
  const sampleArticles = [
    {
      title: "Resetting Your Hospital Email Password",
      content: "<p>To reset your password, go to the IT portal...</p>",
      category: "User Accounts",
      subcategory: "Passwords",
    },
    {
      title: "Fixing a Frozen EMR Workstation",
      content: "<p>If your EMR screen is frozen, follow these steps...</p>",
      category: "Hardware",
      subcategory: "Workstations",
    },
    {
      title: "How to Access PACS from Home",
      content:
        "<p>Download the VPN client and follow the hospital login...</p>",
      category: "Remote Access",
      subcategory: "Imaging Systems",
    },
  ];

  try {
    await Article.deleteMany({});
    console.log("🧹 Cleared existing articles");

    await Article.insertMany(sampleArticles);
    console.log("✅ Seed data inserted");

    db.close();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    db.close();
  }
});
