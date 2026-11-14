// Search and AI-answer data for the site: page titles, the question-and-answer
// copy, and the JSON-LD graph. Plain data with no React or asset imports, so
// both the pages and the build-time prerender script (scripts/prerender.mjs)
// read the same words. Answers lead with the fact, name the doctor, clinic and
// place in full, and stand on their own: that is the text AI tools quote.
import {
  SITE_URL, BOOKING_URL, PHONE, PHONE_TEL, LISTING_NAME, DOCTOR_NAME, DOCTOR_NAME_HI,
  CLINIC_NAME, CLINIC_NAME_HI, QUALIFICATIONS, REG_NO, ADDRESS, ADDRESS_LINE, ADDRESS_HI,
  GEO, GOOGLE_PROFILE_URL, SAME_AS, SESSIONS, HOURS_EN, HOURS_HI,
} from './site.js';

export const OG_IMAGE = `${SITE_URL}/og.jpg`;

// index: false keeps a page out of the sitemap and adds noindex.
export const ROUTES = [
  {
    path: '/', file: 'index.html', index: true, priority: '1.0',
    title: 'Dr. Deepak Kumar, MD General Medicine | Arogya Clinic, Ahiyapur, Muzaffarpur',
    description: 'Dr. Deepak Kumar (MBBS SKMCH, MD General Medicine DMCH) treats diabetes, blood pressure, thyroid, asthma and stomach problems at Arogya Clinic, Ahiyapur, Muzaffarpur. Open daily 6–9 am and 5–9 pm. Book online or call 9199943818.',
  },
  {
    path: '/about', file: 'about.html', index: true, priority: '0.8',
    title: 'About Dr. Deepak Kumar — MBBS (SKMCH), MD General Medicine (DMCH) | Muzaffarpur',
    description: 'Dr. Deepak Kumar is a consultant physician in Muzaffarpur: MBBS from SKMCH, MD General Medicine from DMCH Darbhanga, registration BCMR50223. He sees patients at Arogya Clinic, Ahiyapur.',
  },
  {
    path: '/services', file: 'services.html', index: true, priority: '0.8',
    title: 'Diabetes, BP, Thyroid & Asthma Treatment in Muzaffarpur | Dr. Deepak Kumar',
    description: 'Conditions treated by Dr. Deepak Kumar at Arogya Clinic, Ahiyapur, Muzaffarpur: diabetes, high blood pressure, thyroid disorders, asthma and COPD, stomach and abdominal disease, fever and follow-up care.',
  },
  {
    path: '/appointments', file: 'appointments.html', index: true, priority: '0.9',
    title: 'Book Dr. Deepak Kumar, Muzaffarpur — Arogya Clinic Timings, Address & Phone',
    description: 'Book an appointment with Dr. Deepak Kumar at Arogya Clinic, Bada Jagarnath, Shakti Dharmkanta, Ahiyapur, Muzaffarpur. Open every day 6–9 am and 5–9 pm. Phone and WhatsApp 9199943818.',
  },
  {
    // Ended heatwave campaign with placeholder contact details: reachable, not promoted.
    path: '/doctor-in-10-mins', file: 'doctor-in-10-mins.html', index: false,
    title: 'Doctor in 10 Minutes on WhatsApp | Dr. Deepak Kumar, Muzaffarpur',
    description: 'WhatsApp consultation with Dr. Deepak Kumar, Arogya Clinic, Muzaffarpur.',
  },
  {
    path: '/reserve', file: 'reserve.html', index: false,
    title: 'Patient portal (coming soon) | Arogya Clinic, Muzaffarpur',
    description: 'Past prescriptions, lab reports and reminders for patients of Arogya Clinic, Muzaffarpur. Coming soon.',
  },
];
export const NOT_FOUND = {
  path: '/404', file: '404.html', index: false,
  title: 'Page not found | Dr. Deepak Kumar, Arogya Clinic Muzaffarpur',
  description: 'This page is not here. Book an appointment with Dr. Deepak Kumar or find Arogya Clinic, Ahiyapur, Muzaffarpur.',
};

