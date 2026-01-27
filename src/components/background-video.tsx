export default function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/videofundo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
