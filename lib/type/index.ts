import { CATEGORY_IMAGE_MAP } from "../constant"

/** iconのサイズタイプ */
export type IconSizeType = 16 | 32 | 64

/** サービスのカテゴリー名 */
export type ServiceCategoryName =
  | "networking-content-delivery"
  | "app-integration"
  | "management-governance"
  | "compute"
  | "containers"
  | "business-applications"
  | "developer-tools"
  | "front-end-web-mobile"
  | "security-identity-compliance"
  | "storage"
  | "cloud-financial-management"
  | "artificial-intelligence"
  | "database"
  | "analytics"

export type CategoryType = keyof typeof CATEGORY_IMAGE_MAP
