import type { Category, CategoryId, Lang, LocalizedText, Subcategory } from './marketplace';
import type { PromoSlide } from './promotions';

export type AdminApplicationStatus = 'submitted' | 'under_review' | 'info_requested' | 'approved' | 'rejected';

export type ModerationStatus = 'pending_review' | 'approved' | 'changes_requested' | 'rejected' | 'inactive';

export type AdminArea = 'applications' | 'sellers' | 'moderation' | 'categories' | 'slides';

export interface AdminDashboardSummary {
  totalCustomers: number;
  registeredSellers: number;
  pendingApplications: number;
  listedProducts: number;
  productsAwaitingReview: number;
  totalDemoOrders: number;
  pendingDemoOrders: number;
}

export interface SellerApplicationReview {
  id: string;
  applicantName: string;
  storeName: string;
  phone: string;
  email: string;
  provinceId: string;
  categoryId: CategoryId | '';
  description: string;
  submittedAt: string;
  status: AdminApplicationStatus;
  requestedInfo: string | null;
  decisionNote: string | null;
}

export interface SellerDirectoryRecord {
  id: string;
  storeName: LocalizedText;
  ownerName: string;
  provinceId: string;
  joinedAt: string;
  active: boolean;
}

export interface ProductModerationRecord {
  productId: string;
  name: LocalizedText;
  sellerId: string;
  sellerName: LocalizedText;
  categoryId: CategoryId;
  price: number;
  imageUrl: string;
  submittedAt: string;
  status: ModerationStatus;
  note: string | null;
}

export interface CategoryManagementRecord extends Category {
  displayOrder: number;
  active: boolean;
  subcategories: Subcategory[];
}

export interface PromotionalSlide extends PromoSlide {
  displayOrder: number;
  active: boolean;
}

export interface AdminCustomerRecord {
  id: string;
  fullName: LocalizedText;
  phone: string;
  email: string;
  preferredLang: Lang;
  memberSince: string;
}

export interface AdminAction {
  id: string;
  performedAt: string;
  area: AdminArea;
  summary: LocalizedText;
}
