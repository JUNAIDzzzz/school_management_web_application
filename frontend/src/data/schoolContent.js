export const SCHOOL = {
  name: 'Brightfield Public School',
  tagline: 'Nurturing Minds. Building Futures.',
  intro:
    'For over two decades, Brightfield Public School has combined academic rigor with holistic development — helping every child discover their potential in a safe, inspiring environment.',
  vision:
    'To be a center of academic excellence that empowers students to become confident, compassionate, and capable global citizens.',
  mission:
    'We nurture curiosity, critical thinking, and character through a balanced curriculum, dedicated mentorship, and a vibrant, inclusive school community.',
  address: '221 Lakeview Road, Sector 12, Green Valley, New Delhi - 110045',
  phone: '+91 98765 43210',
  email: 'contact@brightfieldschool.edu',
  officeTimings: 'Mon - Sat, 8:00 AM - 4:00 PM',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const FACILITIES = [
  {
    title: 'Smart Classrooms',
    description: 'Interactive digital boards and tech-enabled learning spaces in every classroom.',
    icon: 'monitor',
  },
  {
    title: 'Library',
    description: 'A quiet, well-stocked library with over 10,000 books, journals, and digital resources.',
    icon: 'book',
  },
  {
    title: 'Computer Lab',
    description: 'Modern computer labs with high-speed internet for hands-on tech learning.',
    icon: 'cpu',
  },
  {
    title: 'Science Labs',
    description: 'Fully equipped Physics, Chemistry, and Biology labs for practical experimentation.',
    icon: 'flask',
  },
  {
    title: 'Playground',
    description: 'Expansive outdoor sports fields and courts for football, cricket, and athletics.',
    icon: 'activity',
  },
  {
    title: 'Hostel',
    description: 'Safe, comfortable residential facilities with round-the-clock care and supervision.',
    icon: 'home',
  },
];

// `image` is the web-optimized photo shown on each tile; `scene` names the
// hand-drawn illustration (see GALLERY_ILLUSTRATIONS) used as a fallback if
// `image` is ever removed.
export const GALLERY_IMAGES = [
  { id: 1, alt: 'Students in classroom', category: 'Academics', scene: 'classroom', image: '/students_in_classroom.jpg' },
  { id: 2, alt: 'Annual sports day', category: 'Sports', scene: 'sports', image: '/annual_sports_day.jpg' },
  { id: 3, alt: 'Science lab session', category: 'Academics', scene: 'science', image: '/science_lab_session.jpg' },
  { id: 4, alt: 'School library', category: 'Campus', scene: 'library', image: '/school_library.jpg' },
  { id: 5, alt: 'Cultural day performance', category: 'Events', scene: 'cultural', image: '/cultural_day_performance.jpg' },
  { id: 6, alt: 'Graduation ceremony', category: 'Events', scene: 'graduation', image: '/graduation_ceremany.jpg' },
  { id: 7, alt: 'School campus aerial view', category: 'Campus', scene: 'campus', image: '/school_campus_aerial_view.jpg' },
  { id: 8, alt: 'Art and craft exhibition', category: 'Academics', scene: 'art', image: '/art_and_craft_exhibition.jpg' },
];

const CLASS_DESCRIPTIONS = [
  'First steps in reading, writing, and numbers through playful, hands-on activities.',
  'Building confidence in language and math with stories, puzzles, and group play.',
  'Strengthening reading fluency while introducing basic science and social studies.',
  'Developing analytical thinking through environmental studies and creative writing.',
  'A deeper dive into mathematics and language with project-based learning.',
  'Introducing formal science streams — physics, chemistry, and biology fundamentals.',
  'Expanding into algebra, geometry, and civics alongside hands-on lab work.',
  'Sharpening critical thinking with advanced math, science, and computer literacy.',
  'Board-pattern assessments begin, with focused subject specialization and mentoring.',
  'Intensive board-exam preparation with mock tests, revision, and career counselling.',
];

export const CLASS_HIGHLIGHTS = Array.from({ length: 10 }, (_, i) => ({
  number: i + 1,
  name: `Class ${i + 1}`,
  description: CLASS_DESCRIPTIONS[i],
}));
