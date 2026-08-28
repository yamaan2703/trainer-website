/**
 * Real site copy, pulled verbatim from the source content audit
 * (website-content.md). Kept in one place so every section component stays
 * a pure render of real data — no copy is invented in JSX.
 */

export const site = {
  name: "Cameron Clark Fitness",
  shortName: "Cameron Clark",
  email: "cameron@cameronclarkfitness.com",
  phone: "650-776-0600",
  phoneHref: "tel:6507760600",
  emailHref: "mailto:cameron@cameronclarkfitness.com?subject=Contact",
  discoveryCallHref: "/contact",
  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/CameronClarkFitness/",
      network: "facebook" as const,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/cameronclarkfitness/",
      network: "instagram" as const,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/cameronclarkfitness/",
      network: "linkedin" as const,
    },
  ],
  /** Left rail on the homepage hero — Instagram + direct contact. */
  heroRail: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/cameronclarkfitness/",
      network: "instagram" as const,
    },
    {
      label: "Email",
      href: "mailto:cameron@cameronclarkfitness.com?subject=Contact",
      network: "email" as const,
    },
    {
      label: "Call",
      href: "tel:6507760600",
      network: "phone" as const,
    },
  ],
};

/** Primary pages — opened from the full-screen menu. */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/service" },
];

export const footerNav = [
  ...nav,
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Personal Fitness Coaching — Online & In-Person",
  headlineLine1: "Stop Wondering ",
  headlineLine2: "What Will Hurt",
  headline: "Stop Wondering What Will Hurt When You Wake Up",
  cta: "Discovery Call",
  sub: "Get stronger, leaner, and more energized with custom fitness and nutrition coaching that fits your lifestyle.",
  stat: "20+",
  statLabel: "Years Coaching",
};

export const press = [
  { name: "The Property Investor", file: "property-investor" },
  { name: "Money", file: "money" },
  { name: "The New Daily", file: "the-new-daily" },
  { name: "Amazon", file: "amazon" },
  { name: "9 News", file: "9news" },
];

export const reality = {
  eyebrow: "The Reality",
  heading: "High Performers Face",
  body: [
    "You've crushed it professionally. The career you've built, the income you've earned, the respect you've gained, it's exactly what you worked for. But somewhere along the way, your body became the casualty of your success.",
    "You didn't sacrifice your health to build your career on purpose. It just happened gradually, one late night and skipped workout at a time. But now you're here, and something has to change.",
  ],
};

export const servicesIntro = {
  heading: "Fitness Programs Designed Around You",
  body: "Your body isn't a stock model, it's a high-performance machine that deserves a custom rebuild. Every service we offer is engineered to fit your lifestyle, maximize your time, and deliver results you can sustain.",
};

/**
 * Service cards. Each one carries everything the stacked-card layout needs:
 * the framed image label, a single-sentence headline, the supporting copy,
 * and the deliverables column on the right. All copy is lifted from the
 * corresponding service page in website-content.md.
 */
