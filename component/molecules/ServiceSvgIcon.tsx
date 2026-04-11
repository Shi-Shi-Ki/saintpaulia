import Icon from "@/atoms/Icon"
import { IconSizeType, ServiceCategoryName } from "~/lib/type"

interface IServiceSvgIcon {
  iconName: string
  serviceCategoryName: ServiceCategoryName
  iconSizeType: IconSizeType
}

export default function ServiceSvgIcon({
  iconName,
  serviceCategoryName,
  iconSizeType,
  ...props
}: IServiceSvgIcon) {
  const serviceSvgIconName = `/aws/service/${serviceCategoryName}/Arch_${iconName}_${iconSizeType}.svg`
  return (
    <div>
      <Icon
        iconName={serviceSvgIconName}
        alt={iconName}
        width={iconSizeType}
        height={iconSizeType}
        {...props}
      />
    </div>
  )
}
