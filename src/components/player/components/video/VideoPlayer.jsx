import { FaPause, FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const VideoPlayer = ({ url, sections, onProgress }) => {
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const [, setCurrentTime] = useState(0);
    const playerHeight = window.innerHeight - 80;
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTabHidden, setIsTabHidden] = useState(false);

    const handleProgress = (progress) => {
        const { playedSeconds } = progress;
        setCurrentTime(playedSeconds);
        onProgress(playedSeconds);
    };

    // Fullscreen change handler
    const handleFullscreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
    };

    // Toggle fullscreen
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            } else if (containerRef.current.mozRequestFullScreen) { // Firefox
                containerRef.current.mozRequestFullScreen();
            } else if (containerRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
                containerRef.current.webkitRequestFullscreen();
            } else if (containerRef.current.msRequestFullscreen) { // IE/Edge
                containerRef.current.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    };

    // Add event listeners for fullscreen and visibility change
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsFullScreen(false);
            }
        };

        const handleVisibilityChange = () => {
            setIsTabHidden(document.hidden);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleProgressBarClick(e);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleProgressBarClick(e);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleProgressBarClick = (e) => {
        const progressBar = e.target;
        const rect = progressBar.getBoundingClientRect();
        const clickPositionInPixels = e.clientX - rect.left;
        const clickPositionInPercentage = clickPositionInPixels / rect.width;
        const newCurrentTime =
            clickPositionInPercentage * playerRef.current?.getDuration();
        playerRef.current?.seekTo(newCurrentTime);
    };

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full bg-vid-player-bg relative group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className="relative w-full">
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    width={"100%"}
                    height={
                        isMobile ? "100%" : isFullScreen ? playerHeight + 80 : playerHeight
                    }
                    onProgress={handleProgress}
                    pip={true}
                    className="relative aspect-video"
                />

                <div className="absolute top-0 left-0 w-full h-full" />
                {isTabHidden && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 z-50"></div>
                )}
            </div>

            {/* controls */}
            <div
                className={`flex justify-between items-center gap-5 px-2 absolute bottom-0 left-0 bg-vid-player-controls-bg w-full py-2 
                ${showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}
            >
                <div className="flex justify-start items-center gap-4">
                    {playerRef.current?.getInternalPlayer() &&
                    playerRef.current?.getInternalPlayer().paused ? (
                        <button
                            onClick={() => playerRef.current?.getInternalPlayer().play()}
                        >
                            <FaPlay className=" text-gray-400" />
                        </button>
                    ) : (
                        <button
                            onClick={() => playerRef.current?.getInternalPlayer().pause()}
                        >
                            <FaPause className=" text-gray-400" />
                        </button>
                    )}
                    <p className=" text-gray-400">
                        {Math.floor(playerRef.current?.getCurrentTime() / 60)}:
                        {Math.floor(playerRef.current?.getCurrentTime() % 60)
                            .toString()
                            .padStart(2, "0")}
                        /{Math.floor(playerRef.current?.getDuration() / 60)}:
                        {Math.floor(playerRef.current?.getDuration() % 60)}
                    </p>
                </div>
                <div
                    className="w-full bg-gray-800 rounded-full h-2.5 relative flex flex-row justify-between items-start gap-x-0.5 progressBar"
                    onClick={handleProgressBarClick}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {sections &&
                        sections.map((section) => (
                            <span
                                key={section.id}
                                className="bg-gray-400 rounded-full cursor-pointer pointer-events-none"
                                style={{
                                    width: `${
                                        (section.duration / playerRef.current?.getDuration()) * 100
                                    }%`,
                                    height: "100%",
                                }}
                            ></span>
                        ))}
                    <div
                        className="absolute left-0 bg-[#7C69FF] h-full rounded-full pointer-events-none"
                        style={{
                            width: `${
                                (playerRef.current?.getCurrentTime() /
                                    playerRef.current?.getDuration()) *
                                100
                            }%`,
                            cursor: "ew-resize",
                        }}
                    >
                        <div
                            className="absolute right-0 -top-[3px] bottom-0 bg-white w-4 h-4 rounded-full"
                            style={{
                                marginRight: "-2px",
                            }}
                        ></div>{" "}
                    </div>
                </div>
                <div
                    className="cursor-pointer"
                    onClick={toggleFullScreen}
                >
                    {isFullScreen ? (
                        <MdFullscreenExit className="text-xl text-gray-400" />
                    ) : (
                        <MdFullscreen className="text-xl text-gray-400" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;