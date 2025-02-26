import React from "react";

const VideoTutorial = () => {
  return (
    <div className="flex flex-col justify-center items-center p-5 md:px-[10rem] w-[99vw] max-md:text-center">
      <h1 className="py-5 font-sans font-semibold text-[24px] md:text-[34px] max-md:text-center">
        DISCOVER THE SECRETS OF GLOWING SKIN
      </h1>
      <iframe
        width="100%"
        height="700px"
        src="https://www.youtube.com/embed/LS_-kL8OqT4"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-[700px] rounded-lg"
      ></iframe>
    </div>
  );
};

export default VideoTutorial;
