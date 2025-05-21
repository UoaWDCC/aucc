interface BackgroundImageProps {
  src: string;
  alt: string;
}

export function BackgroundImage({ src, alt }: BackgroundImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
  );
}