export const routeMeta = (pathname) =>
  ROUTES.find((r) => r.path === pathname) || NOT_FOUND;

// ─── Questions patients (and AI assistants) ask ────────────────────────────
export const FAQ_HOME = {
  en: [
    ['Which doctor in Ahiyapur, Muzaffarpur treats diabetes?',
      `${DOCTOR_NAME}, MD General Medicine, treats diabetes at ${CLINIC_NAME}, ${ADDRESS.street}, Muzaffarpur. He manages type 2 diabetes, checks blood sugar and HbA1c at follow-up visits, and treats the high blood pressure and cholesterol problems that often come with it.`],
    ['What are the Arogya Clinic timings?',
      `${CLINIC_NAME} in Ahiyapur, Muzaffarpur is open every day: morning ${SESSIONS[0].en} and evening ${SESSIONS[1].en}. ${DOCTOR_NAME} sees patients in both sessions.`],
    ['How do I book an appointment with Dr. Deepak Kumar in Muzaffarpur?',
      `Book online at ${BOOKING_URL}: pick a free slot in the next 7 days and the confirmation comes on WhatsApp. You can also call or WhatsApp the clinic on ${PHONE}.`],
    ['Where is Arogya Clinic, Muzaffarpur?',
      `${CLINIC_NAME} is at ${ADDRESS_LINE}. Google Maps: ${GOOGLE_PROFILE_URL}`],
    ['What are Dr. Deepak Kumar\'s qualifications?',
      `${DOCTOR_NAME} is a consultant physician with ${QUALIFICATIONS}. His Bihar medical registration number is ${REG_NO}. He is also a Senior Consultant in General Medicine at I T Memorial Hospital near SKMCH, Muzaffarpur.`],
    ['Which doctor in Muzaffarpur treats high blood pressure and thyroid problems?',
      `${DOCTOR_NAME} at ${CLINIC_NAME}, Ahiyapur treats high blood pressure (hypertension), thyroid disorders (hypothyroidism and hyperthyroidism), asthma and COPD, and stomach and abdominal problems, alongside diabetes.`],
    ['Is Dr. Deepak Kumar a general physician?',
      `Yes. ${DOCTOR_NAME} is an MD in General Medicine — a physician for adults who treats illnesses with medicines rather than surgery, and refers to a specialist or hospital when that is needed.`],
    ['What should I bring to Arogya Clinic?',
      'Bring your old prescriptions, recent lab reports and the medicines you take now. Please arrive about 10 minutes before your booked time.'],
    ['What is the phone number of Arogya Clinic, Ahiyapur?',
      `Call or WhatsApp ${PHONE} for ${CLINIC_NAME} and ${DOCTOR_NAME}.`],
  ],
  hi: [
    ['अहियापुर, मुज़फ़्फ़रपुर में शुगर (डायबिटीज़) का इलाज कौन डॉक्टर करते हैं?',
      `${DOCTOR_NAME_HI}, एमडी जनरल मेडिसिन, ${CLINIC_NAME_HI}, ${ADDRESS_HI} में डायबिटीज़ का इलाज करते हैं। फ़ॉलो-अप पर शुगर और HbA1c की जाँच, और साथ में होने वाले हाई बीपी व कोलेस्ट्रॉल का इलाज।`],
    ['आरोग्य क्लिनिक का समय क्या है?',
      `${CLINIC_NAME_HI}, अहियापुर, मुज़फ़्फ़रपुर ${HOURS_HI} खुला रहता है। दोनों सत्रों में ${DOCTOR_NAME_HI} मरीज़ देखते हैं।`],
    ['डॉ. दीपक कुमार, मुज़फ़्फ़रपुर का अपॉइंटमेंट कैसे बुक करें?',
      `ऑनलाइन ${BOOKING_URL} पर अगले 7 दिनों का खाली समय चुनें — पुष्टि WhatsApp पर आती है। या क्लिनिक को ${PHONE} पर कॉल/WhatsApp करें।`],
    ['आरोग्य क्लिनिक, मुज़फ़्फ़रपुर कहाँ है?',
      `${CLINIC_NAME_HI}: ${ADDRESS_HI}। गूगल मैप: ${GOOGLE_PROFILE_URL}`],
    ['डॉ. दीपक कुमार की डिग्री क्या है?',
      `एमबीबीएस (SKMCH मुज़फ़्फ़रपुर), एमडी जनरल मेडिसिन (DMCH दरभंगा)। बिहार मेडिकल रजिस्ट्रेशन नंबर ${REG_NO}। आई टी मेमोरियल हॉस्पिटल, SKMCH के पास, में जनरल मेडिसिन के सीनियर कंसल्टेंट।`],
    ['मुज़फ़्फ़रपुर में बीपी और थायरॉइड का इलाज कौन करते हैं?',
      `${DOCTOR_NAME_HI}, ${CLINIC_NAME_HI}, अहियापुर — हाई बीपी, थायरॉइड, दमा (अस्थमा) व सीओपीडी, पेट की बीमारियाँ और डायबिटीज़।`],
    ['क्या डॉ. दीपक कुमार जनरल फ़िज़िशियन हैं?',
      'हाँ। वे एमडी जनरल मेडिसिन हैं — वयस्कों के फ़िज़िशियन, जो दवा से इलाज करते हैं और ज़रूरत पड़ने पर विशेषज्ञ या अस्पताल भेजते हैं।'],
    ['क्लिनिक में क्या साथ लाएँ?',
      'पुरानी पर्चियाँ, हाल की जाँच रिपोर्ट और अभी चल रही दवाइयाँ। बुक किए समय से लगभग 10 मिनट पहले पहुँचें।'],
    ['आरोग्य क्लिनिक, अहियापुर का फ़ोन नंबर क्या है?',
      `${PHONE} पर कॉल या WhatsApp करें।`],
  ],
};

