import Image from "next/image"

interface IIcon {
  iconName: string
  alt: string
  width?: number
  height?: number
}

export default function Icon({ iconName, alt, width = 32, height = 32, ...props }: IIcon) {
  return (
    <>
      <Image
        src={iconName}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: "auto",
          height: "auto",
        }}
        {...props}
      />
    </>
  )
}
