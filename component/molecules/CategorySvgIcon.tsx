import Icon from "@/atoms/Icon"
import { IconSizeType } from "~/lib/type"

interface ICategorySvgIcon {
  iconName: string
  iconSizeType: IconSizeType
}

export default function CategorySvgIcon({ iconName, iconSizeType, ...props }: ICategorySvgIcon) {
  const categorySvgIconName = `/aws/category/Arch-Category_${iconName}_${iconSizeType}.svg`
  return (
    <>
      <Icon
        iconName={categorySvgIconName}
        alt={iconName}
        width={iconSizeType}
        height={iconSizeType}
        {...props}
      />
    </>
  )
}