export const services = [
  {
    index: "1",
    id: "online",
    label: "Online Coaching",
    title: "The Elevated Professional Program",
    headline: "From exhausted executive to peak performer in 8 weeks.",
    description:
      "A precision-engineered health system built for high-performing executives who want to regain the physical edge they lost while building their careers. Strategic assessment, a custom rebuild, then ongoing tuning, so the program evolves as fast as your life does.",
    detail:
      "A precision-engineered health system for executives who want to regain the physical edge they've lost while building their careers.",
    deliverables: [
      "Strategic Assessment",
      "Custom Program Design",
      "Efficient Workouts",
      "Nutrition Strategy",
      "Recovery Systems",
      "Weekly Coaching",
      "Real-time Adjustments",
      "Direct Access to Cameron",
    ],
    stat: "$1,500",
    statLabel: "8-week reset",
    cta: "Explore the program",
    image: "/images/service-1.png",
  },
  {
    index: "2",
    id: "in-person",
    label: "In-Person Training",
    title: "Tailored In-Person Training",
    headline: "The premium in-person experience.",
    description:
      "When you train in person, you're not working with a random gym trainer, you're working directly with Cameron. Every movement is monitored, every adjustment tailored, and every session designed to fit your demanding lifestyle.",
    detail:
      "For professionals in Dallas and the Bay Area who need real-time corrections and precise, focused attention.",
    deliverables: [
      "Real-time Corrections",
      "Movement Screening",
      "Precision Form Coaching",
      "Face-to-face Accountability",
      "Session Programming",
      "Schedule Flexibility",
      "Dallas & Bay Area",
    ],
    stat: "20 yrs",
    statLabel: "specialized expertise",
    cta: "Explore the program",
    image: "/images/service-2.png",
  },
  {
    index: "3",
    id: "partnership",
    label: "Ongoing Partnership",
    title: "Ongoing Performance Partnership",
    headline: "Continuous evolution as your life changes.",
    description:
      "Most clients continue after the first eight weeks for ongoing tuning, quarterly reviews and long-term support, so the gains you made under pressure hold through travel, deadlines and everything else the calendar throws at you.",
    detail:
      "Long-term health and energy maintenance, with quarterly reviews and priority access to Cameron.",
    deliverables: [
      "Ongoing Tuning",
      "Quarterly Reviews",
      "Priority Access",
      "Program Evolution",
      "Long-term Maintenance",
      "Direct Support",
    ],
    stat: "$500",
    statLabel: "per month",
    cta: "Continue your progress",
    image: "/images/service-3.png",
  },
];

/** Full Services page copy — original program layout, five offerings with images. */
export const servicesPage = {
  hero: {
    eyebrow: "Services",
    headingLines: ["Programs That", "Fit Your Life"],
    body: "Whether you need a full rebuild or a long-term partnership, Cameron’s coaching covers training, nutrition, recovery, and in-person work — built around your goals, schedule, and lifestyle.",
  },
  programs: [
    {
      id: "elevated",
      index: "01",
      eyebrow: "Online Coaching",
      heading: "The Elevated Professional Program",
      body: "A complete restoration for professionals ready to reclaim peak performance with custom training, nutrition, and high-touch support.",
      features: [
        {
          title: "Complete Diagnostic & Custom Build",
          description:
            "From sleep to schedule, every detail is rebuilt with precision, like restoring a performance vehicle from the ground up.",
        },
        {
          title: "Ongoing Optimization & Expert Access",
          description:
            "Weekly check-ins and direct access to Cameron keep your plan evolving and results consistent.",
        },
      ],
      cta: "Dive Deeper",
      ctaHref: "/contact",
      image: "/images/service-1.png",
      imageAlt: "Online coaching with Cameron Clark",
      reverse: false,
    },
    {
      id: "in-person",
      index: "02",
      eyebrow: "In-Person",
      heading: "Tailored In-Person Training",
      body: "Hands-on coaching for professionals who want real-time adjustments and efficient sessions that fit a demanding schedule.",
      features: [
        {
          title: "Hands-on Precision",
          description:
            "Expert feedback to fine-tune form and maximize results every session.",
        },
        {
          title: "Custom Workouts that Fit Your Life",
          description:
            "Plans designed for your goals and needs, no cookie-cutter templates.",
        },
      ],
      cta: "Explore this program",
      ctaHref: "/contact",
      image: "/images/service-2.png",
      imageAlt: "In-person training with Cameron Clark",
      reverse: true,
    },
    {
      id: "nutrition",
      index: "03",
      eyebrow: "Nutrition",
      heading: "Strategy That Survives Real Life",
      body: "Nutrition built around travel, client dinners, and irregular hours — not a meal plan that collapses the first week you’re on the road.",
      features: [
        {
          title: "Real-world Demands",
          description:
            "Strategies that hold up to travel, client dinners, and irregular hours.",
        },
        {
          title: "Sustainable Fueling",
          description:
            "Adjustments as life shifts — not a rigid plan that fails the first week you’re away.",
        },
      ],
      cta: "Talk nutrition",
      ctaHref: "/contact",
      image: "/images/momentum-4.png",
      imageAlt: "Training and nutrition plan laid out for long-term results",
      reverse: false,
    },
    {
      id: "recovery",
      index: "04",
      eyebrow: "Recovery",
      heading: "Systems for Sleep and Energy",
      body: "Recovery designed for professional reality — so afternoon crashes stop, sleep improves, and you still have something left after the workday.",
      features: [
        {
          title: "Sleep Support",
          description:
            "Recovery built so afternoon crashes stop and sleep actually improves.",
        },
        {
          title: "Sustainable Output",
          description:
            "Systems for professional reality, so you still have energy left after the workday.",
        },
      ],
      cta: "Rebuild your recovery",
      ctaHref: "/contact",
      image: "/images/momentum-1.png",
      imageAlt: "Cameron Clark coaching a client through a split squat",
      reverse: true,
    },
    {
      id: "partnership",
      index: "05",
      eyebrow: "Long-term",
      heading: "Ongoing Performance Partnership",
      body: "After the eight-week reset, most clients stay on for monthly tuning, quarterly reviews, and priority access — so the gains hold through travel and deadlines.",
      features: [
        {
          title: "Ongoing Tuning",
          description:
            "Continuous evolution as your life changes, with monthly support after the first eight weeks.",
        },
        {
          title: "Quarterly Reviews & Priority Access",
          description:
            "Long-term health and energy maintenance, with priority access to Cameron.",
        },
      ],
      cta: "Continue your progress",
      ctaHref: "/contact",
      image: "/images/service-3.png",
      imageAlt: "Ongoing coaching partnership with Cameron Clark",
      reverse: false,
    },
  ],
  cta: {
    heading: "Experience What Peak Performance Feels Like Again",
    headingLines: [
      "Experience What",
      "Peak Performance",
      "Feels Like Again",
    ],
    body: "You don't need to trade yourself in, you need the right mechanic. Cameron's programs are efficient, precise, and built to keep you driving forward stronger than before.",
    cta: "Book a Discovery Call",
  },
};

