import React, { useState } from 'react';
import { Menu, MapPin, Phone, Instagram, Facebook, Calendar, X, Star } from 'lucide-react';
import { PACKAGES, TESTIMONIALS, GALLERY_IMAGES } from './constants';
import { PageView } from './types';
import PackageCard from './components/PackageCard';
import AIConcierge from './components/AIConcierge';

function App() {
  const [view, setView] = useState<PageView>(PageView.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const navigateTo = (page: PageView) => {
    setView(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookPackage = (pkgId: string) => {
    setSelectedPackage(pkgId);
    navigateTo(PageView.BOOKING);
  };

  // --- Components defined internally for simplicity of the single-file request structure, but separated logically ---

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
          
          <div className="hidden md:flex space-x-8">
            {[
              { label: 'Home', val: PageView.HOME },
              { label: 'Packages', val: PageView.PACKAGES },
              { label: 'Gallery', val: PageView.GALLERY },
              { label: 'Contact', val: PageView.CONTACT },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.val)}
                className={`font-medium transition-colors hover:text-mistic-gold ${
                  view === item.val ? 'text-mistic-red' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateTo(PageView.BOOKING)}
              className="bg-mistic-gold text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition-transform hover:scale-105 shadow-lg"
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
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {[
              { label: 'Home', val: PageView.HOME },
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
      {/* Background Image with Overlay */}
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
            onClick={() => navigateTo(PageView.PACKAGES)}
            className="bg-mistic-gold text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-600 transition-all shadow-xl hover:shadow-yellow-500/20"
          >
            Explore Packages
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
              <li><button onClick={() => navigateTo(PageView.PACKAGES)} className="hover:text-white">Corporate Events</button></li>
              <li><button onClick={() => navigateTo(PageView.BOOKING)} className="hover:text-white">Check Availability</button></li>
              <li><button onClick={() => navigateTo(PageView.CONTACT)} className="hover:text-white">Get Directions</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Mistic Falls Event Centre. All rights reserved.
        </div>
      </div>
    </footer>
  );

  // --- Page Content Rendering ---

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
                  {TESTIMONIALS.map(t => (
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

        {view === PageView.PACKAGES && (
          <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-mistic-dark">Our Packages</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Designed to fit every occasion, from grand royal weddings to intimate gatherings.</p>
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
              {GALLERY_IMAGES.map((src, i) => (
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
                     <label className="block text-sm font-bold text-gray-700 mb-2">Selected Package</label>
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
          <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto h-screen">
             <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row h-[600px]">
               <div className="w-full md:w-1/2 p-8 bg-mistic-dark text-white flex flex-col justify-center">
                 <h2 className="text-4xl font-serif font-bold mb-8">Visit Us</h2>
                 <div className="space-y-6 text-lg">
                    <div className="flex items-center gap-4">
                      <MapPin className="text-mistic-gold w-6 h-6" />
                      <p>5 Sultan Road, Nassarawa, Kano</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="text-mistic-gold w-6 h-6" />
                      <p>+234 800 MISTIC 00</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 flex justify-center"><span className="text-mistic-gold font-bold">@</span></div>
                      <p>bookings@misticfalls.ng</p>
                    </div>
                 </div>
                 <div className="mt-12">
                   <h3 className="text-mistic-gold font-bold uppercase tracking-wider mb-4">Opening Hours</h3>
                   <p className="text-gray-300">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                   <p className="text-gray-300">Sunday: By Appointment</p>
                 </div>
               </div>
               <div className="w-full md:w-1/2 bg-gray-200 relative">
                  {/* Mock Map */}
                  <img src="https://picsum.photos/800/800?random=map" className="w-full h-full object-cover opacity-80" alt="Map Location" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white p-4 rounded-lg shadow-xl flex items-center gap-2">
                       <MapPin className="text-mistic-red fill-current" size={32} />
                       <span className="font-bold text-gray-800">We are here</span>
                    </div>
                  </div>
               </div>
             </div>
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
