export const HOME_API = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://astro-5dcy.onrender.com/api',
  endpoints: {
    about: '/about',
    homeFaqs: '/faqs/list?page=Home',
    aboutFaqs: '/faqs/list?page=About us',
  },
}

export const HOME_CONTENT = {
  initialAboutData: {
    title: 'About Us',
    content: '',
    image: '',
  },
  ids: {
    languages: 'languages',
  },
  hero: {
    logo: {
      src: '/assets/The Fifth Cusp_Logo.png',
      alt: 'The Fifth Cusp Logo',
      width: 260,
      height: 260,
    },
    title: 'THE FIFTH CUSP',
    paragraphs: [
      "You're standing inside a new kind of spiritual ecosystem, one built to decode who you are, align where you're going, and transform how you live.",
      'Our collective brings together Astrology, Vastu, Energy Reading, Manifestation, Tarot, and Wealth Architecture into one integrated space.',
      'Every tool, report, assessment, and consultation is designed to reveal your inner blueprint and translate it into real-world action.',
      'This is a personal operating system for alignment, abundance, and self-mastery. It is a portal to higher frequencies. It is the Cusp.',
    ],
  },
  languages: {
    title: 'LANGUAGES',
    subtitle: 'Explore cosmic wisdom through our transformative offerings',
    services: [
      {
        name: 'ASTROLOGY',
        link: '/astrology',
        desc: `A story that brought you into being—the cosmic map of who you are, where you're headed, and why your life unfolds the way it does. It is your blueprint. Your chart reveals the truth of your strengths, weaknesses, desires, relationships, karmic lessons, yogas, doshas, and the precise timings of rise, pause, and transformation. When you understand it, everything falls into place. In the end, it has always been about direction and timing.`,
        gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      },
      {
        name: 'VASTU SHASTRA',
        link: '/vastu',
        desc: `Your space is not accidental, it is an energetic map interacting with your mind, body, and fate every single day. Vastu reveals what your space is doing to you—where it nurtures you, where it weakens you, and where it blocks your progress. When the space is corrected, life finally begins to move the way it was meant to. It opens the pathways of abundance to you.`,
        gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      },
      {
        name: 'NUMEROLOGY',
        link: '/free-calculator',
        desc: 'A vibrational science based on the energetic patterns of numbers; derived from their planets and their influence on personality, destiny, and decision-making. It reveals the hidden codes shaping your life path; your purpose and everything it governs.',
        gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      },
      {
        name: 'ENERGY READING',
        link: '/energy',
        desc: "The language you turn to when there is no way to get any answer to your question. Whether it's a simple yes/no or a deeply specific, niche question, it reads the frequency behind the situation and tells you exactly what you need to know; even when no facts, data, or clarity exist.",
        gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      },
      {
        name: 'TAROT READING',
        link: '/tarot-reading',
        desc: "A symbolic interpretative and intuitive science that uses archetypes to access subconscious insight. It is as specific as it gets. It reveals the truths, choices, and internal narratives guiding your decisions. It's magical!",
        gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
      },
      {
        name: 'MANIFESTATION',
        link: '/manifestation',
        desc: 'A transformative science of aligning thought, emotion, and energy to influence physical outcomes. It explains how frequency, intention, belief, and resonance shape the reality you experience — turning desire into material form.',
        gradient: 'linear-gradient(135deg, #30cfd0, #330867)',
      },
    ],
    serviceCta: '→',
  },
  aboutYou: {
    image: {
      src: '/assets/About You_Final.png',
      alt: 'About You',
      width: 420,
      height: 420,
    },
    title: 'ABOUT YOU',
    paragraphs: [
      {
        prefix: 'About You',
        text: ' is where you finally understand why you feel the way you do. It reveals your true nature, your wounds, your karmic stories, and the blocks that silently steal your peace.',
      },
      {
        text: "When you learn all that you can be at your elevated levels of frequency, you're ready to realign and propel yourself into the best version of yourself.",
      },
      {
        text: 'This is the first real step toward manifestation, inner peace, and becoming who you were always meant to be.',
      },
    ],
    emphasis: 'Your higher self already exists within you. All you need is to resonate.',
  },
  aboutUs: {
    title: 'ABOUT US',
    subtitle: 'Connecting You with Universal Wisdom',
    fallback:
      'The Fifth Cusp connects cosmic knowledge with practical transformation, translating spiritual insight into grounded direction.',
  },
  ikigai: {
    image: {
      src: '/assets/Ikigai_Final.png',
      alt: 'Ikigai Effortless Growth',
      width: 420,
      height: 420,
    },
    title: 'IKIGAI-EFFORTLESS GROWTH',
    subtitle: "What you love, what you're good at, what you can be paid for, what the world needs",
    actions: [
      { label: 'Know More', href: '/know-more' },
      { label: 'Experience', href: '/experiences' },
      { label: 'Affirm', href: '/contact' },
    ],
  },
  faqs: {
    title: 'FAQs',
    subtitle: 'Everything you need to know about us',
    emptyText: 'No FAQs available',
    openSymbol: '-',
    closedSymbol: '+',
  },
  scrollToTop: {
    ariaLabel: 'Back to top',
  },
}