export const story = {
  // Palomino-style split: label + body + CTA on the left, full-bleed
  // portrait image on the right with a center clip-path open on scroll.
  eyebrow: "Our Story",
  body: "When Cameron hangs up the coaching hat, you'll find him embracing his most important role: girl dad. And then there's the garage, the place where classic British cars wait for his hands and his patience. To Cameron, each restoration tells a story — you don't rush the process, you honor the craftsmanship, and you bring something timeless back to life.",
  cta: "About us",
  ctaHref: "/about",
  image: "/images/story-daughter.jpg",
  imageAlt: "Cameron Clark with his daughter",
};

export const outcomes = {
  eyebrow: "Restore Your Edge",
  heading: "Keep Your Momentum",
  intro:
    "Within 8 weeks, you'll feel like you did before life got in the way. That's not marketing speak. That's what happens when you stop trying to train like you're 25 and start training like the strategic professional you are.",
  items: [
    {
      text: "Waking up without wondering what's going to hurt today",
      image: "/images/momentum-1.png",
      alt: "Cameron Clark coaching a client through a split squat",
    },
    {
      text: "Having energy left for family time after long work days",
      image: "/images/momentum-2.png",
      alt: "Cameron Clark standing with a coaching client",
    },
    {
      text: "Confidence in their physical capabilities again",
      image: "/images/momentum-3.png",
      alt: "Cameron Clark training with focused strength",
    },
    {
      text: "A sustainable system they can maintain long-term",
      image: "/images/momentum-4.png",
      alt: "Training and nutrition plan laid out for long-term results",
    },
  ],
};

