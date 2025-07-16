import React from "react";

const VideoTutorial = () => {
  return (
    <div className="flex flex-col justify-center items-center p-5 md:px-[5rem] w-[99vw] max-md:text-center">
      <h2 className="text-2xl lg:text-4xl max-md:text-center mb-6">
        DISCOVER THE SECRETS OF GLOWING SKIN
      </h2>
      <div className="w-full max-w-[800px] aspect-[4/3] md:aspect-[16/9] mx-auto rounded-lg overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/LS_-kL8OqT4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoTutorial;
