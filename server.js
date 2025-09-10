
/**
 * Liquid Glass Music — Express edition
 * - Express app with /public static
 * - Modular routes: auth, songs, playlists, admin
 * - File-based storage under /data
 * - Port: 6940
 */
const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const { DATA_DIR } = require("./lib/datastore");

const app = express();
const PORT = 6940;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "liquid-glass-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 12 }
}));

// Static
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/songs", require("./routes/songs"));
app.use("/api/playlists", require("./routes/playlists"));
app.use("/api/admin", require("./routes/admin"));

// Index
app.get("/", (req,res)=> res.sendFile(path.join(__dirname, "public", "index.html")));

// Ensure default admin exists on startup (in case /api/auth not hit)
(function ensureAdmin(){
  const { getUsers, setUsers, uuid } = require("./lib/datastore");
  const users = getUsers();
  if (!users.some(u=>u.isAdmin)) {
    const bcrypt = require("bcrypt");
    (async ()=>{
      const hash = await bcrypt.hash("admin", 10);
      users.push({ id: uuid(), username:"admin", passwordHash:hash, isAdmin:true, createdAt:new Date().toISOString(), likes:[], follows:[], recent:[] });
      setUsers(users);
      console.log("Seeded default admin: admin/admin");
    })();
  }
})();

app.listen(PORT, ()=> console.log("Liquid Glass Music (Express) running at http://localhost:"+PORT));
