"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt: string;
  isPlaying: boolean;
  url: string;
}

function EqualizerBars() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-green-500 rounded-full"
          animate={{
            height: ["4px", `${8 + Math.random() * 8}px`, "4px"],
          }}
          transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export default function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const data = await res.json();
          if (data.isPlaying) {
            setTrack(data);
          }
        }
      } catch {
        // Spotify API not configured — use demo data
        setTrack({
          name: "Bohemian Rhapsody",
          artist: "Queen",
          albumArt: "",
          isPlaying: true,
          url: "#",
        });
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-theme-nav backdrop-blur-sm border border-theme-border rounded-lg px-4 py-3 max-w-[260px] hover:border-green-500/30 transition-colors duration-300"
      >
        {track?.isPlaying ? (
          <a href={track.url} target="_blank" className="flex items-center gap-3 group">
            <div className="flex-shrink-0">
              {track.albumArt ? (
                <div className="w-10 h-10 rounded overflow-hidden">
                  <img src={track.albumArt} alt={track.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded bg-green-500/10 flex items-center justify-center">
                  <EqualizerBars />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-green-400 font-mono mb-0.5 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {t("spotify.listeningTo")}
              </p>
              <p className="text-theme-heading text-xs font-semibold truncate group-hover:text-green-400 transition">{track.name}</p>
              <p className="text-theme-subtle text-[10px] truncate">{track.artist}</p>
            </div>
          </a>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-theme-surface flex items-center justify-center text-theme-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </div>
            <div>
              <p className="text-theme-subtle text-xs">{t("spotify.notPlaying")}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
