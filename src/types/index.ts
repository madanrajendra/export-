import { z } from "zod";

// --- Types ---

export type UserRole = "admin" | "customer";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: any;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: any;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  images: string[];
  isPublished: boolean;
  specifications?: Record<string, string>;
  createdAt: any;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  images: string[];
  isPublished: boolean;
  createdAt: any;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Rich Text HTML/MD
  coverImage: string;
  seoTitle?: string;
  seoDescription?: string;
  status: "draft" | "published";
  publishedAt: any;
  createdAt: any;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  companyName?: string;
  message: string;
  relatedItemId?: string; // product/service ID
  relatedItemType?: "product" | "service" | "general";
  sourcePage: string;
  status: "new" | "in-progress" | "closed";
  createdAt: any;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  mapEmbedUrl?: string;
  logoUrl?: string;
  faviconUrl?: string;
}

// --- Zod Schemas for Forms ---

export const EnquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().optional(),
  companyName: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  relatedItemId: z.string().optional(),
  relatedItemType: z.enum(["product", "service", "general"]).optional(),
  sourcePage: z.string().optional(),
});

export type EnquiryFormValues = z.infer<typeof EnquirySchema>;

export const ProductSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().min(20, "Full description is required"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  isPublished: z.boolean(),
});

export const BlogSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  slug: z.string().min(2, "Slug is required"),
  summary: z.string().min(10, "Summary is required"),
  content: z.string().min(20, "Content is required"),
  coverImage: z.string().url("Invalid image URL"),
  status: z.enum(["draft", "published"]).default("draft"),
});
