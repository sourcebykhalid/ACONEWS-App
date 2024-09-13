const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// API route to fetch news
app.get("/api/news", async (req, res) => {
  const {keyword, language} = req.query;
  const apiKey = functions.config().gnews.apikey;
  const pageSize = 4;

  try {
    const response = await axios.get(`https://gnews.io/api/v4/search`, {
      params: {
        q: keyword || "latest",
        lang: language,
        country: "us",
        token: apiKey,
        max: pageSize,
      },
    });

    res.json({
      articles: response.data.articles,
      totalResults: response.data.totalArticles,
    });
  } catch (error) {
    console.error(
      "Error fetching news:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Error fetching news");
  }
});

// Expose your Express API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
