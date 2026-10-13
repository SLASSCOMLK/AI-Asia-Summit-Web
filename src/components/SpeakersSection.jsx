import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const speakers = [
  {
    id: "malith",
    name: "Dr. Malith Jayasinghe",
    designation: "Vice President of AI",
    company: "WSO2",
    image: "/speaker-malith.jpg",
    linkedin: "https://www.linkedin.com/in/malith-jayasinghe/",
    bio: [
      "Malith Jayasinghe is VP of AI at WSO2, where he leads initiatives to build scalable, secure, and production-ready AI systems for the enterprise. With over 15 years of experience building, scaling, and optimizing complex systems, he focuses on bringing AI into production and improving developer productivity.",
      "His work spans AI strategy, agent platforms, observability, evaluation, governance, security, and enterprise integration. An architect, product leader, and frequent speaker at events such as DeveloperWeek, the Global Big Data Conference, and DEV DAY, Malith shares insights on enterprise AI, software architecture, and emerging technology trends.",
      "He holds a PhD in Computer Science from RMIT University, Australia. He has published in leading journals and conferences, including IEEE Transactions on Parallel and Distributed Systems (TPDS), the Journal of Parallel and Distributed Computing (JPDC), IEEE Cluster, and IEEE NCA.",
    ],
  },
  {
    id: "dehan",
    name: "Dehan Vithana",
    designation: "Lead Data Evangelist",
    company: "MAS Holdings",
    image: "/speaker-dehan.jpg",
    linkedin: "https://www.linkedin.com/in/dehanvithana/",
    bio: [
      "Dehan Vithana is an enterprise AI strategist, Data Evangelist, and engineering leader operating at the intersection of advanced analytics, decision intelligence, and business transformation.",
      "An engineering alumnus of the University of Moratuwa, he has spearheaded analytics initiatives across MAS Holdings, translating complex digital architectures into measurable commercial impact and robust governance frameworks.",
      "An active voice in the technology ecosystem, Dehan regularly shares his expertise at industry symposiums and panels, focusing on pragmatic AI adoption, digital manufacturing, and cultivating a high-impact, data-driven culture.",
    ],
  },
  {
    id: "moumita",
    name: "Moumita Sarker",
    designation: "Founder and CEO",
    company: "Illuminati Consulting",
    image: "/speaker-moumita.jpg",
    linkedin: "https://www.linkedin.com/in/moumitasarkervp/",
    bio: [
      "Moumita Sarker is the Founder and CEO of Illuminati Consulting, an AI consulting firm that helps businesses unlock measurable value through practical, purpose-driven AI solutions. With over 21 years of experience, she has witnessed every major evolution in AI and analytics, from traditional statistical modelling and machine learning to today's Agentic AI, giving her a pragmatic, business-first perspective on technology adoption and value realization.",
      "She has led transformative AI and analytics programs across banking, retail, QSR, hospitality, insurance, automotive, construction, and CPG, delivering solutions in sales acceleration, customer lifecycle management, end-to-end agentic transformation, dynamic pricing and promotions, predictive maintenance, forecasting, and AI for CFOs.",
      "Prior to founding Illuminati Consulting, she headed the Agentic AI Centre of Excellence for Deloitte South Asia and was a founding member of Cartesian Consulting. Her earlier experience includes J.P. Morgan and HDFC Bank, where she began her analytics journey.",
      "An alumna of the Indian Statistical Institute, Moumita combines deep expertise in Agentic AI, Generative AI, Machine Learning, business analytics, and statistical modelling with a strong focus on commercially viable outcomes. A firm believer in continuous learning, she is passionate about helping organizations translate AI into sustained business impact.",
    ],
  },
  {
    id: "shanil",
    name: "Shanil Fernando",
    designation: "Co-Founder & Chief Technology and AI Officer",
    company: "Cut+Dry",
    image: "/Speaker- Shanil.jpeg",
    linkedin: "https://www.linkedin.com/in/shanil-fernando-3376222/",
    bio: [
      "Shanil is a visionary technology leader with over two decades of global experience, known for his expertise in nurturing and expanding tech startups. His most recent ten years have been dedicated to the intersection of food, restaurants, and technology.",
      "His career began as a founding software engineer at the IT consulting firm Virtusa (NASDAQ: VRTU), where he played a pivotal role in the company's growth, ultimately leading to its listing on the Nasdaq stock exchange. After his tenure at Virtusa, Shanil co-founded CAKE, alongside Mani and Jim.",
      "At Sysco, Shanil spearheaded the establishment and expansion of Sysco Labs, the company's innovation arm that drives technological transformation throughout the organization. Notably, Shanil played a key role in establishing an offshore captive center for Sysco, which boasted a workforce of over 950 IT professionals.",
      "In his current role at Cut+Dry, Shanil serves as the Chief Technology and AI Officer, leveraging his extensive experience and expertise to drive technological advancements within the food service industry.",
    ],
  },
  {
    id: "rukshan",
    name: "Dr. Rukshan Batuwita",
    designation: "Staff Research Engineer",
    company: "Google",
    image: "/speaker-rukshan.jpg",
    linkedin: "https://www.linkedin.com/in/rukshanbatuwita/",
    bio: [
      "Dr. Rukshan Batuwita is a Staff Research Engineer at Google and an internationally recognized machine learning researcher with deep expertise in frontier foundation models, real-world algorithm architecture, and AI safety.",
      "Prior to Google, he served as Lead Data Scientist at Woolworths Group and held research and academic posts across prestigious Australian institutions, translating cutting-edge ML theory into mission-critical commercial deployments.",
      "A frequent keynote speaker and advisory member at the SLASSCOM AI Asia Summit, Rukshan actively champions responsible AI deployment, scientific acceleration, and healthcare diagnostic systems across the Asia-Pacific region."
    ],
  },
  {
    id: "vajira",
    name: "Vidya Jyothi Prof. Vajira H. W. Dissanayake MBBS, PhD, FNASSL, FIAHSI, FCMA, FRCP",
    designation: "Chair and Senior Professor of Anatomy, Genetics and Biomedical Informatics",
    company: "University of Colombo, Sri Lanka",
    image: "/Prof Vajira.jpeg",
    linkedin: "https://www.linkedin.com/in/vajirahwd/",
    bio: [
      "He served as Dean of the Faculty of Medicine from 2020 to 2026, during which he led major reforms in medical education, research, and international collaboration including the setting up of the Centre for Health Systems Policy and Innovation that is engaged in a technical collaboration with the World Health Organization Regional Office for South-East Asia (WHO SEARO) on leadership and capacity development for precision medicine, primary health care, and universal health coverage to which he provides leadership as its Founding Director. He is also Chairman of the Board of Management, Chairman of the Specialty Board in Biomedical Informatics, and Chairman of the Specialty Board in Clinical Genetics at the Postgraduate Institute of Medicine, University of Colombo.",
      "Professor Dissanayake is an internationally recognised leader in the field of medicine. Over the past three decades, he has played a pivotal role in establishing and advancing the disciplines of genetics, genomics, digital health, biomedical informatics, precision medicine, and bioethics in Sri Lanka while contributing to their global development through leadership, research, education, and policy.",
      "He has held numerous distinguished national and international leadership positions, including President of the Sri Lanka Medical Association, President of the Sri Lanka Medical Council, President of the Commonwealth Medical Association, Chairperson of the Commonwealth Health Professions and Partners Alliance, President of the Health Informatics Society of Sri Lanka, President of the Asia-Pacific Association for Medical Informatics, Vice President of the International Medical Informatics Association, Chairperson of the Global Genomic Medicine Collaborative, and Steering Committee Member of the Forum for Ethical Review Committees in Asia and the Western Pacific. He has served as an expert advisor to both the World Health Organization and the Commonwealth Secretariat.",
      "He currently serves as Founding Chairman of the Commonwealth Centre for Digital Health (United Kingdom), Founding Trustee of the Global Genomics Network for Education and Training (United Kingdom), Member of the Global Existential Security Threats Board of the Interaction Council of Former Heads of State and Government, Member of the Health Expert Group of the Association of Commonwealth Universities, and Member of the International Advisory Board of The Lancet Digital Health. His work has significantly influenced national health policy, medical education, and the development of genomic medicine and digital health across low- and middle-income countries.",
      "In recognition of his outstanding contributions to science and medicine, he was conferred the Sri Lankan national honour Vidya Jyothi in 2019 by His Excellency the President of Sri Lanka, the nation’s highest civilian honours for exceptional scientific achievement."
    ],
  },
];

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip-li-sp)">
      <path
        d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip-li-sp">
        <rect width={16} height={16} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

