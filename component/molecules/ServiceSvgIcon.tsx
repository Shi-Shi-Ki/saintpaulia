import Icon from "@component/atoms/Icon"
import { IconSizeType, ServiceCategoryName } from "~/lib/type"

interface IServiceSvgIcon {
  iconName: string
  serviceCategoryName: ServiceCategoryName
  width: number
  height: number
  iconSizeType?: IconSizeType
}

export default function ServiceSvgIcon({
  iconName,
  serviceCategoryName,
  width,
  height,
  iconSizeType = 64,
  ...props
}: IServiceSvgIcon) {
  const serviceSvgIconName = `/aws/service/${serviceCategoryName}/Arch_${iconName}_${iconSizeType}.svg`
  return (
    <div>
      <Icon iconName={serviceSvgIconName} alt={iconName} width={width} height={height} {...props} />
    </div>
  )
}