export const process = {
  eyebrow: "Your Path to Getting Back",
  heading: "On Track",
  intro:
    "Take the direct route to lasting results with a plan built for your body and your goals.",
  steps: [
    {
      index: "01",
      title: "Discovery Call",
      description:
        "We start with a focused conversation to understand your goals and current situation, and see the right program for you.",
      image: "/images/track-1.png",
      imageAlt: "Coaching consultation with Cameron",
      cta: "Book a discovery call",
      ctaHref: "/contact",
    },
    {
      index: "02",
      title: "Strategic Onboarding",
      description:
        "You'll complete a health and lifestyle assessment so we can design a tailored program ready to launch within 48 hours.",
      image: "/images/track-2.png",
      imageAlt: "Program setup and lifestyle assessment",
      cta: "See how onboarding works",
      ctaHref: "#process",
    },
    {
      index: "03",
      title: "Execute & Optimize",
      description:
        "Begin training with direct support, weekly check-ins, and ongoing adjustments to keep your progress on track.",
      image: "/images/track-3.png",
      imageAlt: "Weekly check-in and progress tracking with Cameron",
      cta: "View client results",
      ctaHref: "#results",
    },
  ],
};

export const testimonials = [
  {
    quote:
      "Major improvements in my core strength and stamina. Cameron always delivers great workouts and solid advice.",
    name: "Hansol L.",
    rating: 5,
  },
  {
    quote:
      "Cameron motivates me to do my best and has helped me improve my overall fitness and core strength.",
    name: "Flora",
    rating: 5,
  },
  {
    quote:
      "Very helpful and patient about my goals. He tailors his approach in a clear, understanding way.",
    name: "Jake S.",
    rating: 5,
  },
  {
    quote: "The work I do with Cameron helps me with other activities I enjoy.",
    name: "Matt M.",
    rating: 5,
  },
  {
    quote:
      "I wasn't motivated to go to the gym — now I know how to train effectively thanks to Cameron.",
    name: "Renzo F.",
    rating: 5,
  },
  {
    quote:
      "Tough in the best way. Cameron built a custom routine that pushes me harder than I'd push myself.",
    name: "Will James Johnson",
    rating: 5,
    image: "/images/testimonial-will.jpg",
  },
];

export const faq = [
  {
    question: "How is this different from hiring a personal trainer?",
    answer:
      "Trainers give you sessions. We give you a system with workouts, nutrition, recovery, and direct access to Cameron.",
  },
  {
    question: "Can this work with a busy travel schedule?",
    answer:
      "Yes. We adapt your plan to hotel gyms, irregular hours, and client dinners, with online support wherever you are.",
  },
  {
    question: "I've tried everything. Why would this be different?",
    answer:
      "Most clients failed 3–5 times before this. The difference? This program is built for high-level professionals like you.",
  },
  {
    question: "When will I see results?",
    answer:
      "Energy often improves in 2–3 weeks, strength in 4–6, with a full reset by week 8.",
  },
  {
    question: "What happens after the first 8 weeks?",
    answer:
      "Most continue at $500/month for ongoing tuning, quarterly reviews, and long-term support.",
  },
];

export const about = {
  eyebrow: "About",
  heading: "Meet Cameron Clark",
  story: {
    heading: "From a $500 Paycheck to Life-Changing Rebuilds",
    paragraphs: [
      "Cameron didn't enter the fitness industry chasing six-figure success, he started with a $500 month and a client most had written off. But that first transformation lit the spark. It taught him that coaching isn't about hype or hacks, it's about helping people reclaim their strength when it matters most.",
      "What began as a passion quickly became a purpose: to help high performers rebuild their bodies and their confidence with the same care, strategy, and precision they bring to every other part of life.",
    ],
  },
  servesWho: [
    {
      title: "Medical Professionals and Tech Executives",
      description:
        "Whose high-performance careers have left their bodies running on fumes.",
    },
    {
      title: "Successful Parents and High Achievers",
      description:
        "Who refuse to accept that their chassis has to deteriorate with mileage.",
    },
  ],
  values: [
    {
      title: "Do It Right",
      description:
        "No shortcuts, just precision, smart systems, and results that last.",
    },
    {
      title: "People Over Protocols",
      description: "Clients are whole people, not just numbers or reps.",
    },
    {
      title: "Care Loudly",
      description: "Real care shows up in every check-in and adjustment.",
    },
    {
      title: "Work With Reality",
      description:
        "Programs fit real lives, demanding schedules, and shifting priorities.",
    },
  ],
};

