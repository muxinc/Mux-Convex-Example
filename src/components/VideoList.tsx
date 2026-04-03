interface MuxAsset {
  muxAssetId: string;
  status?: string;
  playbackIds?: Array<{ id: string; policy?: string }>;
  durationSeconds?: number;
  aspectRatio?: string;
}

interface VideoListProps {
  assets: MuxAsset[];
  selectedAssetId: string | null;
  onSelect: (asset: MuxAsset) => void;
}

function formatDuration(seconds?: number): string {
  if (!seconds) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getPlaybackId(asset: MuxAsset): string | null {
  const pb = asset.playbackIds?.find((p) => p.policy === "public");
  return pb?.id ?? asset.playbackIds?.[0]?.id ?? null;
}

function getThumbnail(playbackId: string): string {
  return `https://image.mux.com/${playbackId}/thumbnail.webp?width=320&height=180&fit_mode=smartcrop`;
}

export function VideoList({ assets, selectedAssetId, onSelect }: VideoListProps) {
  const readyAssets = assets.filter(
    (a) => a.status === "ready" && getPlaybackId(a),
  );

  if (readyAssets.length === 0) {
    return <p className="video-list-empty">No videos available.</p>;
  }

  return (
    <div className="video-list">
      {readyAssets.map((asset) => {
        const playbackId = getPlaybackId(asset)!;
        const isSelected = asset.muxAssetId === selectedAssetId;

        return (
          <button
            key={asset.muxAssetId}
            className={`video-card ${isSelected ? "video-card--selected" : ""}`}
            onClick={() => onSelect(asset)}
            type="button"
          >
            <img
              className="video-card-thumb"
              src={getThumbnail(playbackId)}
              alt={`Thumbnail for ${asset.muxAssetId}`}
              loading="lazy"
            />
            <div className="video-card-info">
              <span className="video-card-id">{asset.muxAssetId.slice(0, 12)}...</span>
              <span className="video-card-duration">
                {formatDuration(asset.durationSeconds)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export type { MuxAsset };
