let activeVideo: HTMLVideoElement | null = null;

export function playExclusive(video: HTMLVideoElement): Promise<void> {
  if (activeVideo && activeVideo !== video) {
    activeVideo.pause();
  }
  activeVideo = video;
  return video.play().catch(() => {});
}

export function clearExclusiveVideo(video: HTMLVideoElement): void {
  if (activeVideo === video) {
    activeVideo = null;
  }
}
