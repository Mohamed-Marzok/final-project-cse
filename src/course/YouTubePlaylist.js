import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Card } from "@mui/material";

const YouTubePlaylist = () => {
  const apiKey = "AIzaSyAcNit2gHFdykc_D0Sfi4mD6yzA4_eOqP4";
  const playlistId = "PLOmL3sL-afbRVTvedkIrQcDwg2UY0JGTF";
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      let allVideos = [];
      let nextPageToken = "";

      try {
        do {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems`,
            {
              params: {
                part: "snippet",
                playlistId: playlistId,
                maxResults: 50,
                pageToken: nextPageToken,
                key: apiKey,
              },
            }
          );

          allVideos = [...allVideos, ...response.data.items];
          nextPageToken = response.data.nextPageToken || "";
        } while (nextPageToken);

        setVideos(allVideos);
        if (allVideos.length > 0) {
          setSelectedVideo(allVideos[0].snippet.resourceId.videoId);
        }
      } catch (error) {
        console.error("Error fetching playlist", error);
      }
    };

    fetchPlaylist();
  }, [apiKey, playlistId]);

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <Container>
      {videos.length > 0 ? (
        <>
          <Sidebar>
            {videos.map((video) => (
              <VideoItem
                key={video.snippet.resourceId.videoId}
                onClick={() =>
                  handleVideoSelect(video.snippet.resourceId.videoId)
                }
                isSelected={selectedVideo === video.snippet.resourceId.videoId}
              >
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                />
                <p>{video.snippet.title}</p>
              </VideoItem>
            ))}
          </Sidebar>
          <VideoPlayer>
            {selectedVideo && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${selectedVideo}`}
                width="100%"
                height="100%"
                controls
              />
            )}
          </VideoPlayer>
        </>
      ) : (
        <p>☹ No Videos For This Course ☹</p>
      )}
    </Container>
  );
};

export default YouTubePlaylist;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Sidebar = styled(Card)`
  width: 300px;
  overflow-y: auto !important;
  overflow-x: hidden;
  border-right: 1px solid #ddd;
  padding: 10px;
  border-radius: 0 !important;
  @media (max-width: 768px) {
    width: 100%;
    max-height: 30vh;
  }

  /* Stylish scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #471fade3;
    border-radius: 4px;
  }
`;

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) =>
    props.isSelected ? "#471fade3" : "transparent"};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};

  img {
    width: 100px;
    height: 50px;
    margin-right: 10px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }

  &:hover {
    background-color: #471fad54;
    color: #000;
  }
`;

const VideoPlayer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  overflow: hidden;
  width: 60%;
  height: 80%;
  align-self: center;
  border: 10px solid #ccc;
  box-shadow: 0px 0px 10px #777;
  @media (max-width: 768px) {
    width: 100%;
    height: 70vh;
  }
`;
