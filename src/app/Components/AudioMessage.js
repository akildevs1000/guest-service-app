// components/AudioMessage.js

import React, { useState, useRef, useEffect } from 'react';

// A simple helper function to format time in minutes:seconds
const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function AudioMessage({ msg }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(formatTime(audio.currentTime));
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        const setAudioData = () => {
            setDuration(formatTime(audio.duration));
        };

        const handleEnded = () => {
            setIsPlaying(false);
            audio.currentTime = 0; // Reset audio to the beginning
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [msg.url]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const audio = audioRef.current;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const newTime = (clickPosition / rect.width) * audio.duration;
        audio.currentTime = newTime;
    };

    return (
        <div className="flex items-center gap-2 p-2 bg-gray-700 rounded-full">
            <audio ref={audioRef} src={msg.url} preload="none"></audio>
            <button onClick={togglePlayPause} className="rounded-full w-8 h-8 flex items-center justify-center text-white bg-gray-500">
                <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
            </button>
            <div className="flex-1 h-1 bg-gray-500 rounded-full relative cursor-pointer" onClick={handleProgressClick}>
                <div className="absolute h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-white text-xs">{currentTime}</span>
        </div>
    );
}