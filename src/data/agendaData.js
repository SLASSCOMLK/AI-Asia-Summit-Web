// AI Asia Summit 2026 - Official Schedule & Agenda Data with Assigned Speakers and Timings

export const agendaSchedule = [
  {
    id: "registration",
    time: "8:00 AM",
    title: "Registration & Welcome",
    category: "break",
    track: "Registration Desk & Foyer"
  },
  {
    id: "opening-remarks",
    time: "9:00 AM",
    title: "Opening Remarks by Chairperson, SLASSCOM",
    category: "keynote",
    track: "Main Plenary Hall"
  },
  {
    id: "1",
    number: "01",
    time: "9:10 AM",
    title: "Opening Keynote: The Economics of AI in 2026 – Real ROI and Cost Governance",
    category: "keynote",
    track: "Main Plenary Hall",
    speakers: [
      {
        name: "Biswajit Das",
        designation: "Head - Specialist Sales & AI GTM India & South Asia",
        company: "Amazon Web Services",
        image: "/biswajit.jpeg"
      }
    ]
  },
  {
    id: "2",
    number: "02",
    time: "9:40 AM",
    title: "Building on Sri Lanka’s Digital Assets",
    category: "keynote",
    track: "Main Plenary Hall",
    speakers: [
      {
        name: "Vidya Jyothi Prof. Vajira Dissanayake",
        designation: "Chair and Senior Professor",
        company: "University of Colombo",
        image: "/Prof Vajira.jpeg"
      }
    ]
  },
  {
    id: "3",
    number: "03",
    time: "10:02 AM",
    title: "AI in Scientific Acceleration",
    category: "track",
    track: "Frontier Science",
    speakers: [
      {
        name: "Dr. Rukshan Batuwita",
        designation: "Staff Research Engineer",
        company: "Google",
        image: "/speaker-rukshan.jpg"
      }
    ]
  },
  {
    id: "tea-break",
    time: "10:30 AM",
    title: "Connections that Multiply: Tea/Coffee & Networking",
    category: "break",
    track: "Networking Lounge"
  },
  {
    id: "4",
    number: "04",
    time: "11:00 AM",
    title: "The Agentic Age: From Prompting to Autonomous Systems",
    category: "keynote",
    track: "Main Plenary Hall",
    speakers: [
      {
        name: "Dr. Malith Jayasinghe",
        designation: "Vice President of AI",
        company: "WSO2",
        image: "/speaker-malith.jpg"
      }
    ]
  },
  {
    id: "5",
    number: "05",
    time: "11:40 AM",
    title: "AI Governance and Policy",
    category: "panel",
    track: "Policy & Sovereign AI",
    speakers: [
      {
        name: "Ashwini Natesan",
        designation: "Legal Consultant / Research Fellow",
        company: "TMT Law",
        image: "/Ahvini.jpeg"
      },
      {
        name: "Sithira Wanniarachchi",
        designation: "Group Chief Information Security Officer",
        company: "Janashakthi Group",
        image: "/Sithira.jpeg"
      },
      {
        name: "Jayantha Fernando",
        designation: "Senior Consultant Tech Law, Privacy, AI & TMT",
        company: "Heritage Partners",
        image: "/jayantha.png"
      },
      {
        name: "Asela Waidyalankara",
        designation: "Managing Director",
        company: "Talos Consulting",
        isModerator: true,
        image: "/Asela.png"
      }
    ]
  },
  {
    id: "lunch-break",
    time: "12:15 PM",
    title: "Ideas that Multiply | Lunch",
    category: "break",
    track: "Dining & Networking Hall"
  },
  {
    id: "6",
    number: "06",
    time: "1:30 PM",
    title: "Breakout Sessions (Happening Simultaneously)",
    category: "breakout",
    isBreakout: true,
    sessions: [
      {
        track: "Banking and Finance",
        title: "Predictive Analytics & Risk Management",
        color: "#3B82F6",
        speakers: [
          {
            name: "Dumindu Tennakoon",
            designation: "Country Manager",
            company: "Redington Sri Lanka & Maldives",
            image: "/Dumindu.png"
          },
          {
            name: "Mark Surgenor",
            designation: "Chief Executive Officer",
            company: "HSBC Sri Lanka & Maldives",
            image: "/Mark.jpeg"
          },
          {
            name: "Mahesha Amarasuriya",
            designation: "Country Manager",
            company: "Mastercard Sri Lanka",
            image: "/Mahesha.jpeg"
          },
          {
            name: "Harshan Senadheera",
            designation: "Chief Manager Organizational Transformation",
            company: "Sampath Bank PLC",
            isModerator: true,
            image: "/Harshan.png"
          }
        ]
      },
      {
        track: "Healthcare & Life Sciences",
        title: "Accelerating Diagnostics with Computer Vision",
        color: "#10B981",
        speakers: [
          {
            name: "Dr. Rukshan Batuwita",
            designation: "Staff Research Engineer",
            company: "Google",
            image: "/speaker-rukshan.jpg"
          },
          {
            name: "Prof. Vajira Dissanayake",
            designation: "Chair and Senior Professor",
            company: "University of Colombo",
            image: "/Prof Vajira.jpeg"
          },
          {
            name: "Dr. Dhanushi Hettiarachchi",
            designation: "CEO and Co-founder",
            company: "Ophtha Innovations",
            image: "/Dr dhanuhsi.jpeg"
          },
          {
            name: "Dr. Ruvan Weerasinghe",
            designation: "Senior Researcher",
            company: "Moderator",
            isModerator: true,
            image: "/ruwan.png"
          }
        ]
      },
      {
        track: "Manufacturing & Supply Chain / Logistics",
        title: "Demand Forecasting & Inventory Optimization",
        color: "#F59E0B",
        speakers: [
          {
            name: "Shanil Fernando",
            designation: "Co-Founder & Chief Technology and AI Officer",
            company: "Cut+Dry",
            image: "/Speaker- Shanil.jpeg"
          },
          {
            name: "Moumita Sarker",
            designation: "Founder and CEO",
            company: "Illuminati Consulting",
            image: "/speaker-moumita.jpg"
          },
          {
            name: "Dehan Vithana",
            designation: "Lead Data Evangelist",
            company: "MAS Holdings",
            image: "/speaker-dehan.jpg"
          },
          {
            name: "Devmin Jayawardena",
            designation: "Senior Manager Data Science, AI Lead",
            company: "Grant Thornton Stax",
            isModerator: true,
            image: null
          }
        ]
      }
    ]
  },
  {
    id: "7",
    number: "07",
    time: "2:55 PM",
    title: "AI the Multiplier Challenge",
    category: "track",
    track: "Main Stage"
  },
  {
    id: "8",
    number: "08",
    time: "3:30 PM",
    title: "Masterclass: Building an AI-Ready Culture",
    category: "masterclass",
    track: "Executive Masterclass Stage",
    speakers: [
      {
        name: "Moumita Sarker",
        designation: "Founder and CEO",
        company: "Illuminati Consulting",
        image: "/speaker-moumita.jpg"
      }
    ]
  },
  {
    id: "9",
    number: "09",
    time: "4:20 PM",
    title: "Closing Keynote: The Next Frontier – What to Expect in 2027",
    category: "keynote",
    track: "Main Plenary Hall",
    speakers: [
      {
        name: "Dr. Sanjiva Weerawarana",
        designation: "Founder & Chairman of Lanka Software Foundation",
        company: "WSO2 / Lanka Software Foundation",
        image: "/sanjiva.jpeg"
      }
    ]
  },
  {
    id: "closing-remarks",
    time: "4:50 PM",
    title: "Closing Remarks",
    category: "keynote",
    track: "Main Plenary Hall"
  },
  {
    id: "beyond-summit",
    time: "5:00 PM",
    title: "Beyond the Summit: Networking Session",
    category: "break",
    track: "Networking Lounge & Terrace"
  }
];
