import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Share2, 
  ArrowRight,
  ExternalLink,
  Clock,
  Mail,
  Handshake,
  CheckCircle2,
  Send,
  FileText,
  Download,
  Building2,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import TransparentLogo from './components/TransparentLogo';
import CustomCursor from './components/CustomCursor';
import AboutSection from './components/AboutSection';
import EventHighlightsSection from './components/EventHighlightsSection';
import FocusAreasSection from './components/FocusAreasSection';
import AiRobotVisual from './components/AiRobotVisual';
import YouTubeBackground from './components/YouTubeBackground';
import { LinkedInIcon, XIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from './components/SocialIcons';

// Temporarily hidden — re-enable by flipping this back to true when ready to launch partnerships
const SHOW_PARTNER_SECTION = false;

export default function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [partnerType, setPartnerType] = useState('Strategic Sponsor');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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

    // Direct mailto trigger targeting corpoffice@slasscom.lk
    const mailSubject = encodeURIComponent(`AI Asia Summit 2026 Partnership Inquiry [${partnerType}]`);
    const mailBody = encodeURIComponent(`Hello SLASSCOM Team,\n\nI am interested in partnering with AI Asia Summit 2026.\n\nName / Organization: ${name || 'N/A'}\nWork Email: ${email}\nPartnership Category: ${partnerType}\n\nPlease share the detailed sponsorship proposal and partnership packages.\n\nBest regards,\n${name || email}`);
    
    setTimeout(() => {
      window.location.href = `mailto:corpoffice@slasscom.lk?subject=${mailSubject}&body=${mailBody}`;
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
    const title = encodeURIComponent("AI Asia Summit 2026 — AI The Multiplier Effect");
    const details = encodeURIComponent("Asia's flagship artificial intelligence conference organized by SLASSCOM in Colombo, Sri Lanka.");
    const location = encodeURIComponent("Colombo, Sri Lanka (Venue TBA)");
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261112T030000Z/20261112T123000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const formatDigit = (num) => String(num).padStart(2, '0');

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/slasscom/', Icon: LinkedInIcon },
    { name: 'X (Twitter)', href: '#', Icon: XIcon },
    { name: 'Facebook', href: '#', Icon: FacebookIcon },
    { name: 'Instagram', href: '#', Icon: InstagramIcon },
    { name: 'YouTube', href: '#', Icon: YouTubeIcon }
  ];

  const marqueeItems = [
    "AI ASIA SUMMIT 2026",
    "THEME: AI THE MULTIPLIER EFFECT",
    "NOVEMBER 2026",
    "COLOMBO, SRI LANKA",
    "PARTNER WITH US: CORPOFFICE@SLASSCOM.LK",
    "ORGANISED BY SLASSCOM",
    "ASIA'S PREMIER AI CONFERENCE"
  ];

  return (
    <>
      {/* Precision Custom Pointer Cursor */}
      <CustomCursor />

      <div className="page-wrapper">
        {/* Top Executive Navbar Header */}
        <header className="navbar">
          <div className="container">
            <div className="navbar-inner">
              <a href="#" className="navbar-logo-link">
                <img
                  src="/logo-white.png"
                  alt="SLASSCOM AI ASIA SUMMIT 2026"
                  className="navbar-transparent-logo"
                />
              </a>

              <ul className="nav-links">
                <li><a href="#" className="nav-link active">Home</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#focus-areas" className="nav-link">Thematic Pillars</a></li>
                <li><a href="#partner-section" className="nav-link">Partnership</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
              </ul>

              {SHOW_PARTNER_SECTION && (
              <div className="nav-controls-group">
                <a
                  href="/sponsorship-proposal.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-pdf"
                >
                  <FileText size={14} />
                  <span>Sponsorship Proposal</span>
                </a>

                <button className="btn-buy-ticket" onClick={() => {
                  document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  PARTNER WITH US
                </button>
              </div>
              )}
            </div>
          </div>
        </header>

        {/* Executive Hero Section */}
        <main className="hero-section container">
          {/* HD YouTube Video Background — scoped to hero section only */}
          <YouTubeBackground isVideoActive={true} isMuted={true} />

          <div className="hero-content">
            {/* Official White Logo */}
            <div className="hero-logo-transparent-wrapper">
              <img
                src="/logo-white.png"
                alt="AI ASIA SUMMIT 2026 SLASSCOM Logo"
              />
            </div>

            {/* Headline Typography */}
            <h1 className="hero-title-text hero-title-animated">
              {"LAUNCHING SOON".split("").map((char, i) => (
                <span key={i} className="hero-letter" style={{ '--i': i }}>
                  {char === " " ? " " : char}
                </span>
              ))}
            </h1>

            <div className="hero-theme-badge">
              <span>THEME: AI THE MULTIPLIER EFFECT</span>
            </div>

            {/* Interactive 3D AI Robot Face / Visual Showcase */}
            <AiRobotVisual />

            {/* Event Date & Location Pills */}
            <div className="event-pills-row">
              <div className="event-pill">
                <span className="event-pill-icon"><Calendar size={16} /></span>
                <span>November 2026</span>
              </div>
              <div className="event-pill">
                <span className="event-pill-icon"><MapPin size={16} /></span>
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="event-pill">
                <span className="event-pill-icon"><Building2 size={16} /></span>
                <span>SLASSCOM Ecosystem</span>
              </div>
            </div>

            {/* Action CTAs */}
            {SHOW_PARTNER_SECTION && (
            <div className="hero-cta-group">
              <button className="btn-primary-purple" onClick={() => {
                document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                PARTNER WITH US
              </button>

              <a
                href="/sponsorship-proposal.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-outline-glass"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <Download size={16} />
                <span>VIEW SPONSORSHIP PROPOSAL (PDF)</span>
              </a>
            </div>
            )}

            {/* FROSTED GLASSMORPHISM COUNTDOWN TIMER */}
            <div className="glass-countdown-container">
              <div className="glass-countdown-header">
                <Clock size={16} style={{ color: '#E8B84B' }} />
                <span>EVENT COUNTDOWN • UTC+5:30 COLOMBO TIME</span>
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
          </div>
        </main>

        {/* ABOUT SECTION */}
        <AboutSection />

        {/* 2025 EVENT HIGHLIGHTS — SCROLL-DRIVEN IMAGE GALLERY */}
        <EventHighlightsSection />

        {/* 2026 THEMATIC FOCUS AREAS */}
        <FocusAreasSection />

        {/* PARTNER WITH US SECTION */}
        {SHOW_PARTNER_SECTION && (
        <section className="container">
          <div className="notify-glass-box" id="partner-section">
            <div className="partner-header-tag">
              <Handshake size={16} style={{ color: '#E8B84B' }} />
              <span>PARTNERSHIP OPPORTUNITIES</span>
            </div>

            <h2 className="partner-section-title">
              Become a Sponsor, Speaker or Event Partner
            </h2>

            {!submitted ? (
              <form className="partner-form-card" onSubmit={handlePartnerSubmit}>
                {/* Category Selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-field-label">
                    Sponsorship / Partnership Category
                  </label>
                  <select 
                    value={partnerType} 
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="form-select-field"
                  >
                    <option value="Strategic Sponsor">Strategic Sponsor (LKR 5.0 Mn + Taxes)</option>
                    <option value="Platinum Sponsor">Platinum Sponsor (LKR 2.5 Mn + Taxes)</option>
                    <option value="Gold Sponsor">Gold Sponsor (LKR 1.5 Mn + Taxes)</option>
                    <option value="Silver Sponsor">Silver Sponsor (LKR 1.0 Mn + Taxes)</option>
                    <option value="Keynote / Session Speaker">Keynote / Session Speaker</option>
                    <option value="Academic & Research Partner">Academic & Research Partner</option>
                    <option value="Executive Delegate Pass">Executive Delegate / Enterprise Passes</option>
                  </select>
                </div>

                <div className="form-fields-grid">
                  <div>
                    <label className="form-field-label">
                      Your Name / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe / GlobalTech Inc."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input-field"
                    />
                  </div>
                  <div>
                    <label className="form-field-label">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input-field"
                    />
                  </div>
                </div>

                <div className="partner-buttons-row">
                  <button type="submit" className="btn-gold-action">
                    <span>Submit Partnership Inquiry</span>
                    <Send size={16} />
                  </button>

                  <a 
                    href="/sponsorship-proposal.pdf" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-pdf-proposal"
                  >
                    <FileText size={16} />
                    <span>View Sponsorship Deck (PDF)</span>
                  </a>
                </div>

                <div className="dispatch-note">
                  Inquiries directly dispatched to <strong style={{ color: '#E8B84B' }}>corpoffice@slasscom.lk</strong>
                </div>
              </form>
            ) : (
              <div className="glass-success-card">
                <CheckCircle2 size={40} style={{ color: '#E8B84B', margin: '0 auto 0.75rem' }} />
                <h3 className="success-title">Partnership Request Dispatched!</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto' }}>
                  Thank you <strong style={{ color: '#FFFFFF' }}>{name || email}</strong>. Your <strong style={{ color: '#00A3E0' }}>{partnerType}</strong> proposal request has been dispatched directly to <strong style={{ color: '#E8B84B' }}>corpoffice@slasscom.lk</strong>. The SLASSCOM leadership team will contact you shortly.
                </p>
              </div>
            )}

            {/* Quick Secondary Utilities */}
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
                href="mailto:corpoffice@slasscom.lk" 
                className="btn-glass-sm" 
                style={{ textDecoration: 'none' }}
              >
                <Mail size={14} style={{ color: '#E8B84B' }} />
                <span>corpoffice@slasscom.lk</span>
              </a>
            </div>
          </div>
        </section>
        )}

        {/* Marquee Strip */}
        <div className="marquee-bar" aria-hidden="true">
          <div className="marquee-content">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div className="marquee-node" key={idx}>
                <span>{item}</span>
                <span className="marquee-star">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer-bar" id="contact">
          <div className="container">
            <div className="footer-grid">
              {/* Brand Column */}
              <div className="footer-col footer-col-brand">
                <TransparentLogo
                  src="/logo.png"
                  alt="AI ASIA SUMMIT 2026 SLASSCOM Logo"
                  className="footer-logo"
                />
                <p className="footer-tagline">
                  Asia's flagship artificial intelligence conference, uniting leaders,
                  innovators, and enterprises to explore AI as the multiplier effect
                  for the region's future.
                </p>
                <div className="footer-social-row">
                  {socialLinks.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-social-icon"
                      aria-label={name}
                      title={name}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="footer-col">
                <h4 className="footer-col-title">Quick Links</h4>
                <ul className="footer-links-list">
                  <li><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#focus-areas">Thematic Pillars</a></li>
                  <li><a href="#partner-section">Partnership</a></li>
                  <li><a href="#contact">Contact</a></li>
                  {SHOW_PARTNER_SECTION && (
                  <li>
                    <a href="/sponsorship-proposal.pdf" target="_blank" rel="noreferrer">
                      Sponsorship Proposal <ExternalLink size={12} style={{ display: 'inline', marginLeft: 4, verticalAlign: 'middle' }} />
                    </a>
                  </li>
                  )}
                </ul>
              </div>

              {/* Contact Info Column */}
              <div className="footer-col">
                <h4 className="footer-col-title">Contact Us</h4>
                <ul className="footer-contact-list">
                  <li>
                    <span className="footer-contact-icon"><MapPin size={16} /></span>
                    <span>
                      SLASSCOM Corporate Office<br />
                      C/O Elegance, No. 31, Queens Road,<br />
                      Colombo 00300, Sri Lanka
                    </span>
                  </li>
                  <li>
                    <span className="footer-contact-icon"><Phone size={16} /></span>
                    <a href="tel:+94775277266">+94 77 527 7266</a>
                  </li>
                  <li>
                    <span className="footer-contact-icon"><Mail size={16} /></span>
                    <a href="mailto:corpoffice@slasscom.lk">corpoffice@slasscom.lk</a>
                  </li>
                </ul>
              </div>

              {/* Organiser Column */}
              <div className="footer-col">
                <h4 className="footer-col-title">Organised By</h4>
                <a href="https://slasscom.lk" target="_blank" rel="noreferrer" className="footer-org-link">
                  <Building2 size={16} />
                  <span>SLASSCOM Official Website</span>
                  <ExternalLink size={12} />
                </a>
                <button className="footer-back-to-top" onClick={() => {
                  document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <Handshake size={16} />
                  <span>Become a Partner</span>
                </button>
              </div>
            </div>

            <div className="footer-divider" />

            <div className="footer-bottom-bar">
              <div>
                © 2026 AI Asia Summit. Organised by <strong style={{ color: '#E8B84B' }}>SLASSCOM</strong>. All rights reserved.
              </div>
              <button className="footer-scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
                <ArrowRight size={16} style={{ transform: 'rotate(-90deg)' }} />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
