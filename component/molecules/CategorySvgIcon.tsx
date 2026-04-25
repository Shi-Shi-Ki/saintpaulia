import Icon from "@component/atoms/Icon"
import { IconSizeType } from "~/lib/type"

interface ICategorySvgIcon {
  iconName: string
  width: number
  height: number
  iconSizeType?: IconSizeType
}

export default function CategorySvgIcon({
  iconName,
  width,
  height,
  iconSizeType = 64,
  ...props
}: ICategorySvgIcon) {
  const categorySvgIconName = `/aws/category/Arch-Category_${iconName}_${iconSizeType}.svg`
  return (
    <>
      <Icon
        iconName={categorySvgIconName}
        alt={iconName}
        width={width}
        height={height}
        {...props}
      />
    </>
  )
}