export const FAQ_BOOKING = {
  en: [
    ['Is online booking free?', 'Yes. There is no charge to reserve a slot. The consultation fee is paid at the clinic.'],
    ['Can I walk in without booking?', 'You can, but booked patients are seen first. On busy mornings the wait can be long.'],
    ['What happens after I book?', 'A confirmation reaches your WhatsApp straight away, and a reminder goes out the day before your appointment.'],
    ['How do I change or cancel?', `Call or WhatsApp the clinic on ${PHONE}. The earlier you tell us, the sooner the slot can go to someone else.`],
    ['Will I get my prescription on WhatsApp?', 'Yes. Your prescription can be sent to your WhatsApp as a PDF after the visit.'],
  ],
  hi: [
    ['क्या ऑनलाइन बुकिंग मुफ़्त है?', 'हाँ। ऑनलाइन समय बुक करने का कोई शुल्क नहीं है। परामर्श शुल्क क्लिनिक पर लिया जाता है।'],
    ['क्या बिना बुकिंग के आ सकते हैं?', 'आ सकते हैं, लेकिन बुक किए गए मरीज़ों को पहले देखा जाता है। व्यस्त दिनों में प्रतीक्षा लंबी हो सकती है।'],
    ['बुकिंग के बाद क्या होता है?', 'आपके WhatsApp पर तुरंत पुष्टि आती है, और अपॉइंटमेंट से एक दिन पहले याद दिलाने वाला संदेश।'],
    ['समय बदलना या रद्द करना हो तो?', `क्लिनिक को ${PHONE} पर कॉल या WhatsApp करें। जितना जल्दी बताएँगे, स्लॉट किसी और को मिल सकेगा।`],
    ['क्या पर्ची WhatsApp पर मिलती है?', 'हाँ। जाँच के बाद पर्ची PDF के रूप में आपके WhatsApp पर भेजी जा सकती है।'],
  ],
};

// ─── JSON-LD ────────────────────────────────────────────────────────────────
const ID = {
  site: `${SITE_URL}/#website`,
  physician: `${SITE_URL}/#physician`,
  clinic: `${SITE_URL}/#clinic`,
  doctor: `${SITE_URL}/#doctor`,
};

