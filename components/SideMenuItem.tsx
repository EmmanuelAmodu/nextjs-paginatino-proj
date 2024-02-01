import Image from "next/image";
import VideoData from "../interfaces/VideoData";

export default function SideMenuItem(props: {
  item: VideoData,
  image: string;
  setCurrentVideo: (videoId: VideoData) => void;
  isActive: boolean;
}) {
  return (
    <div
      onClick={() => props.setCurrentVideo(props.item)}
      className={[
        "group relative rounded-2xl space-y-2 overflow-hidden mb-10",
        props.isActive && "border-red-400 border-2"
      ].join(' ')}
    >
      <Image
        className="mx-auto h-120 w-full object-cover object-top transition duration-500 group-hover:scale-105"
        src={props.item.image}
        alt={props.item.title}
        loading="lazy"
        width={180}
        height={120}
      />
      <div className="absolute top-0 inset-x-0 h-max mt-auto pt-2 pl-4 pb-2 bg-black dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0 group-hover:bg-opacity-50">
        <h4 className="text-sm font-semibold dark:text-gray-700 text-white">
          {props.item.title}
        </h4>
        <p className="text-sm mt-2 text-gray-300 dark:text-gray-600">
          {props.item.description}
        </p>
      </div>
    </div>
  );
}
