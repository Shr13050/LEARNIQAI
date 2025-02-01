import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from 'react-markdown'
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {
  console.log("Chapter Data:", chapter);
  console.log("Content Data:", content);
  console.log("Sections:", content?.chapter?.sections);

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">{chapter?.chapter_name}</h2>
      <h2>{chapter?.about}</h2>

      <div className="flex justify-center my-6">
        {/* video */}
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      <div>
        {content?.content?.chapter?.sections?.map((Item, index) => (
          <div key={index} className="p-5 bg-slate-100 mb-3 rounded-lg">
            <h2 className="font-bold text-lg">{Item?.title}</h2>
            {/* <p className="font-medium whitespace-pre-wrap ">{Item?.explanation}</p> */}
            <ReactMarkdown>{Item?.explanation}</ReactMarkdown>
            {Item?.code_example &&<div className="p-4 bg-black text-white rounded-md mt-3">
              <pre>
                <code>{Item?.code_example}</code>
              </pre>
            </div>}
          </div>
        ))}
      </div>

      {/* content */}
    </div>
  );
};

export default ChapterContent;
