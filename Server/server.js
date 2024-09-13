// Backend changes
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes

// API route to fetch news
app.get("/api/news", async (req, res) => {
  const {
    keyword = "",
    language = ["en", "es", "uk", "hi"],
    category = "",
    sortBy = "publishedAt",
  } = req.query;
  const apiKey = process.env.GNEWS_API_KEY;
  const pageSize = 20; // Fetch a larger set of articles

  try {
    const response = await axios.get(`https://gnews.io/api/v4/search`, {
      params: {
        q: keyword || "latest",
        lang: language,
        country: "",
        token: apiKey,
        max: pageSize, // Fetch a larger number of articles
        sortBy,
      },
    });

    res.json({
      articles: response.data.articles,
      totalResults: response.data.totalArticles,
    });
  } catch (error) {
    console.error(
      "Error fetching news:",
      error?.response?.data || error.message || error
    );
    res.status(500).send("Error fetching news");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
