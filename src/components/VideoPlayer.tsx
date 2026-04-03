import { createPlayer } from "@videojs/react";
import { VideoSkin, videoFeatures } from "@videojs/react/video";
import MuxVideo from "@videojs/react/media/mux-video";
import "@videojs/react/video/skin.css";

const Player = createPlayer({ features: videoFeatures });

interface VideoPlayerProps {
  playbackId: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({
  playbackId,
  poster,
  title,
  autoPlay = false,
}: VideoPlayerProps) {
  return (
    <div className="video-player">
      {title && <h2 className="video-player-title">{title}</h2>}
      <Player.Provider key={playbackId}>
        <VideoSkin poster={poster}>
          <MuxVideo
            playbackId={playbackId}
            playsInline
            autoPlay={autoPlay}
            muted={autoPlay}
          />
        </VideoSkin>
      </Player.Provider>
    </div>
  );
}
