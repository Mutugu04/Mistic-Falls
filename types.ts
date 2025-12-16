export interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  category: 'wedding' | 'corporate' | 'party';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isBudget?: boolean; // If true, render a chart
  budgetData?: { name: string; value: number }[];
}

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  guestCount: number;
  packageId?: string;
  notes: string;
}

export enum PageView {
  HOME = 'HOME',
  PACKAGES = 'PACKAGES',
  GALLERY = 'GALLERY',
  BOOKING = 'BOOKING',
  CONTACT = 'CONTACT'
}