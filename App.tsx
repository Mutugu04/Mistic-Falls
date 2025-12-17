import React, { useState } from 'react';
import { Menu, MapPin, Phone, Instagram, Facebook, Calendar, X, Star, Users, Layout, CheckCircle, Clock, DollarSign, Image as ImageIcon, Plus, Lock } from 'lucide-react';
import { PACKAGES, TESTIMONIALS as INITIAL_TESTIMONIALS, GALLERY_IMAGES as INITIAL_GALLERY, HALLS, INITIAL_BOOKINGS } from './constants';
import { PageView, Booking, Testimonial } from './types';
import PackageCard from './components/PackageCard';
import AIConcierge from './components/AIConcierge';

function App() {
  const [view, setView] = useState<PageView>(PageView.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Dynamic Content State
  const [galleryImages, setGalleryImages] = useState<string[]>(INITIAL_GALLERY);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Admin State
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState<'CALENDAR' | 'CONTENT'>('CALENDAR');

  // Form State for Admin
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', text: '' });
  const [newImageUrl, setNewImageUrl] = useState('');

  const navigateTo = (page: PageView) => {
    setView(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookPackage = (pkgId: string) => {
    setSelectedPackage(pkgId);
    navigateTo(PageView.BOOKING);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `t${Date.now()}`;
    const testimonial: Testimonial = {
      id: newId,
      ...newTestimonial,
      image: `https://ui-avatars.com/api/?name=${newTestimonial.name}&background=D4AF37&color=fff`
    };
    setTestimonials([...testimonials, testimonial]);
    setNewTestimonial({ name: '', role: '', text: '' });
    alert('Testimonial added!');
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageUrl) {
      setGalleryImages([newImageUrl, ...galleryImages]);
      setNewImageUrl('');
      alert('Image added to gallery!');
    }
  };

  // --- Components ---

  const Navbar = () => (
    <nav className="fixed w-full z-40 bg-white/95 backdrop-blur-sm shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigateTo(PageView.HOME)}
          >
            <div className="w-10 h-10 bg-mistic-red rounded-tr-xl rounded-bl-xl flex items-center justify-center mr-2">
              <span className="text-mistic-gold font-serif font-bold text-2xl">M</span>
            </div>
            <span className="font-serif text-2xl font-bold text-mistic-dark tracking-tight">
              Mistic <span className="text-mistic-gold">Falls</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            {[
              { label: 'Home', val: PageView.HOME },
              { label: 'Venues', val: PageView.VENUES },
              { label: 'Packages', val: PageView.PACKAGES },
              { label: 'Gallery', val: PageView.GALLERY },
              { label: 'Contact', val: PageView.CONTACT },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.val)}
                className={`font-medium transition-colors text-sm uppercase tracking-wide hover:text-mistic-gold ${
                  view === item.val ? 'text-mistic-red' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateTo(PageView.BOOKING)}
              className="bg-mistic-gold text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition-transform hover:scale-105 shadow-lg text-sm"
            >
              Book Venue
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 p-2">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {[
              { label: 'Home', val: PageView.HOME },
              { label: 'Venues', val: PageView.VENUES },
              { label: 'Packages', val: PageView.PACKAGES },
              { label: 'Gallery', val: PageView.GALLERY },
              { label: 'Contact', val: PageView.CONTACT },
              { label: 'Book Now', val: PageView.BOOKING },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.val)}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-mistic-red hover:bg-mistic-cream"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080?random=hero"
          alt="Mistic Falls Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div className="inline-block bg-mistic-red/90 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-6 animate-pulse">
          #1 Event Centre in Kano
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Where Dreams Meet <br/> <span className="text-mistic-gold italic">Luxury</span>
        </h1>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
          Located at 5 Sultan Road, Nassarawa. We host the most exquisite weddings, parties, and corporate events in Northern Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigateTo(PageView.VENUES)}
            className="bg-mistic-gold text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-600 transition-all shadow-xl hover:shadow-yellow-500/20"
          >
            Explore Halls
          </button>
          <button
            onClick={() => navigateTo(PageView.GALLERY)}
            className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-mistic-red transition-all"
          >
            View Gallery
          </button>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-mistic-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="font-serif text-3xl font-bold text-white tracking-tight block mb-4">
              Mistic <span className="text-mistic-gold">Falls</span>
            </span>
            <p className="text-gray-400 mb-6">
              Creating unforgettable memories in the heart of Kano. Your vision, our venue, perfection achieved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-mistic-gold"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-mistic-gold"><Facebook /></a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-serif font-bold mb-6 text-mistic-gold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="shrink-0 text-mistic-red" />
                <span>5 Sultan Road, Nassarawa,<br/>Kano, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="shrink-0 text-mistic-red" />
                <span>+234 800 MISTIC 00</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-serif font-bold mb-6 text-mistic-gold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => navigateTo(PageView.PACKAGES)} className="hover:text-white">Wedding Packages</button></li>
              <li><button onClick={() => navigateTo(PageView.VENUES)} className="hover:text-white">Our Halls</button></li>
              <li><button onClick={() => navigateTo(PageView.BOOKING)} className="hover:text-white">Check Availability</button></li>
              <li><button onClick={() => navigateTo(PageView.CONTACT)} className="hover:text-white">Get Directions</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Mistic Falls Event Centre. All rights reserved.</p>
          <button onClick={() => navigateTo(PageView.ADMIN)} className="flex items-center gap-1 hover:text-white mt-4 md:mt-0 transition-colors">
            <Lock size={12} /> Admin Login
          </button>
        </div>
      </div>
    </footer>
  );

  // --- Main Render ---

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-stone-50">
      <Navbar />

      <main className="flex-grow">
        {view === PageView.HOME && (
          <>
            <Hero />
            
            {/* Features Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-mistic-red font-bold uppercase tracking-wider text-sm">Why Choose Us</span>
                <h2 className="text-4xl font-serif font-bold text-mistic-dark mt-2">The Mistic Experience</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Prime Location', desc: 'Located in the prestigious Nassarawa GRA, easily accessible and secure.', icon: <MapPin className="w-8 h-8 text-white"/> },
                  { title: 'Luxury Interiors', desc: 'State-of-the-art lighting, sound, and climate control for comfort.', icon: <Star className="w-8 h-8 text-white"/> },
                  { title: 'Full Service', desc: 'From catering to decor, we handle the details so you can celebrate.', icon: <Calendar className="w-8 h-8 text-white"/> },
                ].map((feat, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-mistic-gold text-center hover:-translate-y-2 transition-transform">
                    <div className="w-16 h-16 bg-mistic-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      {feat.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                    <p className="text-gray-600">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="bg-mistic-gold/10 py-20">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-center mb-12 text-mistic-dark">Words from our Guests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.map(t => (
                    <div key={t.id} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                      <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-mistic-gold" />
                      <div>
                        <p className="text-gray-600 italic mb-2">"{t.text}"</p>
                        <h4 className="font-bold text-mistic-red">{t.name}</h4>
                        <span className="text-xs text-gray-500 uppercase">{t.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {view === PageView.VENUES && (
           <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-4xl font-serif font-bold text-mistic-dark">Our Halls</h2>
               <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Discover the perfect space for your event, whether intimate or grand.</p>
             </div>
             
             <div className="space-y-16">
               {HALLS.map((hall, idx) => (
                 <div key={hall.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-3xl overflow-hidden shadow-2xl`}>
                   <div className="md:w-1/2 relative h-96">
                     <img src={hall.image} alt={hall.name} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                   </div>
                   <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <h3 className="text-3xl font-serif font-bold text-mistic-red mb-4">{hall.name}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{hall.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-2 text-mistic-dark">
                          <Users className="text-mistic-gold" />
                          <span className="font-bold">{hall.capacity} Guests</span>
                        </div>
                        <div className="flex items-center gap-2 text-mistic-dark">
                          <Layout className="text-mistic-gold" />
                          <span className="font-bold">{hall.size}</span>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Perfect For:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hall.suitability.map((suit, i) => (
                            <span key={i} className="bg-mistic-cream text-mistic-dark text-xs font-semibold px-3 py-1 rounded-full border border-mistic-gold/30">
                              {suit}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Included Amenities:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                           {hall.amenities.map((item, i) => (
                             <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                               <CheckCircle size={14} className="text-green-600"/> {item}
                             </li>
                           ))}
                        </ul>
                      </div>

                      <button onClick={() => handleBookPackage('custom')} className="self-start bg-mistic-dark text-white px-8 py-3 rounded-full hover:bg-mistic-gold transition-colors font-semibold shadow-lg">
                        Check Availability
                      </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        )}

        {view === PageView.PACKAGES && (
          <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-mistic-dark">Event Packages</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Tailored solutions combining our venues with premium services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {PACKAGES.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} onBook={handleBookPackage} />
              ))}
            </div>
          </div>
        )}

        {view === PageView.GALLERY && (
          <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
             <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-mistic-dark">Event Showcase</h2>
              <p className="text-gray-600 mt-2">A glimpse into the magic we create at Sultan Road.</p>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {galleryImages.map((src, i) => (
                <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-lg">
                  <img src={src} alt="Event" className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-serif italic text-lg">Mistic Memories</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === PageView.BOOKING && (
          <div className="pt-24 pb-20 px-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-mistic-red p-8 text-center text-white">
                <h2 className="text-3xl font-serif font-bold">Book Your Date</h2>
                <p className="opacity-90 mt-2">Secure the best venue in Kano for your special day.</p>
              </div>
              <div className="p-8">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Booking request sent! We will contact you shortly."); navigateTo(PageView.HOME); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <input type="text" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mistic-gold focus:border-transparent outline-none" placeholder="Enter your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                      <input type="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mistic-gold focus:border-transparent outline-none" placeholder="email@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mistic-gold focus:border-transparent outline-none" placeholder="080..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Event Date</label>
                      <input type="date" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mistic-gold focus:border-transparent outline-none" />
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Selected Package / Hall</label>
                     <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mistic-gold focus:border-transparent outline-none"
                        defaultValue={selectedPackage || ""}
                     >
                       <option value="" disabled>Select a package...</option>
                       {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name} - {p.price}</option>)}
                       <option value="custom">Custom Requirement</option>
                     </select>
                  </div>

                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                      <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-mistic-gold focus:border-transparent outline-none" placeholder="Tell us more about your event..."></textarea>
                    </div>

                  <button type="submit" className="w-full bg-mistic-gold text-white font-bold py-4 rounded-lg hover:bg-yellow-600 transition-colors shadow-lg text-lg">
                    Send Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {view === PageView.CONTACT && (
          <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
             <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row h-[700px]">
               <div className="w-full md:w-1/3 p-8 bg-mistic-dark text-white flex flex-col justify-center">
                 <h2 className="text-4xl font-serif font-bold mb-8">Visit Us</h2>
                 <div className="space-y-6 text-lg">
                    <div className="flex items-center gap-4">
                      <MapPin className="text-mistic-gold w-6 h-6 shrink-0" />
                      <p>5 Sultan Road, Nassarawa, Kano, Nigeria</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="text-mistic-gold w-6 h-6 shrink-0" />
                      <p>+234 800 MISTIC 00</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 shrink-0 flex justify-center"><span className="text-mistic-gold font-bold">@</span></div>
                      <p>bookings@misticfalls.ng</p>
                    </div>
                 </div>
                 <div className="mt-12">
                   <h3 className="text-mistic-gold font-bold uppercase tracking-wider mb-4">Opening Hours</h3>
                   <p className="text-gray-300">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                   <p className="text-gray-300">Sunday: By Appointment</p>
                 </div>
               </div>
               <div className="w-full md:w-2/3 bg-gray-200 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=5+Sultan+Road,+Nassarawa,+Kano&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    title="Google Map Location"
                    className="w-full h-full"
                  ></iframe>
               </div>
             </div>
          </div>
        )}

        {view === PageView.ADMIN && (
          <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
            {!isAuthenticated ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl border border-gray-200 mt-20">
                <div className="text-center mb-6">
                  <Lock className="w-12 h-12 text-mistic-red mx-auto mb-2" />
                  <h2 className="text-2xl font-serif font-bold">Admin Login</h2>
                  <p className="text-gray-500">Restricted Access</p>
                </div>
                <form onSubmit={handleAdminLogin}>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-mistic-gold focus:outline-none"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <button type="submit" className="w-full bg-mistic-dark text-white p-3 rounded-lg font-bold hover:bg-black transition-colors">
                    Login
                  </button>
                  <p className="text-xs text-center mt-4 text-gray-400">Hint: admin123</p>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                <div className="bg-mistic-dark text-white p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                    <Layout /> Admin Dashboard
                  </h2>
                  <div className="flex gap-4">
                     <button 
                       onClick={() => setAdminTab('CALENDAR')} 
                       className={`px-4 py-2 rounded-lg font-medium transition-colors ${adminTab === 'CALENDAR' ? 'bg-mistic-gold text-white' : 'hover:bg-white/10'}`}
                     >
                       Bookings & Calendar
                     </button>
                     <button 
                       onClick={() => setAdminTab('CONTENT')} 
                       className={`px-4 py-2 rounded-lg font-medium transition-colors ${adminTab === 'CONTENT' ? 'bg-mistic-gold text-white' : 'hover:bg-white/10'}`}
                     >
                       Content Management
                     </button>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 flex-grow">
                  {adminTab === 'CALENDAR' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Calendar /> Upcoming Schedule</h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                           {bookings.length} Active Bookings
                        </span>
                      </div>
                      
                      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                          <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                              <th className="p-4 text-sm font-bold text-gray-600">Date & Time</th>
                              <th className="p-4 text-sm font-bold text-gray-600">Client</th>
                              <th className="p-4 text-sm font-bold text-gray-600">Hall</th>
                              <th className="p-4 text-sm font-bold text-gray-600">Booking Status</th>
                              <th className="p-4 text-sm font-bold text-gray-600">Payment</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {bookings.map(b => {
                              const hallName = HALLS.find(h => h.id === b.hallId)?.name || b.hallId;
                              return (
                                <tr key={b.id} className="hover:bg-gray-50">
                                  <td className="p-4">
                                    <div className="font-bold text-gray-800">{b.date}</div>
                                    <div className="text-xs text-gray-500">{b.time}</div>
                                  </td>
                                  <td className="p-4 font-medium">{b.clientName}</td>
                                  <td className="p-4 text-sm text-gray-600">{hallName}</td>
                                  <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                      b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {b.status}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1 ${
                                      b.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-700' : 
                                      b.paymentStatus === 'Deposit' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                      <DollarSign size={12}/> {b.paymentStatus}
                                    </span>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                        {bookings.length === 0 && <p className="p-8 text-center text-gray-500">No bookings found.</p>}
                      </div>
                    </div>
                  )}

                  {adminTab === 'CONTENT' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Add Testimonial */}
                      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Star className="text-mistic-gold"/> Add Testimonial</h3>
                        <form onSubmit={handleAddTestimonial} className="space-y-4">
                           <input 
                              type="text" 
                              placeholder="Client Name" 
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mistic-gold outline-none"
                              value={newTestimonial.name}
                              onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})}
                              required
                           />
                           <input 
                              type="text" 
                              placeholder="Role (e.g. Groom)" 
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mistic-gold outline-none"
                              value={newTestimonial.role}
                              onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})}
                              required
                           />
                           <textarea 
                              placeholder="Message" 
                              className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-mistic-gold outline-none"
                              value={newTestimonial.text}
                              onChange={e => setNewTestimonial({...newTestimonial, text: e.target.value})}
                              required
                           />
                           <button type="submit" className="w-full bg-mistic-dark text-white py-2 rounded-lg font-bold hover:bg-gray-800 flex items-center justify-center gap-2">
                             <Plus size={16} /> Add to Site
                           </button>
                        </form>
                      </div>

                      {/* Add Gallery Image */}
                      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><ImageIcon className="text-mistic-gold"/> Add Gallery Image</h3>
                        <form onSubmit={handleAddImage} className="space-y-4">
                           <input 
                              type="url" 
                              placeholder="Image URL (https://...)" 
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mistic-gold outline-none"
                              value={newImageUrl}
                              onChange={e => setNewImageUrl(e.target.value)}
                              required
                           />
                           <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                             {newImageUrl ? (
                               <img src={newImageUrl} alt="Preview" className="h-full w-full object-cover rounded-lg" onError={(e) => (e.currentTarget.src='https://via.placeholder.com/300?text=Invalid+URL')}/>
                             ) : (
                               <span>Image Preview</span>
                             )}
                           </div>
                           <button type="submit" className="w-full bg-mistic-dark text-white py-2 rounded-lg font-bold hover:bg-gray-800 flex items-center justify-center gap-2">
                             <Plus size={16} /> Add to Gallery
                           </button>
                        </form>
                      </div>

                      {/* Content Preview List (Simplified) */}
                      <div className="col-span-1 md:col-span-2 mt-4">
                        <h4 className="font-bold text-gray-500 uppercase text-xs mb-2">Current Gallery Count: {galleryImages.length} | Testimonials: {testimonials.length}</h4>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      
      {/* AI Concierge Widget */}
      <AIConcierge />
    </div>
  );
}

export default App;
