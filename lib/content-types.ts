export type ServiceGender = "female" | "male" | "both";
export type LaserDevice = "gentle-deka" | "gentle-pro" | "splendor-x";
export type ServiceIconKey = "syringe" | "sparkles" | "waves" | "camera";
export type SocialIconKey = "instagram" | "facebook" | "whatsapp" | "location" | "tiktok";

export type SocialLink = {
  label: string;
  href: string;
  iconKey?: SocialIconKey | string;
  image?: string;
};

export type SiteConfigContent = {
  brand: string;
  arabicName: string;
  tagline: string;
  phoneDisplay: string;
  whatsappNumber: string;
  address: string;
  mapEmbedUrl: string;
  workingHours: string;
  socials: SocialLink[];
};

export type HeroStat = {
  value: string;
  label: string;
};

export type PriceOption = {
  label: string;
  price: string;
};

export type ServiceContent = {
  title: string;
  price: string;
  short: string;
  definition: string;
  benefits: string[];
  uses: string[];
  icon: ServiceIconKey;
  gender?: ServiceGender;
  laserDevice?: LaserDevice;
  note?: string;
  priceOptions?: PriceOption[];
};

export type ServiceCategoryContent = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  services: ServiceContent[];
};

export type DeviceContent = {
  name: string;
  description: string;
  image: string;
  note: string;
};

export type BeforeAfterCaseContent = {
  title: string;
  service: string;
  image: string;
};

export type GalleryItemContent = {
  title: string;
  src: string;
};

export type TestimonialContent = {
  name: string;
  text: string;
  rating: number;
};

export type OfferContent = {
  title: string;
  description: string;
  image?: string;
  oldPrice?: string;
  newPrice?: string;
  startsAt?: string;
  endsAt?: string;
  isActive?: boolean;
};

export type SiteContent = {
  siteConfig: SiteConfigContent;
  heroStats: HeroStat[];
  serviceCategories: ServiceCategoryContent[];
  devices: DeviceContent[];
  beforeAfterCases: BeforeAfterCaseContent[];
  gallery: GalleryItemContent[];
  testimonials: TestimonialContent[];
  offers: OfferContent[];
  updatedAt?: string;
};