function SpeakerCard({ speaker, index, onOpen }) {
  return (
    <motion.article
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="speaker-card"
      onClick={() => onOpen(speaker)}
      role="button"
      tabIndex={0}
      aria-label={"View bio for " + speaker.name}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(speaker)}
    >
      <div className="speaker-card-img-wrap">
        <img src={speaker.image} alt={speaker.name} className="speaker-card-img" loading="lazy" />
        <div className="speaker-card-hover-overlay">
          <span className="speaker-view-bio-label">View Bio</span>
        </div>
        <div className="speaker-card-img-fade" />
      </div>

      <div className="speaker-card-info">
        <div className="speaker-card-text">
          <h3 className="speaker-name" title={speaker.name}>{speaker.name}</h3>
          <p className="speaker-role" title={speaker.designation}>{speaker.designation}</p>
        </div>
        <div className="speaker-card-footer">
          <span className="speaker-company" title={speaker.company}>{speaker.company}</span>
          <a
            href={speaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="speaker-linkedin-btn"
            aria-label={speaker.name + " LinkedIn"}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkedInIcon size={13} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function BioModal({ speaker, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <motion.div
        className="speaker-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="speaker-modal-panel"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        role="dialog"
        aria-modal="true"
        aria-label={speaker.name + " biography"}
      >
        <button className="speaker-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="speaker-modal-inner">
          <div className="speaker-modal-left">
            <div className="speaker-modal-img-wrap">
              <img src={speaker.image} alt={speaker.name} className="speaker-modal-img" />
              <div className="speaker-modal-img-glow" />
            </div>
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="speaker-modal-linkedin-btn"
            >
              <LinkedInIcon size={16} />
              <span>View LinkedIn Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="speaker-modal-right">
            <div className="speaker-modal-tag">Speaker · AI Asia Summit 2026</div>
            <h2 className="speaker-modal-name">{speaker.name}</h2>
            <div className="speaker-modal-meta">
              <span className="speaker-modal-designation">{speaker.designation}</span>
              <span className="speaker-modal-sep">·</span>
              <span className="speaker-modal-company">{speaker.company}</span>
            </div>
            <div className="speaker-modal-divider" />
            <div className="speaker-modal-bio">
              {speaker.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function SpeakersSection() {
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  return (
    <section id="speakers" className="speakers-section container">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="speakers-header"
      >
        <div className="section-eyebrow-tag">
          <span className="eyebrow-dot" />
          <span>SPEAKERS</span>
        </div>
        <h2 className="speakers-title">Meet the Speakers</h2>
        <p className="speakers-subtitle">
          World-class AI leaders, researchers, and innovators sharing transformative insights
          at Asia&#39;s premier artificial intelligence conference.
        </p>
      </motion.div>

      <div className="speakers-grid">
        {speakers.map((speaker, i) => (
          <SpeakerCard key={speaker.id} speaker={speaker} index={i} onOpen={setActiveSpeaker} />
        ))}
      </div>

      <AnimatePresence>
        {activeSpeaker && (
          <BioModal key="bio-modal" speaker={activeSpeaker} onClose={() => setActiveSpeaker(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

