"use client";
import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import DataType from "../interfaces/Datatype";
import Video from '../components/Video';
import VideoData from "../interfaces/VideoData";
import Close from "../components/svgs/close";

async function getVideos(
  page: number,
  limit: number,
  searchTerm: string
): Promise<{ data: VideoData[]; pageCount: number }> {
  const response = await fetch(
    `/api/data?page=${page}&limit=${limit}&search=${searchTerm}`
  );

  const responseData = await response.json();
  return {
    data: responseData.data.map((d: DataType) => ({
      title: d.snippet.title,
      description: d.snippet.description,
      id: d.id.videoId,
      image: d.snippet.thumbnails.high.url,
    })),
    pageCount: parseInt(responseData.pageCount),
  };
}

export default function Home() {
  const limit = 10;
  const [sideBarVisibilityInMobile, setSideBarVisibilityInMobile] =
    useState<boolean>(false);
  const [items, setItems] = useState<
    {
      title: string;
      description: string;
      id: string;
      image: string;
    }[]
  >([]);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentVideo, setCurrentVideo] = useState<VideoData>();

  useEffect(() => {
    getVideos(page, limit, searchTerm).then((response) => {
      setItems(response.data);
      setCurrentVideo(response.data[0]);
      setPageCount(response.pageCount);
    });
  }, [page]);

  useEffect(() => {
    if (searchTerm === "") return;
    getVideos(1, limit, searchTerm).then((response) => {
      setItems(response.data);
      setCurrentVideo(response.data[0]);
      setPageCount(response.pageCount);
    });
  }, [searchTerm]);

  return (
    <div className="flex h-screen relative">
      <div className="md:hidden absolute z-30">
        <button onClick={() => setSideBarVisibilityInMobile(!sideBarVisibilityInMobile)} className="navbar-burger flex items-center text-grey-600 p-3">
          {sideBarVisibilityInMobile ? (
            <Close />
          ) : (
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>

          )}
        </button>
      </div>
      <SideMenu
        items={items}
        setSearchTerm={setSearchTerm}
        pageCount={pageCount}
        currentVideo={currentVideo!}
        page={page}
        setPage={setPage}
        setCurrentVideo={setCurrentVideo}
        sideBarVisibilityInMobile={sideBarVisibilityInMobile}
      />
      <Video videoData={currentVideo!}/>
    </div>
  );
}
