import { useState, useRef, useMemo, useEffect } from "react";
import { db } from "../db";
import { convertNumberToTime } from "../utils/control-player";

export default function MusicPlayer() {
  const [song, changeSong] = useState(db[0]);
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState<number | undefined>();

  const audioWidth = useMemo(() => {
    if (audioRef.current?.duration && time) {
      return ((time / audioRef.current.duration) * 100).toFixed(2);
    }
  }, [time]);

  const handlePlay = () => {
    setPlay(true);

    if (audioRef.current) {
      audioRef.current.play();
      setInterval(() => {
        setTime(audioRef.current?.currentTime);
      }, 100);
    }
  };

  const handlePause = () => {
    setPlay(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handlePrev = () => {
    changeSong(db[1]);
    setPlay(false);
  };

  const handleNext = () => {
    changeSong(db[0]);
    setPlay(false);
  };

  return (
    <div className="rounded-2xl p-5 w-80 h-92 bg-[#151a2297] ">
      <img className="rounded-xl" src={`${song.thumbnail}.png`}></img>
      <div className="p-4 space-y-0">
        <h1 className="text-center text-white text-[16px]">{song.songName}</h1>
        <p className="text-slate-600 text-center text-[12px]">{song.autor}</p>
      </div>
      {/* reproductor */}
      <div>
        {/* time */}

        <div className="flex justify-between">
          <p className="text-slate-600 text-[10px] py-1">
            {time ? convertNumberToTime(time) : "00:00"}
          </p>
          <p className="text-slate-600 text-[10px] py-1">
            {time && audioRef.current
              ? convertNumberToTime(audioRef.current?.duration)
              : "00:00"}
          </p>
        </div>
        <audio ref={audioRef} src={`/${song.name}.mp3`} preload="auto" />
        {/* progress */}
        <div className=" rounded-xl w-98 h-1 shadow-3xl bg-white">
          {audioWidth && (
            <div
              style={{ width: `${audioWidth}%` }}
              className="bg-[#C93B76] h-1 rounded-xl shadow-2xl"
            ></div>
          )}
        </div>
        <div className="flex justify-center w-full space-x-2 pt-8 pb-2">
          {/* primer boton */}
          <button
            onClick={handlePrev}
            className=" w-12 h-12  rounded-full p-2 hover:border-2 hover:border-[#C93B76]"
          >
            <img
              src="/Stop_and_play_fill-1.svg"
              alt="Icon"
              className="w-full"
              color="white"
            ></img>
          </button>

          {/* segundo boton */}
          <button
            onClick={() => {
              play ? handlePause() : handlePlay();
            }}
            className=" w-12 h-12 bg-[#C93B76] rounded-full p-2"
          >
            {play ? (
              <img src="/pause.svg" alt="Icon" className="w-6 mx-auto"></img>
            ) : (
              <img src="/Play_fill.svg" alt="Icon" className="w-full"></img>
            )}
          </button>

          {/* tercer boton */}
          <button
            onClick={handleNext}
            className=" w-12 h-12 rounded-full p-2 hover:border-2 hover:border-[#C93B76] "
          >
            <img
              src="/Stop_and_play_fill_reverse.svg"
              alt="Icon"
              className="w-full"
              color="white"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}
