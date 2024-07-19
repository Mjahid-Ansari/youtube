// Recommended.jsx
import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data.items || []);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryId]); // Add categoryId as a dependency

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div className="recommended">
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <Link to={`/video/${video.snippet.categoryId}/${video.id}`} key={index} className="side-video-list">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <div className="vid-info">
              <h4>{video.snippet.title}</h4>
              <p>{video.snippet.channelTitle}</p>
              <p>{value_converter(video.statistics.viewCount)} Views</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No recommended videos available</p>
      )}
    </div>
  );
};

export default Recommended;
