import Image, { type StaticImageData } from 'next/image'
import { Parallax } from 'react-scroll-parallax'

interface ParallaxImageProps {
  src: StaticImageData | string
  speed: number
  alt: string
  height?: string
  width?: string
  photoHeight?: number
  photoWidth?: number
  marginTop?: number
  justifyContent?: string
}

const ParallaxImage = ({
  src,
  speed,
  alt,
  height,
  width,
  photoHeight,
  photoWidth,
  justifyContent = 'start'
}: ParallaxImageProps): JSX.Element => {
  return (
    <div
      className="overflow-hidden h-full flex flex-col relative"
      style={{ height, width, justifyContent }}>
      <Parallax speed={speed}>
        <Image
          priority
          quality={100}
          className="scale-150 mt-24"
          src={src}
          alt={alt}
          layout="responsive"
          objectFit="cover"
          width={photoHeight ?? 1000}
          height={photoWidth ?? 1000}
        />
      </Parallax>
      <div className="absolute top-0 h-full w-full left-0 bg-black/10" />
    </div>
  )
}

export default ParallaxImage