/** Full About page copy — from cameronclarkfitness.com/about. */
export const aboutPage = {
  hero: {
    eyebrow: "About",
    heading: "Meet Cameron Clark",
    image: "/images/deadlift.png",
    imageAlt: "Cameron Clark powerlifting at a national championship",
  },
  origin: {
    eyebrow: "Origin",
    heading: "How Cameron Found His Drive",
    subheading: "From a $500 Paycheck to Life-Changing Rebuilds",
    paragraphs: [
      "Cameron didn't enter the fitness industry chasing six-figure success, he started with a $500 month and a client most had written off. But that first transformation lit the spark. It taught him that coaching isn't about hype or hacks, it's about helping people reclaim their strength when it matters most.",
      "What began as a passion quickly became a purpose: to help high performers rebuild their bodies and their confidence with the same care, strategy, and precision they bring to every other part of life.",
    ],
    cta: "Let's Build Your Plan Together",
    ctaHref: "/contact",
  },
  beyond: {
    eyebrow: "Life Off the Floor",
    heading: "Beyond the Training Floor",
    paragraphs: [
      "When he's not coaching, Cameron's focused on being a present and energetic girl dad, living proof that strength, vitality, and parenthood can thrive together. He models the very habits he helps clients build.",
      "His other passion? Classic British cars. Cameron's love for vintage automobiles is a philosophy that permeates his approach to fitness. Like rebuilding a vintage vehicle, transforming your body takes patience, quality inputs, and expert care. Whether under the hood or in the gym, Cameron believes real performance comes from doing things right and not rushing the process.",
    ],
    image: "/images/story-daughter.jpg",
    imageAlt: "Cameron Clark with his daughter",
    audiences: [
      {
        title: "Medical Professionals and Tech Executives",
        description:
          "Whose high-performance careers have left their bodies running on fumes.",
      },
      {
        title: "Successful Parents and High Achievers",
        description:
          "Who refuse to accept that their chassis has to deteriorate with mileage.",
      },
    ],
  },
  roadmap: {
    eyebrow: "Direction",
    heading: "The Roadmap Guiding Us",
    mission: {
      title: "Our Mission",
      body: "To help high-achieving professionals reclaim their physical performance through efficient, personalized coaching, like a custom rebuild that fits your engine, your mileage, and your life.",
    },
    vision: {
      title: "Our Vision",
      body: "A world where leaders never have to sacrifice their health to stay in motion, where strength, energy, and confidence are maintained like a well-kept machine, year after year.",
    },
  },
  values: {
    eyebrow: "Values",
    heading: "Our Core Values",
    items: [
      {
        title: "Do It Right",
        description:
          "No shortcuts, just precision, smart systems, and results that last.",
      },
      {
        title: "People Over Protocols",
        description: "Clients are whole people, not just numbers or reps.",
      },
      {
        title: "Care Loudly",
        description: "Real care shows up in every check-in and adjustment.",
      },
      {
        title: "Work With Reality",
        description:
          "Programs fit real lives, demanding schedules, and shifting priorities.",
      },
      {
        title: "Keep the Fundamentals",
        description:
          "Consistency, quality movement, and sustainable change always come first.",
      },
      {
        title: "Every Client Is a Project Worth Finishing",
        description:
          "Each client's transformation is treated like a high-value rebuild.",
      },
    ],
  },
  different: {
    eyebrow: "Difference",
    heading: "What Makes Cameron Clark Different",
    intro:
      "What sets Cameron apart isn't just his expertise, it's how much he cares. Clients trust him because he's real, responsive, and fully invested in their progress.",
    items: [
      {
        title: "Understands High-Performance Demands",
        description:
          "He knows the toll of pressure and what breaks down without proper maintenance.",
      },
      {
        title: "Speaks the Language of Success",
        description:
          "High performers need plans that match their unique schedules.",
      },
      {
        title: "Master Technician",
        description:
          "Every program is precise, tailored, and free of cookie-cutter templates.",
      },
      {
        title: "Delivers the Real Diagnosis",
        description:
          "Straight, honest feedback with lasting solutions, not quick fixes.",
      },
      {
        title: "Boutique Service",
        description:
          "A limited client load ensures premium, hands-on coaching.",
      },
      {
        title: "Lives What He Teaches",
        description:
          "As a dad and car enthusiast, he applies the same high-performance mindset to life.",
      },
    ],
  },
  cta: {
    heading: "Ready to Get Back in the Driver's Seat?",
    headingLines: ["Ready to Get Back", "in the Driver's", "Seat?"],
    body: "If you're done with quick fixes and ready for a smarter approach, let's talk. This no-pressure call is your first step toward rebuilding strength, energy, and control, on your terms.",
    cta: "Book a Discovery Call",
  },
};