const postal = {
  '@type': 'PostalAddress',
  streetAddress: ADDRESS.street,
  addressLocality: ADDRESS.locality,
  addressRegion: ADDRESS.region,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.country,
};
const hours = [{
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: SESSIONS[0].from, closes: SESSIONS[0].to,
}, {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: SESSIONS[1].from, closes: SESSIONS[1].to,
}];
const services = [
  'Diabetes treatment', 'High blood pressure (hypertension) treatment', 'Thyroid disorder treatment',
  'Asthma and COPD care', 'Stomach and abdominal disease', 'Fever and infections', 'Follow-up care',
].map((name) => ({ '@type': 'MedicalProcedure', name }));
const reserve = {
  '@type': 'ReserveAction',
  target: {
    '@type': 'EntryPoint',
    urlTemplate: BOOKING_URL,
    actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
  },
  result: { '@type': 'Reservation', name: `Appointment at ${CLINIC_NAME}` },
};

// Shared by both listing entries: same name, address, phone, hours, map.
const listing = {
  name: LISTING_NAME,
  alternateName: [DOCTOR_NAME, CLINIC_NAME, `${CLINIC_NAME}, Ahiyapur, Muzaffarpur`, `${DOCTOR_NAME_HI} — ${CLINIC_NAME_HI}`],
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  telephone: PHONE_TEL,
  address: postal,
  geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
  hasMap: GOOGLE_PROFILE_URL,
  openingHoursSpecification: hours,
  areaServed: ['Ahiyapur', 'Muzaffarpur', 'Tirhut division, Bihar'].map((name) => ({ '@type': 'Place', name })),
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  knowsLanguage: ['hi', 'en'],
  isAcceptingNewPatients: true,
  ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
};

export function baseGraph() {
  return [
    {
      '@type': 'WebSite', '@id': ID.site, url: `${SITE_URL}/`,
      name: `${DOCTOR_NAME} — ${CLINIC_NAME}, Muzaffarpur`, inLanguage: ['en-IN', 'hi-IN'],
      publisher: { '@id': ID.clinic },
    },
    {
      '@type': 'Physician', '@id': ID.physician, ...listing,
      medicalSpecialty: ['https://schema.org/PrimaryCare', 'https://schema.org/Endocrine', 'https://schema.org/Pulmonary', 'https://schema.org/Gastroenterologic'],
      availableService: services,
      employee: { '@id': ID.doctor },
      parentOrganization: { '@id': ID.clinic },
      potentialAction: reserve,
    },
    {
      '@type': ['MedicalClinic', 'LocalBusiness'], '@id': ID.clinic, ...listing,
      medicalSpecialty: 'https://schema.org/PrimaryCare',
      availableService: services,
      employee: { '@id': ID.doctor },
      potentialAction: reserve,
    },
    {
      '@type': 'Person', '@id': ID.doctor,
      name: DOCTOR_NAME, alternateName: DOCTOR_NAME_HI, honorificPrefix: 'Dr.',
      jobTitle: 'Consultant Physician (MD General Medicine)',
      description: `${DOCTOR_NAME}, ${QUALIFICATIONS}, Bihar medical registration ${REG_NO}. Consultant physician at ${CLINIC_NAME}, Ahiyapur, Muzaffarpur, and Senior Consultant in General Medicine at I T Memorial Hospital near SKMCH.`,
      image: OG_IMAGE,
      url: `${SITE_URL}/about`,
      worksFor: [{ '@id': ID.clinic }, { '@type': 'Hospital', name: 'I T Memorial Hospital', address: { '@type': 'PostalAddress', addressLocality: 'Muzaffarpur', addressRegion: 'Bihar', addressCountry: 'IN' } }],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Sri Krishna Medical College and Hospital (SKMCH), Muzaffarpur' },
        { '@type': 'CollegeOrUniversity', name: 'Darbhanga Medical College and Hospital (DMCH), Darbhanga' },
      ],
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MBBS', recognizedBy: { '@type': 'CollegeOrUniversity', name: 'SKMCH Muzaffarpur' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MD General Medicine', recognizedBy: { '@type': 'CollegeOrUniversity', name: 'DMCH Darbhanga' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: `Medical registration ${REG_NO}`, recognizedBy: { '@type': 'Organization', name: 'Bihar Council of Medical Registration' } },
      ],
      knowsAbout: ['Diabetes', 'Hypertension', 'Thyroid disorders', 'Asthma', 'COPD', 'Gastrointestinal disease', 'Internal medicine'],
      knowsLanguage: ['hi', 'en'],
      ...(SAME_AS.length > 1 ? { sameAs: SAME_AS.slice(1) } : {}),
    },
  ];
}

