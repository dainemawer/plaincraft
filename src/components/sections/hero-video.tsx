"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/photo";

/** Turns a YouTube or Vimeo page URL into a privacy-friendly embed URL. */
function toEmbedUrl(url: string) {
  const youtube = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/,
  );
  if (youtube) {
    return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0`;
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

const isVideoFile = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url);

/**
 * Click-to-play explainer. Nothing third-party loads until the visitor
 * presses play, which keeps the hero fast and cookie-free.
 */
export function HeroVideo({ videoUrl }: { videoUrl: string }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = videoUrl.length > 0;

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-ink bg-ink">
      {playing && hasVideo ? (
        isVideoFile(videoUrl) ? (
          // biome-ignore lint/a11y/useMediaCaption: captions are supplied with the final video file.
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="block size-full bg-ink"
          />
        ) : (
          <iframe
            src={toEmbedUrl(videoUrl)}
            title="Plaincraft explainer video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="block size-full border-0"
          />
        )
      ) : (
        <>
          <Photo
            hint="Drop a video thumbnail (you on camera works best)"
            sizes="(min-width: 1280px) 600px, (min-width: 960px) 50vw, 100vw"
            tone="dark"
            preload
          />
          <button
            type="button"
            aria-label="Play the 2-minute explainer video"
            aria-disabled={!hasVideo || undefined}
            onClick={() => hasVideo && setPlaying(true)}
            className="absolute top-1/2 left-1/2 flex size-22 -translate-1/2 cursor-pointer items-center justify-center rounded-full bg-ember text-ink shadow-[0_0_0_10px_rgb(232_73_42/0.25)] transition-[scale,box-shadow] duration-250 hover:scale-106 hover:shadow-[0_0_0_16px_rgb(232_73_42/0.22)]"
          >
            <span
              aria-hidden="true"
              className="ml-1.5 block size-0 border-y-[15px] border-l-[24px] border-y-transparent border-l-ink"
            />
          </button>
        </>
      )}
    </div>
  );
}