export const finalCta = {
  heading: "Ready to Get Back in the Driver's Seat?",
  /** Line breaks for the asymmetric display composition (same words as heading). */
  headingLines: ["Ready to Get Back", "in the Driver's", "Seat?"],
  body: "If you're a medical professional or tech executive who's tired of feeling older than your age, and you're ready to invest in a solution that actually works for your lifestyle, let's talk.",
  cta: "Book a Discovery Call",
};

export const contactPage = {
  metaTitle: "Contact",
  metaDescription:
    "Contact Cameron Clark Fitness today to start your personalized training journey with expert guidance, proven methods and real results.",
  eyebrow: "Get in Touch",
  heading: "Contact Us",
  body: "Here are the ways you can reach out to us. Our lines are always open for all your inquiries.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Phone",
    phonePlaceholder: "(555) 000-0000",
    subjectLabel: "Subject",
    subjectPlaceholder: "How can we help?",
    messageLabel: "Message",
    messagePlaceholder: "Type your message here",
    submit: "Submit",
    submitting: "Sending…",
    successTitle: "Message sent",
    successBody:
      "Thanks for reaching out. Cameron’s team will get back to you shortly.",
    errorBody: "Something went wrong. Please try again or email us directly.",
  },
};

export const footer = {
  tagline: "Personal fitness coaching for professionals who refuse to slow down.",
  credit: "Website by Sites at Scale",
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ],
};

interface LegalBlock {
  heading?: string;
  paragraphs: string[];
}

interface LegalSection {
  title: string;
  blocks: LegalBlock[];
}

