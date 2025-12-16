import { Package, Testimonial } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'p1',
    name: 'Royal Kano Wedding',
    price: '₦2,500,000',
    description: 'The ultimate luxury experience for your special day. Includes full venue access, bridal suite, and premium decor.',
    features: ['Grand Hall Access (1000 guests)', 'Bridal Changing Suite', 'Gold & Red Theme Decor', 'Security Detail', 'Generator Backup'],
    image: 'https://picsum.photos/800/600?random=1',
    category: 'wedding'
  },
  {
    id: 'p2',
    name: 'Nassarawa Executive Summit',
    price: '₦850,000',
    description: 'Perfect for AGMs, conferences, and high-level meetings. Professional setting with state-of-the-art AV.',
    features: ['Conference Hall (300 guests)', 'Projector & Sound System', 'Coffee Break Area', 'High-Speed WiFi', 'Valet Parking'],
    image: 'https://picsum.photos/800/600?random=2',
    category: 'corporate'
  },
  {
    id: 'p3',
    name: 'Mistic Garden Party',
    price: '₦450,000',
    description: 'An enchanting outdoor setup for birthdays, showers, and receptions under the stars.',
    features: ['Outdoor Garden Access', 'String Lighting', 'Gazebo Setup', 'Sound System', 'Cleaning Service'],
    image: 'https://picsum.photos/800/600?random=3',
    category: 'party'
  },
  {
    id: 'p4',
    name: 'Intimate Nikkah Special',
    price: '₦600,000',
    description: 'A cozy yet elegant package designed for smaller, intimate religious ceremonies.',
    features: ['Small Hall Access (200 guests)', 'Prayer Area Mats', 'Elegant Stage', 'Refreshment Stations'],
    image: 'https://picsum.photos/800/600?random=4',
    category: 'wedding'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Fatima & Ahmed',
    role: 'Newlyweds',
    text: 'Mistic Falls made our dream wedding a reality. The ambiance at Sultan Road is unmatched in Kano!',
    image: 'https://picsum.photos/100/100?random=5'
  },
  {
    id: 't2',
    name: 'CEO, Zenith Tech',
    role: 'Corporate Client',
    text: 'Professional, clean, and spacious. The best venue for our end-of-year gala.',
    image: 'https://picsum.photos/100/100?random=6'
  }
];

export const GALLERY_IMAGES = [
  'https://picsum.photos/800/800?random=10',
  'https://picsum.photos/800/800?random=11',
  'https://picsum.photos/800/800?random=12',
  'https://picsum.photos/800/800?random=13',
  'https://picsum.photos/800/800?random=14',
  'https://picsum.photos/800/800?random=15',
];
