import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Hasnane Nawaz",
    title: "Social Media Marketer | Content & Growth Strategy",
    location: "Durg, Chhattisgarh",
    contact: {
      phone: "+91 8269786782",
      email: "hasnanenawaz@gmail.com",
      website: "https://www.reallygreatsite.com",
    },
  },
  profileSummary:
    "I am passionate about social media marketing, even though I am pursuing law that's another story. For the past 2.5 years, I have been consistently working in the field of social media marketing, gaining hands-on experience in sales, growth strategies, and audience engagement.",
  education: [
    {
      degree: "Bachelor of Law",
      program: "BA. LLB (Legum Baccalaureus)",
      duration: "2023 - 2028",
    },
  ],
  experience: [
    {
      company: "Buddin Mariners",
      role: "Marketing & Sales Head",
      duration: "Feb 2024 - Mar 2025",
      responsibilities: [
        "Led end-to-end marketing and sales operations, driving rapid community and revenue growth",
        "Grew the BM GP Rating Community from 10,000 to 50,000+ members within 4 months across Telegram and WhatsApp",
        "Built and scaled Telegram channels from 0 to 5,000+ members with high engagement and retention",
        "Headed a team of 30 sales callers, improving lead conversion efficiency and closing performance",
        "Increased company revenue from ₹40,000 to ₹3,10,000 within 2 months through structured lead management and sales tracking",
        "Designed high-conversion promotional creatives using Canva for lead generation via WhatsApp and Telegram",
      ],
    },
    {
      company: "The Jus Anima",
      role: "Social Media & Community Growth Manager",
      duration: "Mar 2025 - Aug 2025",
      responsibilities: [
        "Scaled a legal education community from 1,500 to 6,000 members (300% growth) within 2 months",
        "Implemented structured content planning and daily engagement strategies",
        "Managed social media operations and optimized posting schedules",
        "Increased organic reach through audience-centric legal content",
      ],
    },
  ],
  skills: [
    "Social Media Marketing",
    "Lead Generation",
    "Communication",
    "Leadership",
    "MS Office",
    "Teamwork",
    "Time Management",
    "Effective Communication",
    "Critical Thinking",
  ],
  languages: [
    {
      language: "English",
      proficiency: "Fluent",
    },
  ],
  workShowcase: [
    {
      title: "Legal Requisites Batch Brochure",
      description: "Brochure design for legal education platform",
      link: "https://www.canva.com/design/DAG489DRJF8/qYDZpGw-5dE1Qqvk1defAg/edit",
    },
    {
      title: "Batch Details Brochure",
      description: "Course batch information design",
      link: "https://www.canva.com/design/DAG48x4cItM/PRUQQScWhElHRlEgr85TjQ/edit",
    },
    {
      title: "Live Session Graphics",
      description: "Social media promotional content",
      link: "https://www.canva.com/design/DAG73VCD4o8/d6MnwBRCrTxEvBvnsvHtzw/edit",
    },
  ],
  socialMediaPagesManagerOf: [
    {
      pageName: "Legal Requisites",
      profileLink: "https://www.instagram.com/legal_requisites/",
    },
    {
      pageName: "BM GP Rating",
      profileLink: "https://www.instagram.com/bmgprating/",
    },
  ],
  beyondResume: {
    title: "Beyond the Resume",
    items: [
      {
        title: "Pursuing Law",
        description:
          "Currently in my 4th year of college — a lawyer turned social media marketing enthusiast.",
      },
      {
        title: "Content Writing",
        description:
          "Started with writing and published three articles on Dailyhunt.",
      },
      {
        title: "Creative Design",
        description:
          "Learned graphic design at an EdTech company and discovered my creative passion.",
      },
    ],
  },
  metrics: [
    { value: 50000, suffix: "+", label: "Community Members Grown" },
    { value: 67.5, suffix: "%", label: "Revenue Increase" },
    { value: 30, suffix: "+", label: "Team Members Led" },
    { value: 2.5, suffix: " yrs", label: "Industry Experience" },
  ],
};