export const termsPage = {
  metaTitle: "Terms and Conditions",
  metaDescription:
    "Read the Terms and Conditions for Cameron Clark Fitness website use, purchases, and services.",
  heading: "Terms and Conditions",
  intro: [
    {
      heading: "OVERVIEW",
      paragraphs: [
        "This website is operated by Cameron Clark Fitness. Throughout the site, the terms “we”, “us” and “our” refer to Cameron Clark Fitness. Cameron Clark Fitness offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
        "By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.",
        "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.",
        "Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.",
        "Our store is hosted on Cameron Clark Fitness. They provide us with the online e-commerce platform that allows us to sell our products and services to you.",
      ],
    },
  ] satisfies LegalBlock[],
  sections: [
    {
      title: "SECTION 1 – CHANGES TO TERMS OF SERVICE",
      blocks: [
        {
          paragraphs: [
            "You can review the most current version of the Terms of Service at any time at this page.",
            "We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.",
            "Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.",
          ],
        },
      ],
    },
    {
      title: "SECTION 2 – GENERAL CONDITIONS",
      blocks: [
        {
          paragraphs: [
            "We reserve the right to refuse service to anyone for any reason at any time.",
            "You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.",
            "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.",
            "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.",
          ],
        },
      ],
    },
    {
      title: "SECTION 3 – ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION",
      blocks: [
        {
          paragraphs: [
            "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.",
            "This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.",
          ],
        },
      ],
    },
    {
      title: "SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES",
      blocks: [
        {
          paragraphs: [
            "Prices for our products are subject to change without notice.",
            "We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
            "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.",
          ],
        },
      ],
    },
    {
      title: "SECTION 5 – PRODUCTS OR SERVICES (if applicable)",
      blocks: [
        {
          paragraphs: [
            "Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.",
            "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor’s display of any color will be accurate.",
            "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.",
            "We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.",
          ],
        },
      ],
    },
    {
      title: "SECTION 6 – ACCURACY OF BILLING AND ACCOUNT INFORMATION",
      blocks: [
        {
          paragraphs: [
            "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.",
            "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.",
            "For more detail, please review our Returns Policy.",
          ],
        },
      ],
    },
    {
      title: "SECTION 7 – OPTIONAL TOOLS",
      blocks: [
        {
          paragraphs: [
            "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.",
            "You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.",
            "Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.",
          ],
        },
      ],
    },
    {
      title: "SECTION 8 – THIRD-PARTY LINKS",
      blocks: [
        {
          paragraphs: [
            "Certain content, products and services available via our Service may include materials from third-parties.",
            "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.",
            "We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party’s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.",
          ],
        },
      ],
    },
    {
      title: "SECTION 9 – USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS",
      blocks: [
        {
          paragraphs: [
            "If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, ‘comments’), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.",
            "We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.",
            "You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.",
          ],
        },
      ],
    },
    {
      title: "SECTION 10 – PERSONAL INFORMATION",
      blocks: [
        {
          paragraphs: [
            "Your submission of personal information through the store is governed by our Privacy Policy.",
          ],
        },
      ],
    },
    {
      title: "SECTION 11 – ERRORS, INACCURACIES AND OMISSIONS",
      blocks: [
        {
          paragraphs: [
            "Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.",
          ],
        },
      ],
    },
    {
      title: "SECTION 12 – PROHIBITED USES",
      blocks: [
        {
          paragraphs: [
            "In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.",
          ],
        },
      ],
    },
    {
      title: "SECTION 13 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY",
      blocks: [
        {
          paragraphs: [
            "We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.",
            "We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.",
            "You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.",
            "You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided ‘as is’ and ‘as available’ for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.",
            "In no case shall The Cameron Clark Fitness, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.",
          ],
        },
      ],
    },
    {
      title: "SECTION 14 – INDEMNIFICATION",
      blocks: [
        {
          paragraphs: [
            "You agree to indemnify, defend and hold harmless Cameron Clark Fitness, and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.",
          ],
        },
      ],
    },
    {
      title: "SECTION 15 – SEVERABILITY",
      blocks: [
        {
          paragraphs: [
            "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.",
          ],
        },
      ],
    },
    {
      title: "SECTION 16 – TERMINATION",
      blocks: [
        {
          paragraphs: [
            "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.",
            "These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.",
            "If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).",
          ],
        },
      ],
    },
    {
      title: "SECTION 17 – ENTIRE AGREEMENT",
      blocks: [
        {
          paragraphs: [
            "The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.",
            "These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service). Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.",
          ],
        },
      ],
    },
    {
      title: "SECTION 18 – GOVERNING LAW",
      blocks: [
        {
          paragraphs: [
            "These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of USA.",
          ],
        },
      ],
    },
    {
      title: "SECTION 19 – CONTACT INFORMATION",
      blocks: [
        {
          paragraphs: [
            "Questions about the Terms of Service should be sent to us at cameron@cameronclarkfitness.com.",
          ],
        },
      ],
    },
  ] satisfies LegalSection[],
};

