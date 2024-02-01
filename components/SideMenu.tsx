"use client";
import VideoData from "../interfaces/VideoData";
import SideMenuItem from "./SideMenuItem";

type SideMenuProps = {
  items: { title: string; description: string; id: string; image: string }[];
  setSearchTerm: (query: string) => void;
  setPage: (page: number) => void;
  pageCount: number;
  page: number;
  sideBarVisibilityInMobile: boolean;
  setCurrentVideo: (video: VideoData) => void;
  currentVideo: VideoData;
};

const SideMenu: React.FC<SideMenuProps> = ({
  items,
  setSearchTerm,
  pageCount,
  setPage,
  page,
  sideBarVisibilityInMobile,
  setCurrentVideo,
  currentVideo,
}) => {
  let activePage = page;

  const changePage = (pageNo: number) => {
    activePage = pageNo;
    setPage(pageNo);
  };

  return (
    <div
      className={[
        "z-10 flex flex-col w-64 h-screen px-4 py-0 bg-white border-r dark:bg-black-800 dark:border-gray-600 relative top-0",
        "md:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 absolute md:relative",
        sideBarVisibilityInMobile ? "left-0" : "-left-96 hidden md:flex" ].join(' ')
      }
    >
      <div className="flex flex-col items-center mt-10 -mx-2">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 p-2">
          <svg
            className="w-5 h-5 absolute ml-3 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search videos..."
            autoComplete="off"
            aria-label="Search videos"
            className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6 overflow-y-scroll overflow-x-hidden">
        <nav>
          {items?.map((item) => (
            <SideMenuItem
              item={item}
              key={item.id}
              isActive={currentVideo.id === item.id}
              image={item.image}
              setCurrentVideo={setCurrentVideo}
            />
          ))}
        </nav>
      </div>

      <ul className="inline-flex -space-x-px text-sm">
        <li onClick={() => setPage(page > 1 ? page - 1 : 1)}>
          <p className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </p>
        </li>
        {pageCount > 0 &&
          Array.from({ length: pageCount }, (_, i) => (
            <li key={i} onClick={() => changePage(i + 1)}>
              <p
                className={
                  "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " +
                  (activePage === i + 1 ? "bg-blue-200" : "bg-white")
                }
              >
                {i + 1}
              </p>
            </li>
          ))}
        <li onClick={() => setPage(page < pageCount ? page + 1 : pageCount)}>
          <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