const faqPage = (url, pairs) => ({
  '@type': 'FAQPage', '@id': `${url}#faq`, url, inLanguage: 'en-IN',
  mainEntity: pairs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export function jsonLdFor(route) {
  const url = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  const graph = baseGraph();
  graph.push({
    '@type': route.path === '/about' ? 'ProfilePage' : 'WebPage',
    '@id': `${url}#webpage`, url, name: route.title, description: route.description,
    isPartOf: { '@id': ID.site }, inLanguage: 'en-IN',
    about: { '@id': route.path === '/about' ? ID.doctor : ID.physician },
    ...(route.path === '/about' ? { mainEntity: { '@id': ID.doctor } } : {}),
    primaryImageOfPage: OG_IMAGE,
  });
  if (route.path === '/') graph.push(faqPage(url, FAQ_HOME.en));
  if (route.path === '/appointments') graph.push(faqPage(url, FAQ_BOOKING.en));
  return { '@context': 'https://schema.org', '@graph': graph };
}

// ─── llms.txt (https://llmstxt.org) ─────────────────────────────────────────
export function llmsTxt() {
  const qa = (pairs) => pairs.map(([q, a]) => `### ${q}\n${a}`).join('\n\n');
  return `# ${DOCTOR_NAME} — ${CLINIC_NAME}, Ahiyapur, Muzaffarpur

> ${DOCTOR_NAME} is a consultant physician (${QUALIFICATIONS}; Bihar medical registration ${REG_NO}) who treats diabetes, high blood pressure, thyroid disorders, asthma/COPD and stomach problems at ${CLINIC_NAME}, ${ADDRESS_LINE}, India. Open ${HOURS_EN.toLowerCase()}. Phone/WhatsApp ${PHONE}. Online booking: ${BOOKING_URL}

## Key facts
- Listing name: ${LISTING_NAME}
- Doctor: ${DOCTOR_NAME} (${DOCTOR_NAME_HI}), MD General Medicine (DMCH Darbhanga), MBBS (SKMCH Muzaffarpur)
- Also: Senior Consultant in General Medicine, I T Memorial Hospital near SKMCH, Muzaffarpur
- Clinic: ${CLINIC_NAME} (${CLINIC_NAME_HI})
- Address: ${ADDRESS_LINE}
- पता: ${ADDRESS_HI}
- Hours: ${HOURS_EN} (IST)
- समय: ${HOURS_HI}
- Phone and WhatsApp: ${PHONE}
- Google Maps: ${GOOGLE_PROFILE_URL}
- Book online: ${BOOKING_URL}
- Languages: Hindi, English

## Pages
- [Home](${SITE_URL}/): who the doctor is, what he treats, how booking works, common questions
- [About Dr. Deepak Kumar](${SITE_URL}/about): education, registration, experience
- [Services](${SITE_URL}/services): conditions treated
- [Appointments, address and timings](${SITE_URL}/appointments): booking, map, phone, booking questions
- [Online booking (Arogya Rx)](${BOOKING_URL}): live slots for the next 7 days

## Questions and answers
${qa(FAQ_HOME.en)}

## प्रश्न और उत्तर (Hindi)
${qa(FAQ_HOME.hi)}

## Booking questions
${qa(FAQ_BOOKING.en)}
`;
}
