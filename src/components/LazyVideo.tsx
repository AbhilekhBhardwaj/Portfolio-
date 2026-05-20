"use client";

import { playExclusive, clearExclusiveVideo } from "@/lib/exclusiveVideoPlayback";
import { isScrolling, subscribeScrollPlaybackGate } from "@/lib/scrollPlaybackGate";
import { requestVideoLoadSlot, releaseVideoLoadSlot } from "@/lib/videoLoadQueue";
import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type LazyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> & {
  src: string;
  /** When true, play while intersecting the viewport and pause when off-screen. */
  playWhenVisible?: boolean;
  /** Pause during active scroll and resume when scrolling stops. */
  pauseOnScroll?: boolean;
  /** Only one video plays at a time (for spotlight marquees). */
  exclusivePlayback?: boolean;
  rootMargin?: string;
};

export function LazyVideo({
  src,
  playWhenVisible = true,
  pauseOnScroll = false,
  exclusivePlayback = false,
  rootMargin = "80px",
  preload = "none",
  ...videoProps
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const loadingRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canPlay = () =>
      playWhenVisible &&
      !prefersReducedMotion &&
      visibleRef.current &&
      (!pauseOnScroll || !isScrolling());

    const startPlayback = () => {
      if (!canPlay() || cancelled) return;
      if (exclusivePlayback) {
        void playExclusive(video);
      } else {
        void video.play().catch(() => {});
      }
    };

    const stopPlayback = () => {
      video.pause();
      if (exclusivePlayback) {
        clearExclusiveVideo(video);
      }
    };

    const loadVideo = async () => {
      if (loadedRef.current || loadingRef.current) return;
      loadingRef.current = true;

      await requestVideoLoadSlot();
      if (cancelled || !videoRef.current) {
        releaseVideoLoadSlot();
        loadingRef.current = false;
        return;
      }

      const onReady = () => {
        video.removeEventListener("canplay", onReady);
        video.removeEventListener("error", onError);
        releaseVideoLoadSlot();
        loadingRef.current = false;
        loadedRef.current = true;
        startPlayback();
      };

      const onError = () => {
        video.removeEventListener("canplay", onReady);
        video.removeEventListener("error", onError);
        releaseVideoLoadSlot();
        loadingRef.current = false;
      };

      video.addEventListener("canplay", onReady, { once: true });
      video.addEventListener("error", onError, { once: true });
      video.src = src;
      video.load();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (visibleRef.current) {
          if (!loadedRef.current && !loadingRef.current) {
            void loadVideo();
          } else if (loadedRef.current) {
            startPlayback();
          }
        } else {
          stopPlayback();
        }
      },
      { rootMargin, threshold: [0, 0.35, 0.6] }
    );

    observer.observe(video);

    const unsubscribeScroll =
      pauseOnScroll ?
        subscribeScrollPlaybackGate(() => {
          if (isScrolling()) {
            stopPlayback();
          } else if (visibleRef.current && loadedRef.current) {
            startPlayback();
          }
        })
      : () => {};

    return () => {
      cancelled = true;
      observer.disconnect();
      unsubscribeScroll();
      stopPlayback();
    };
  }, [src, playWhenVisible, pauseOnScroll, exclusivePlayback, rootMargin]);

  return <video ref={videoRef} preload={preload} {...videoProps} />;
}
