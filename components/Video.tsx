"use client";

import VideoData from "../interfaces/VideoData";

const Video = (props: { videoData: VideoData }) => {
  return (
    props.videoData && (
      <div className="flex flex-grow justify-center pt-20 relative px-6  h-full peer:transition ease-out delay-150 duration-200">
        <div className="bg-black container mx-auto max-h-[400px] max-w-[600px]">
          <iframe
            className="h-full w-full rounded-lg"
            src={`https://www.youtube.com/embed/${props.videoData.id}?&autoplay=1&mute=1&showinfo=0&start=0&rel=0`}
            allowFullScreen
          ></iframe>

          <div className="flex flex-col mt-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {props.videoData.title}
            </h1>
            <p className="text-gray-800">{props.videoData.description}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Video;