export const privacyPage = {
  metaTitle: "Privacy Policy",
  metaDescription:
    "Learn how Cameron Clark Fitness collects, uses, and protects your personal information.",
  heading: "Privacy Policy",
  intro: [] as LegalBlock[],
  sections: [
    {
      title: "SECTION 1 – WHAT DO WE DO WITH YOUR INFORMATION?",
      blocks: [
        {
          paragraphs: [
            "When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.",
            "When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.",
            "Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.",
          ],
        },
      ],
    },
    {
      title: "SECTION 2 – CONSENT",
      blocks: [
        {
          heading: "How do you get my consent?",
          paragraphs: [
            "When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.",
            "If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.",
          ],
        },
        {
          heading: "How do I withdraw my consent?",
          paragraphs: [
            "If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at 650 776 0600 or emailing us at: cameron@cameronclarkfitness.com.",
          ],
        },
      ],
    },
    {
      title: "SECTION 3 – DISCLOSURE",
      blocks: [
        {
          paragraphs: [
            "We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.",
          ],
        },
      ],
    },
    {
      title: "SECTION 4 – CAMERON CLARK FITNESS",
      blocks: [
        {
          paragraphs: [
            "Our store is hosted on Cameron Clark Fitness. They provide us with the online e-commerce platform that allows us to sell our products and services to you. Your data is stored through Cameron Clark Fitness’s data storage, databases and the general Cameron Clark Fitness application. They store your data on a secure server behind a firewall.",
          ],
        },
        {
          heading: "Payment:",
          paragraphs: [
            "If you choose a direct payment gateway to complete your purchase, then Cameron Clark Fitness stores your credit card data. It is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is deleted.",
            "All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.",
            "PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.",
            "For more insight, you may also want to read Cameron Clark Fitness’s Terms of Service or Privacy Statement.",
          ],
        },
      ],
    },
    {
      title: "SECTION 5 – THIRD-PARTY SERVICES",
      blocks: [
        {
          paragraphs: [
            "In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.",
            "However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.",
            "For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.",
            "In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.",
            "As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.",
            "Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.",
          ],
        },
        {
          heading: "Links",
          paragraphs: [
            "When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.",
          ],
        },
      ],
    },
    {
      title: "SECTION 6 – SECURITY",
      blocks: [
        {
          paragraphs: [
            "To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.",
            "If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption.",
            "Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "Here is a list of cookies that we use. We’ve listed them here so you can choose if you want to opt-out of cookies or not.",
            "_session_id: unique token, sessional, allows Cameron Clark Fitness to store information about your session (referrer, landing page, etc).",
            "_lsite_visit: no data held, persistent for 30 minutes from the last visit, used by our website provider’s internal stats tracker to record the number of visits.",
            "_lsite_uniq: no data held, expires midnight (relative to the visitor) of the next day, counts the number of visits to a store by a single customer.",
            "cart: unique token, persistent for 2 weeks, stores information about the contents of your cart.",
            "_secure_session_id: unique token, sessional.",
            "storefront_digest: unique token, indefinite, if the shop has a password, this is used to determine if the current visitor has access.",
          ],
        },
      ],
    },
    {
      title: "SECTION 7 – AGE OF CONSENT",
      blocks: [
        {
          paragraphs: [
            "By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
          ],
        },
      ],
    },
    {
      title: "SECTION 8 – CHANGES TO THIS PRIVACY POLICY",
      blocks: [
        {
          paragraphs: [
            "We reserve the right to modify this privacy policy at any time, so please review it frequently.",
            "Changes and clarifications will take effect immediately upon their posting on the website.",
            "If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.",
            "If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.",
          ],
        },
      ],
    },
    {
      title: "QUESTIONS AND CONTACT INFORMATION",
      blocks: [
        {
          paragraphs: [
            "If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at: cameron@cameronclarkfitness.com",
          ],
        },
      ],
    },
  ] satisfies LegalSection[],
};

/**
 * Cinematic results timeline — three full-bleed chapters that wipe into one
 * another on scroll. Copy is the Results Timeline from the Elevated
 * Professional Program page (website-content.md §4).
 */
export const timeline = {
  eyebrow: "The Results You Can Expect",
  heading: "Eight Weeks, Three Chapters",
  chapters: [
    {
      id: "weeks-2-3",
      marker: "Weeks 2 - 3",
      title: "Sleep Improves",
      script: "afternoon crashes disappear",
      body: "The first thing to come back is your energy. Deeper sleep, steadier mornings, and no more 3 PM wall to push through.",
      image: "/images/slider-1.png",
    },
    {
      id: "weeks-4-6",
      marker: "Weeks 4 - 6",
      title: "Strength Returns",
      script: "and confidence with it",
      body: "Load goes up, movement gets cleaner, and you start trusting your body again under real weight and real fatigue.",
      image: "/images/slider-2.png",
    },
    {
      id: "week-8",
      marker: "Week 8 +",
      title: "You Feel Yourself",
      script: "sharp, energized, unstoppable",
      body: "The full reset. Not a peak you have to defend, but a baseline you can hold through travel, deadlines and everything after.",
      image: "/images/slider-3.png",
    },
  ],
};
