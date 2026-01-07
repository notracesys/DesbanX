export default function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
    >
      <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-plexus-network-connections-in-motion-32791-large.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
