import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoList, type MuxAsset } from "./components/VideoList";
import "./App.css";

function getPlaybackId(asset: MuxAsset): string | null {
  const pb = asset.playbackIds?.find((p) => p.policy === "public");
  return pb?.id ?? asset.playbackIds?.[0]?.id ?? null;
}

function getThumbnail(playbackId: string): string {
  return `https://image.mux.com/${playbackId}/thumbnail.webp?width=1280&height=720&fit_mode=smartcrop`;
}

const App = () => {
  const assets = useQuery(api.videos.listAssets, { limit: 50 });
  const [selectedAsset, setSelectedAsset] = useState<MuxAsset | null>(null);
  const [userSelected, setUserSelected] = useState(false);

  const currentAsset = selectedAsset ?? assets?.[0] ?? null;
  const playbackId = currentAsset ? getPlaybackId(currentAsset) : null;
  const poster = playbackId ? getThumbnail(playbackId) : undefined;

  const handleSelect = (asset: MuxAsset) => {
    setSelectedAsset(asset);
    setUserSelected(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>mau-pod</h1>
      </header>

      <main className="app-main">
        <section className="player-section">
          {assets === undefined ? (
            <div className="player-placeholder">Loading...</div>
          ) : playbackId ? (
            <VideoPlayer
              playbackId={playbackId}
              poster={poster}
              title={currentAsset?.muxAssetId}
              autoPlay={userSelected}
            />
          ) : (
            <div className="player-placeholder">No playable video found</div>
          )}
        </section>

        <aside className="sidebar">
          <h2 className="sidebar-title">Videos</h2>
          {assets === undefined ? (
            <p className="video-list-empty">Loading...</p>
          ) : (
            <VideoList
              assets={assets}
              selectedAssetId={currentAsset?.muxAssetId ?? null}
              onSelect={handleSelect}
            />
          )}
        </aside>
      </main>
    </div>
  );
};

export default App;
