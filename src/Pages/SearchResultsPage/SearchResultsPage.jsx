import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return;

      const API_KEY = 'AIzaSyArVOdiooCVZFP3tb1cReT00gv8qI7wmQM'; // Ensure your API key is correct
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodedSearchQuery}&key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setSearchResults(response.data.items || []);
      } catch (error) {
        if (error.response) {
          console.error('Error fetching search results:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error fetching search results: No response received', error.request);
        } else {
          console.error('Error:', error.message);
        }
        console.error('Error config:', error.config);
      }
    };

    fetchSearchResults();
  }, [searchQuery]); // Add searchQuery as a dependency

  const handleVideoSelect = (videoId) => {
    navigate(`/video/${searchQuery}/${videoId}`);
  };

  return (
    <div className="search-results-page">
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id.videoId} className="search-result-item" onClick={() => handleVideoSelect(result.id.videoId)}>
              <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
              <p>{result.snippet.title}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
