import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Reveal from "./Reveal";

function News() {
  const [data, setData] = useState([]); // All fetched articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("publishedAt"); // Sorting option
  const [language, setLanguage] = useState("en");
  const pageSize = 4; // Articles per page
  const apiBaseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://aconews-a37c8.web.app/";

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/api/news`, {
          params: { keyword, sortBy, language },
        });

        setData(response.data.articles);
        setTotalResults(response.data.totalResults);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [keyword, sortBy, language]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return dateString
      ? new Date(dateString).toLocaleString("en-US", options)
      : "Unknown Date";
  };

  const handleSearch = () => {
    setKeyword(searchInput);
    setPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "sortBy":
        setSortBy(value);
        break;
      case "language":
        setLanguage(value);
        break;

      default:
        break;
    }
    setPage(1);
  };

  const currentPageData = data.slice((page - 1) * pageSize, page * pageSize);

  if (loading)
    return (
      <AiOutlineLoading3Quarters className="animate-spin mx-auto text-4xl" />
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <div className="flex justify-center items-center w-full mx-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <Button
            className="px-6 py-3 rounded-lg font-semibold text-white bg-orange-500 border border-orange-700 hover:bg-orange-600 hover:border-orange-800 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none"
            color="deep-orange"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center w-full">
          <label>
            Sort By:
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="p-2 border border-gray-300 rounded ml-2"
            >
              <option value="publishedAt">Latest</option>
              <option value="relevance">Relevance</option>
              <option value="popularity">Popularity</option>
            </select>
          </label>

          <label className="ml-4">
            Language:
            <select
              value={language}
              onChange={(e) => handleFilterChange("language", e.target.value)}
              className="p-2 border border-gray-300 rounded ml-2"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="uk">Ukranian</option>
              <option value="hi">Hindi</option>
            </select>
          </label>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-r-8 border-l-2 px-3 border-indigo-500 rounded-md">
        {currentPageData.map((article, index) => (
          <Card
            key={index}
            className=" flex flow-col justify-center items-center py-3 px-2 border-b-2 border-emerald-500 rounded-md "
          >
            <Reveal>
              <CardHeader className="relative h-56 flex flex-col justify-center items-center">
                <img
                  src={article.image || "https://via.placeholder.com/300"}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-sm border-b-2 border-emerald-500"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className=" font-bold">
                  {article.title}
                </Typography>
                <Typography>
                  {article.description || "No description available."}
                </Typography>
                <Button
                  className=" bg-neutral-900 border-neutral-200 hover:border-b-8 hover:border-r-8 rounded-md  hover:transition-all px-2 cursor-pointer"
                  onClick={() => window.open(article.url, "_blank")}
                >
                  Read More
                </Button>
              </CardBody>
            </Reveal>
          </Card>
        ))}
      </div>

      <footer className="flex justify-between items-center mt-4 text-neutral-600  bg-neutral-950">
        <Button
          className={`${page === 1 ? " text-neutral-600" : " "}`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="  text-neutral-400">
          Page {page} of {Math.ceil(data.length / pageSize)}
        </span>
        <Button
          className={`${
            page === Math.ceil(data.length / pageSize)
              ? " text-neutral-600"
              : " "
          }`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === Math.ceil(data.length / pageSize)}
        >
          Next
        </Button>
      </footer>
    </div>
  );
}

export default News;
