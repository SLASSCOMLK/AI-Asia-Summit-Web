import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Share2, 
  ArrowRight,
  ExternalLink,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Tv,
  Hexagon,
  Mail,
  Handshake,
  CheckCircle2,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import HexMeshBackground from './components/HexMeshBackground';
import YouTubeBackground from './components/YouTubeBackground';
import TransparentLogo from './components/TransparentLogo';
import CustomCursor from './components/CustomCursor';
import AboutSection from './components/AboutSection';

export default function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [partnerType, setPartnerType] = useState('Sponsorship & Exhibition');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Background Mode: 'video' or 'mesh'
  const [bgMode, setBgMode] = useState('video');
  const [isMuted, setIsMuted] = useState(true);

  // Target Date: November 12, 2026, 08:30 AM Colombo Time (UTC+5:30 => 03:00 AM UTC)
  const targetDate = new Date(Date.UTC(2026, 10, 12, 3, 0, 0)).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#2E63FF', '#7C3AED', '#E8B84B', '#00A3E0', '#FFFFFF']
      });
    } catch (err) {
      // Fallback
    }

    const mailSubject = encodeURIComponent(`AI Asia Summit 2026 Partnership Inquiry [${partnerType}]`);
    const mailBody = encodeURIComponent(`Hello Kaveendra,\n\nI am interested in partnering with AI Asia Summit 2026.\n\nName: ${name || 'N/A'}\nEmail: ${email}\nPartnership Category: ${partnerType}\n\nPlease send us the sponsorship and partnership package.\n\nBest regards,\n${name || email}`);
    
    setTimeout(() => {
      window.location.href = `mailto:kaveendra.w@slasscom.lk?subject=${mailSubject}&body=${mailBody}`;
    }, 600);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("AI Asia Summit 2026");
    const details = encodeURIComponent("Asia's flagship artificial intelligence conference organized by SLASSCOM in Colombo, Sri Lanka.");
    const location = encodeURIComponent("Colombo, Sri Lanka (Venue TBA)");
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261112T030000Z/20261112T123000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const formatDigit = (num) => String(num).padStart(2, '0');

  const marqueeItems = [
    "AI ASIA SUMMIT 2026",
    "NOVEMBER 12, 2026",
    "COLOMBO, SRI LANKA",
    "PARTNER WITH US • KAVEENDRA.W@SLASSCOM.LK",
    "ORGANISED BY SLASSCOM",
    "ASIA'S PREMIER AI CONFERENCE"
  ];

  return (
    <>
      {/* Futuristic Trail & Pointer Cursor */}
      <CustomCursor />

      {/* Background Options: HD YouTube Video or Hex Mesh Canvas */}
      <YouTubeBackground isVideoActive={bgMode === 'video'} isMuted={isMuted} />
      {bgMode === 'mesh' && <HexMeshBackground />}

      <div className="page-wrapper">
        {/* Top Navbar Header */}
        <header className="navbar">
          <div className="container">
            <div className="navbar-inner">
              <a href="#" className="navbar-logo-link">
                <TransparentLogo 
                  src="/logo.png" 
                  alt="SLASSCOM AI ASIA SUMMIT 2026" 
                  className="navbar-transparent-logo" 
                />
              </a>

              <ul className="nav-links">
                <li><a href="#" className="nav-link active">Home</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#speakers" className="nav-link">Speakers</a></li>
                <li><a href="#tickets" className="nav-link">Tickets</a></li>
                <li><a href="#partner-section" className="nav-link">Partner With Us</a></li>
                <li><a href="#venue" className="nav-link">Venue</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
              </ul>

              {/* Background Mode & Audio Controls */}
              <div className="nav-controls-group">
                <button 
                  className="mode-toggle-btn"
                  onClick={() => setBgMode(bgMode === 'video' ? 'mesh' : 'video')}
                  title="Toggle Background Mode"
                >
                  {bgMode === 'video' ? <Tv size={14} /> : <Hexagon size={14} />}
                  <span>{bgMode === 'video' ? 'HD Video' : 'Hex Mesh'}</span>
                </button>

                {bgMode === 'video' && (
                  <button 
                    className="mode-toggle-btn"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} style={{ color: '#E8B84B' }} />}
                  </button>
                )}

                <button className="btn-buy-ticket" onClick={() => {
                  document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  PARTNER WITH US
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="hero-section container">
          {/* Transparent Official Logo Display */}
          <div className="hero-logo-transparent-wrapper">
            <TransparentLogo 
              src="/logo.png" 
              alt="AI ASIA SUMMIT 2026 SLASSCOM Logo" 
            />
          </div>

          {/* Headline Typography */}
          <h1 className="hero-title-text">
            AI ASIA SUMMIT
            <span className="hero-year-highlight">2026</span>
          </h1>

          {/* Event Date & Location Pills */}
          <div className="event-pills-row">
            <div className="event-pill">
              <span className="event-pill-icon"><Calendar size={18} /></span>
              <span>November 12, 2026</span>
            </div>
            <div className="event-pill">
              <span className="event-pill-icon"><MapPin size={18} /></span>
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="hero-cta-group">
            <button className="btn-primary-purple" onClick={() => {
              document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              PARTNER WITH US
            </button>

            <a 
              href="https://www.youtube.com/watch?v=QH-0oS0-kD4" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline-glass"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Play size={16} fill="currentColor" />
              <span>WATCH TRAILER</span>
            </a>
          </div>

          {/* FROSTED GLASSMORPHISM COUNTDOWN TIMER */}
          <div className="glass-countdown-container">
            <div className="glass-countdown-header">
              <Clock size={16} style={{ color: '#E8B84B' }} />
              <span>Event Countdown • UTC+5:30 Colombo Time</span>
            </div>

            <div className="glass-timer-grid">
              <div className="glass-timer-card">
                <span className="glass-timer-value">{formatDigit(timeLeft.days)}</span>
                <span className="glass-timer-label">Days</span>
              </div>
              <div className="glass-timer-card">
                <span className="glass-timer-value">{formatDigit(timeLeft.hours)}</span>
                <span className="glass-timer-label">Hours</span>
              </div>
              <div className="glass-timer-card">
                <span className="glass-timer-value">{formatDigit(timeLeft.minutes)}</span>
                <span className="glass-timer-label">Minutes</span>
              </div>
              <div className="glass-timer-card">
                <span className="glass-timer-value">{formatDigit(timeLeft.seconds)}</span>
                <span className="glass-timer-label">Seconds</span>
              </div>
            </div>
          </div>
        </main>

        {/* ABOUT SECTION WITH CIRCULAR ANIMATED PHOTO GALLERY */}
        <AboutSection />

        {/* PARTNER WITH US EMAIL FORM */}
        <section className="container">
          <div className="notify-glass-box" id="partner-section">
            <div style={{ textTransform: 'uppercase', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#00A3E0', letterSpacing: '0.12em', marginBottom: '0.75rem', fontWeight: 700 }}>
              <Handshake size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom', color: '#E8B84B' }} />
              Partner With Us
            </div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Become a Sponsor, Speaker or Event Partner
            </h2>

            {!submitted ? (
              <form className="partner-form-card" onSubmit={handlePartnerSubmit} style={{ background: 'rgba(11, 21, 48, 0.65)', backdropFilter: 'blur(28px)', border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '20px', padding: '1.75rem', textAlign: 'left' }}>
                
                {/* Category Selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Partnership Category
                  </label>
                  <select 
                    value={partnerType} 
                    onChange={(e) => setPartnerType(e.target.value)}
                    style={{ width: '100%', background: 'rgba(6, 9, 21, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="Sponsorship & Exhibition">Corporate Sponsor / Exhibitor</option>
                    <option value="Keynote Speaker">Keynote / Session Speaker</option>
                    <option value="Academic / Research Partner">Academic & Research Partner</option>
                    <option value="Delegate & VIP Tickets">Executive Delegate / Group Pass</option>
                    <option value="Media & Press Partner">Media & Press Partner</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe / TechCorp"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%', background: 'rgba(6, 9, 21, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 600 }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', background: 'rgba(6, 9, 21, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FFFFFF', padding: '0.75rem 1rem', borderRadius: '10px', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-gold-action" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem 1.5rem', fontSize: '0.95rem' }}>
                  <span>Submit Partnership Proposal</span>
                  <Send size={16} />
                </button>
                <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748B', fontFamily: 'Space Grotesk' }}>
                  Inquiries automatically dispatched to <span style={{ color: '#E8B84B' }}>kaveendra.w@slasscom.lk</span>
                </div>
              </form>
            ) : (
              <div className="glass-success-card">
                <CheckCircle2 size={36} style={{ color: '#E8B84B', margin: '0 auto 0.75rem' }} />
                <h3 className="success-title">Partnership Request Dispatched!</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  Thank you <strong style={{ color: '#FFFFFF' }}>{name || email}</strong>! Your <strong style={{ color: '#00A3E0' }}>{partnerType}</strong> inquiry has been dispatched directly to <strong style={{ color: '#E8B84B' }}>kaveendra.w@slasscom.lk</strong>. The SLASSCOM summit team will reach out to you shortly.
                </p>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="secondary-glass-actions">
              <button className="btn-glass-sm" onClick={handleAddToCalendar}>
                <Calendar size={14} style={{ color: '#E8B84B' }} />
                <span>Add to Calendar</span>
              </button>
              <button className="btn-glass-sm" onClick={handleShare}>
                <Share2 size={14} style={{ color: '#00A3E0' }} />
                <span>{copied ? "Link Copied!" : "Share Summit"}</span>
              </button>
              <a 
                href="mailto:kaveendra.w@slasscom.lk" 
                className="btn-glass-sm" 
                style={{ textDecoration: 'none' }}
              >
                <Mail size={14} style={{ color: '#E8B84B' }} />
                <span>kaveendra.w@slasscom.lk</span>
              </a>
            </div>
          </div>
        </section>

        {/* Marquee Strip */}
        <div className="marquee-bar" aria-hidden="true">
          <div className="marquee-content">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div className="marquee-node" key={idx}>
                <span>{item}</span>
                <span className="marquee-star">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer-bar">
          <div className="container">
            <div className="footer-content">
              <div>
                © 2026 AI Asia Summit. Organised by <strong style={{ color: '#E8B84B' }}>SLASSCOM</strong>
              </div>
              <div className="footer-nav">
                <a href="https://slasscom.lk" target="_blank" rel="noreferrer">
                  SLASSCOM Official <ExternalLink size={12} style={{ display: 'inline', marginLeft: 4 }} />
                </a>
                <a href="https://www.linkedin.com/company/slasscom/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href="mailto:kaveendra.w@slasscom.lk">
                  kaveendra.w@slasscom.lk
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
