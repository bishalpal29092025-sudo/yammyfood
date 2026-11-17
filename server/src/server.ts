import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";

const app = express();
const PORT = Number(process.env.PORT) || 5001;

// CORS Configuration
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  }),
);

// Clerk authentication middleware
// Must run before route handlers.

app.use(clerkMiddleware());

// Parse JSON request bodies
app.use(express.json());


// Public health-check endpoint
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "YammyFood API is running",
    environment: process.env.NODE_ENV,
  });
});

// Protected authentication endpoint
app.get("/api/auth/me", (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Authentication successful",
    userId,
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`🍔 YammyFood API running at http://localhost:${PORT}`);
});