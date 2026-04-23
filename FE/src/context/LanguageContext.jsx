import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    appointments: "Book Appointment",
    contact: "Contact",

    // Home Page — Hero
    welcome: "Welcome",
    drName: "Dr. Deepak Kumar",
    tagline: "Your Trusted Healthcare Partner",
    specialty: "MBBS, MD (General Medicine)",
    experience: "15+ Years Experience",
    bookAppointment: "Book Appointment Now",
    viewServices: "View Our Services",
    location: "Muzaffarpur, Bihar",
    heroDesc: "We provide guideline-directed comprehensive care for Diabetes, Blood Pressure, Thyroid, Asthma, COPD, and Abdominal diseases, prioritizing your long-term wellness.",
    education: "Education",
    educationDetail: "MBBS, SKMCH",
    specialization: "Specialization",
    specializationDetail: "MD General medicine, DMCH Darbhanga",

    // Home Page — Why Choose Us
    whyChooseTitle: "Why Choose Our Practice",
    whyChooseDesc: "We combine academic rigour with patient-centric care to ensure you receive the best possible medical outcomes in Muzaffarpur.",
    academicExcellence: "Academic Excellence",
    academicExcellenceDesc: "With foundational training from SKMCH and advanced MD General medicine specialization from DMCH Darbhanga, Dr. Deepak Kumar brings institutional expertise to private practice.",
    patientFirst: "Patient First",
    patientFirstDesc: "Prioritizing listening and empathy. Every treatment plan is tailored to your unique health profile and lifestyle.",
    modernFacility: "Modern Facility",
    modernFacilityDesc: "Equipped with the latest diagnostic tools for accurate assessment and effective management.",
    verifiedExperience: "Verified Experience",
    verifiedExperienceDesc: "A proven track record of successful patient outcomes and a trusted name in the Muzaffarpur medical community.",

    // Home Page — Core Services
    coreServicesTitle: "Core Medical Services",
    coreServicesDesc: "Specialized care across multiple disciplines to support your long-term health journey.",
    generalConsultation: "General Consultation",
    generalConsultationDesc: "Comprehensive health checks and routine wellness management.",
    diagnostics: "Diagnostics",
    diagnosticsDesc: "In-depth laboratory tests and clinical evaluation for precise diagnosis.",
    chronicCare: "Chronic Care",
    chronicCareDesc: "Long-term management strategies for diabetes, hypertension, and more.",
    emergencyAdvice: "Emergency Advice",
    emergencyAdviceDesc: "Critical care guidance and immediate clinical intervention.",
    exploreServices: "Explore all medical services",

    // Home Page — CTA
    ctaTitle: "Take the first step to better health.",
    ctaDesc: "Schedule your appointment today for personalized medical consultation in Muzaffarpur.",
    ctaButton: "Book Appointment Now",
    phone: "9199943818",

    // About Page
    aboutTitle: "About Dr. Deepak Kumar",
    aboutSubtitle: "Dedicated to Excellence in Healthcare",
    aboutDesc: "is a distinguished medical professional dedicated to revolutionizing patient care throughout the Tirhut division. Based in Muzaffarpur, the \"Capital of North Bihar,\" he bridges the gap between advanced medical science and compassionate healing, offering a trusted sanctuary for the community's health.",
    yearsExp: "5+ Years",
    yearsExpDesc: "Of clinical excellence and community service in Bihar.",

    // About Page — Education
    academicFoundation: "Academic Foundation",
    mbbs: "MBBS",
    mbbsCollege: "Sri Krishna Medical College (SKMCH)",
    mbbsDesc: "Completed his foundational medical education at one of Bihar's premier institutions, developing a robust clinical perspective.",
    md: "MD General medicine",
    mdCollege: "Darbhanga Medical College (DMCH Darbhanga)",
    mdDesc: "Specialized training that honed his expertise in diagnostic precision and advanced therapeutic interventions.",
    eliteTraining: "Elite Training",
    eliteTrainingDesc: "Educated at Bihar's most rigorous medical sanctuaries.",

    // About Page — Community
    communityTitle: "A Lifelong Vow to Muzaffarpur",
    communityDesc: "Muzaffarpur is more than just a practice location; it is home. Operating from Arogya Clinic, Dr. Deepak Kumar's commitment extends to the heart of the \"Land of Shahi Lychees\". He is deeply involved in local health initiatives, ensuring that quality healthcare is accessible to every strata of society in Bihar.",
    freeCamps: "Regular free health camps for underprivileged populations.",
    mentorship: "Mentorship programs for local medical aspirants.",
    preventiveHealth: "Primary advocate for preventive health education in rural zones.",

    // About Page — Milestones
    milestonesTitle: "Professional Milestones",
    milestonesDesc: "A legacy of clinical excellence and academic rigor.",
    foundation: "Foundation",
    academicCommencement: "Academic Commencement",
    academicCommencementDesc: "MBBS Graduation from SKMCH, Muzaffarpur.",
    specializationLabel: "Specialization",
    advancedMedicine: "Advanced Medicine",
    advancedMedicineDesc: "Obtained MD General medicine from the prestigious Darbhanga Medical College.",
    establishment: "Establishment",
    civicLeadership: "Civic Leadership",
    civicLeadershipDesc: "Established the landmark clinic in Muzaffarpur focusing on empathetic care.",

    // About Page — Accreditations
    accreditationsTitle: "Accreditations & Honors",
    imaMember: "IMA Member",
    imaDesc: "Indian Medical Association",
    boardCertified: "Board Certified",
    boardDesc: "Medical Council of India",
    excellenceAward: "Excellence Award",
    awardDesc: "State Health Mission",
    fellowship: "Fellowship",
    fellowshipDesc: "Internal Medicine",

    // Services Page
    servicesHeroBadge: "Patient-Centered Excellence",
    servicesHeroTitle: "Specialized Care Tailored to Your Wellness",
    servicesHeroDesc: "Experience comprehensive medical solutions combining state-of-the-art diagnostics with a compassionate, editorial approach to modern healthcare.",
    clinicalServices: "Clinical Services",
    clinicalServicesDesc: "Our multidisciplinary approach ensures every patient receives focused attention and a personalized treatment roadmap.",
    diabetesBp: "Diabetes & Blood Pressure Management",
    diabetesBpDesc: "Guideline-directed medical treatment for managing chronic conditions like Diabetes and Hypertension. We provide continuous monitoring and personalized therapeutic plans to ensure your vitals remain balanced and optimal.",
    learnMore: "Learn More",
    endocrineCare: "Endocrine Care",
    endocrineCareDesc: "Advanced diagnosis and holistic management of Thyroid-related disorders.",
    respiratoryHealth: "Respiratory Health",
    respiratoryHealthDesc: "Specialized interventions for Asthma, COPD, and other pulmonary challenges.",
    abdomenDiseases: "Abdomen Diseases",
    abdomenDiseasesDesc: "Expert consultations and treatment plans for diseases related to the abdomen and GI tract.",
    teleconsultation: "Teleconsultation",
    teleconsultationDesc: "Access personalized medical advice and follow-up care remotely from the comfort of your home.",
    beyondMedicine: "Beyond Medicine: A Partnership in Health",
    evidenceBased: "Evidenced-Based Protocols",
    evidenceBasedDesc: "Treatments rooted in the latest clinical research and global medical standards.",
    personalizedTouch: "Personalized Touch",
    personalizedTouchDesc: "Every patient is unique. We build medical plans that respect individual lifestyles.",
    startRecovery: "Start Your Path to Recovery",
    startRecoveryDesc: "Schedule a comprehensive consultation today and experience healthcare reimagined for the modern age.",
    scheduleAppt: "Schedule Appointment",
    viewPricing: "View Pricing",

    // Appointments Page
    appointmentTitle: "Book Your Appointment",
    clinicLocation: "Clinic Location",
    address: "Saktidharamkata Bada Jagganath, near God Father Public School, 842004",
    phoneNumber: "Phone Number",
    phoneValue: "919994381893",
    operatingHours: "Operating Hours",
    hoursValue: "Morning visit timing 6:30am to 9am\nEvening visit timing 3pm to 6pm",
    emailAddress: "Email Address",
    emailValue: "deepakkumar21121995@gmail.com",
    availableToday: "Available Today",
    requestAppointment: "Request an Appointment",
    appointmentRequested: "Appointment Requested!",
    appointmentRequestedMsg: "We've received your request and will contact you shortly to confirm your appointment.",
    submissionFailed: "Submission Failed",
    fullName: "Full Name",
    namePlaceholder: "e.g. Ramesh Kumar",
    phonePlaceholder: "91 00000 00000",
    emailPlaceholder: "your@email.com",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time Slot",
    medicalConcern: "Medical Concern",
    concernPlaceholder: "Briefly describe your health concern...",
    sendRequest: "Send Request",
    sending: "Sending...",
    privacyPolicy: "By submitting this form, you agree to our Privacy Policy.",
    bookNow: "Book Appointment",
    confirmation: "Appointment Booked Successfully!",
    confirmationMsg: "You will receive a confirmation call shortly.",
    selectDate: "Select Date",
    selectTime: "Select Time Slot",
    symptoms: "Describe your symptoms",

    // Time Slots
    morningSlot: "Morning (9 AM - 12 PM)",
    afternoonSlot: "Afternoon (2 PM - 5 PM)",
    eveningSlot: "Evening Clinic (8:30 PM Onwards)",
    teleconsultSlot: "Teleconsultation",

    // WhatsApp Button
    whatsappChat: "Chat on WhatsApp",
    whatsappMsg: "Hello Dr. Deepak, I would like to consult with you.",
    available24x7: "Available 24x7",
    instantResponse: "Instant Response",

    // WhatsApp Widget
    reset: "Reset",
    send: "Send",
    sendTo: "Send to",
    yourDetails: "Your details go directly to",
    preConsultForm: "Pre-consultation form",
    quickQuestions: "quick questions",
    thanksSummary: "Thanks! Here's your summary:",
    concern: "Concern",
    sendSummary: "Click the button below to send this summary on WhatsApp!",
    helloAssistant: "Hello! I'm the Arogya Clinic assistant.\n\nWhat is your main health concern today?",
    typeSymptoms: "Please type your symptoms:",
    symptomPlaceholder: "e.g. Stomach pain, Headache…",
    fever: "Fever",
    coldCough: "Cold Cough",
    thyroid: "Thyroid",
    others: "Others",

    // Footer
    footerDesc: "Expert healthcare professional dedicated to the wellness of the Muzaffarpur community at Arogya Clinic. MBBS (SKMCH), MD General medicine (DMCH Darbhanga).",
    navigation: "Navigation",
    aboutUs: "About Us",
    patientPortal: "Patient Portal",
    reserve: "Reserve (Dashboard)",
    clinicLocationTitle: "Arogya Clinic Location",
    morningTiming: "Morning visit timing 6:30am to 9am",
    eveningTiming: "Evening visit timing 3pm to 6pm",
    copyright: "© 2024 Dr. Deepak Kumar. All rights reserved.",

    // Common
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    yes: "Yes",
    no: "No",
  },
  hi: {
    // Navigation
    home: "होम",
    about: "परिचय",
    services: "सेवाएं",
    appointments: "अपॉइंटमेंट बुक करें",
    contact: "संपर्क करें",

    // Home Page — Hero
    welcome: "स्वागत है",
    drName: "डॉ. दीपक कुमार",
    tagline: "आपका विश्वसनीय स्वास्थ्य साथी",
    specialty: "एमबीबीएस, एमडी (जनरल मेडिसिन)",
    experience: "15+ वर्ष का अनुभव",
    bookAppointment: "अभी अपॉइंटमेंट बुक करें",
    viewServices: "हमारी सेवाएं देखें",
    location: "मुजफ्फरपुर, बिहार",
    heroDesc: "हम मधुमेह, रक्तचाप, थायरॉयड, अस्थमा, सीओपीडी और पेट के रोगों के लिए दिशानिर्देश-निर्देशित व्यापक देखभाल प्रदान करते हैं, जो आपके दीर्घकालिक कल्याण को प्राथमिकता देते हैं।",
    education: "शिक्षा",
    educationDetail: "एमबीबीएस, एसकेएमसीएच",
    specialization: "विशेषज्ञता",
    specializationDetail: "एमडी जनरल मेडिसिन, डीएमसीएच दरभंगा",

    // Home Page — Why Choose Us
    whyChooseTitle: "हमारा अभ्यास क्यों चुनें",
    whyChooseDesc: "हम अकादमिक कठोरता को रोगी-केंद्रित देखभाल के साथ जोड़ते हैं ताकि आपको मुजफ्फरपुर में सर्वोत्तम संभव चिकित्सा परिणाम मिल सकें।",
    academicExcellence: "शैक्षणिक उत्कृष्टता",
    academicExcellenceDesc: "एसकेएमसीएच से बुनियादी प्रशिक्षण और डीएमसीएच दरभंगा से उन्नत एमडी जनरल मेडिसिन विशेषज्ञता के साथ, डॉ. दीपक कुमार निजी अभ्यास में संस्थागत विशेषज्ञता लाते हैं।",
    patientFirst: "रोगी पहले",
    patientFirstDesc: "सुनने और सहानुभूति को प्राथमिकता देना। हर इलाज की योजना आपके अद्वितीय स्वास्थ्य प्रोफाइल और जीवनशैली के अनुसार तैयार की जाती है।",
    modernFacility: "आधुनिक सुविधा",
    modernFacilityDesc: "सटीक मूल्यांकन और प्रभावी प्रबंधन के लिए नवीनतम नैदानिक उपकरणों से सुसज्जित।",
    verifiedExperience: "सत्यापित अनुभव",
    verifiedExperienceDesc: "सफल रोगी परिणामों का एक सिद्ध ट्रैक रिकॉर्ड और मुजफ्फरपुर चिकित्सा समुदाय में एक विश्वसनीय नाम।",

    // Home Page — Core Services
    coreServicesTitle: "मुख्य चिकित्सा सेवाएं",
    coreServicesDesc: "आपकी दीर्घकालिक स्वास्थ्य यात्रा का समर्थन करने के लिए कई disciplines में विशेषज्ञ देखभाल।",
    generalConsultation: "सामान्य परामर्श",
    generalConsultationDesc: "व्यापक स्वास्थ्य जांच और नियमित कल्याण प्रबंधन।",
    diagnostics: "निदान",
    diagnosticsDesc: "सटीक निदान के लिए गहन प्रयोगशाला परीक्षण और नैदानिक मूल्यांकन।",
    chronicCare: "पुरानी देखभाल",
    chronicCareDesc: "मधुमेह, उच्च रक्तचाप और अधिक के लिए दीर्घकालिक प्रबंधन रणनीतियाँ।",
    emergencyAdvice: "आपातकालीन सलाह",
    emergencyAdviceDesc: "गंभीर देखभाल मार्गदर्शन और तत्काल नैदानिक हस्तक्षेप।",
    exploreServices: "सभी चिकित्सा सेवाएं देखें",

    // Home Page — CTA
    ctaTitle: "बेहतर स्वास्थ्य की ओर पहला कदम उठाएं।",
    ctaDesc: "मुजफ्फरपुर में वैयक्तिकृत चिकित्सा परामर्श के लिए आज ही अपना अपॉइंटमेंट शेड्यूल करें।",
    ctaButton: "अभी अपॉइंटमेंट बुक करें",
    phone: "9199943818",

    // About Page
    aboutTitle: "डॉ. दीपक कुमार के बारे में",
    aboutSubtitle: "स्वास्थ्य सेवा में उत्कृष्टता के प्रति समर्पित",
    aboutDesc: "तिरहुत संभाग में रोगी देखभाल में क्रांति लाने के लिए समर्पित एक प्रतिष्ठित चिकित्सा पेशेवर हैं। मुजफ्फरपुर, \"उत्तर बिहार की राजधानी\" में स्थित, वह उन्नत चिकित्सा विज्ञान और दयालु उपचार के बीच की खाई को पाटते हैं, समुदाय के स्वास्थ्य के लिए एक विश्वसनीय शरण प्रदान करते हैं।",
    yearsExp: "5+ वर्ष",
    yearsExpDesc: "बिहार में नैदानिक उत्कृष्टता और सामुदायिक सेवा का।",

    // About Page — Education
    academicFoundation: "शैक्षणिक आधार",
    mbbs: "एमबीबीएस",
    mbbsCollege: "श्री कृष्ण मेडिकल कॉलेज (एसकेएमसीएच)",
    mbbsDesc: "बिहार के प्रमुख संस्थानों में से एक में उनकी बुनियादी चिकित्सा शिक्षा पूरी की, जिससे एक मजबूत नैदानिक दृष्टिकोण विकसित हुआ।",
    md: "एमडी जनरल मेडिसिन",
    mdCollege: "दरभंगा मेडिकल कॉलेज (डीएमसीएच दरभंगा)",
    mdDesc: "विशेषज्ञ प्रशिक्षण जिसने नैदानिक सटीकता और उन्नत चिकित्सीय हस्तक्षेप में उनकी विशेषज्ञता को निखारा।",
    eliteTraining: " elite प्रशिक्षण",
    eliteTrainingDesc: "बिहार के सबसे कठोर चिकित्सा sanctuaries में शिक्षित।",

    // About Page — Community
    communityTitle: "मुजफ्फरपुर के प्रति आजीवन वचन",
    communityDesc: "मुजफ्फरपुर सिर्फ एक अभ्यास स्थल से ज्यादा है; यह घर है। आरोग्य क्लिनिक से संचालित, डॉ. दीपक कुमार की प्रतिबद्धता \"शाही लीची की भूमि\" के केंद्र तक फैली हुई है। वह स्थानीय स्वास्थ्य पहलों में गहराई से शामिल हैं, यह सुनिश्चित करते हुए कि बिहार में हर वर्ग के लिए गुणवत्तापूर्ण स्वास्थ्य सेवा सुलभ हो।",
    freeCamps: "वंचित आबादी के लिए नियमित निःशुल्क स्वास्थ्य शिविर।",
    mentorship: "स्थानीय चिकित्सा उम्मीदवारों के लिए mentorship कार्यक्रम।",
    preventiveHealth: "ग्रामीण क्षेत्रों में निवारक स्वास्थ्य शिक्षा के प्राथमिक अधिवक्ता।",

    // About Page — Milestones
    milestonesTitle: "पेशेवर मील के पत्थर",
    milestonesDesc: "नैदानिक उत्कृष्टता और अकादमिक कठोरता की एक विरासत।",
    foundation: "नींव",
    academicCommencement: "अकादमिक प्रारंभ",
    academicCommencementDesc: "एसकेएमसीएच, मुजफ्फरपुर से एमबीबीएस स्नातक।",
    specializationLabel: "विशेषज्ञता",
    advancedMedicine: "उन्नत चिकित्सा",
    advancedMedicineDesc: "प्रतिष्ठित दरभंगा मेडिकल कॉलेज से एमडी जनरल मेडिसिन प्राप्त किया।",
    establishment: "स्थापना",
    civicLeadership: "नागरिक नेतृत्व",
    civicLeadershipDesc: "मुजफ्फरपुर में सहानुभूतिपूर्ण देखभाल पर केंद्रित एक प्रमुख क्लिनिक स्थापित किया।",

    // About Page — Accreditations
    accreditationsTitle: "मान्यता और सम्मान",
    imaMember: "आईएमए सदस्य",
    imaDesc: "इंडियन मेडिकल एसोसिएशन",
    boardCertified: "बोर्ड प्रमाणित",
    boardDesc: "मेडिकल काउंसिल ऑफ इंडिया",
    excellenceAward: "उत्कृष्टता पुरस्कार",
    awardDesc: "स्टेट हेल्थ मिशन",
    fellowship: "फेलोशिप",
    fellowshipDesc: "इंटरनल मेडिसिन",

    // Services Page
    servicesHeroBadge: "रोगी-केंद्रित उत्कृष्टता",
    servicesHeroTitle: "आपके कल्याण के लिए अनुकूलित विशेष देखभाल",
    servicesHeroDesc: "आधुनिक स्वास्थ्य सेवा के लिए एक दयालु, संपादकीय दृष्टिकोण के साथ अत्याधुनिक नैदानिक उपकरणों को जोड़ने वाले व्यापक चिकित्सा समाधान का अनुभव करें।",
    clinicalServices: "नैदानिक सेवाएं",
    clinicalServicesDesc: "हमारा बहु-विषयक दृष्टिकोण सुनिश्चित करता है कि हर रोगी को केंद्रित ध्यान और एक वैयक्तिकृत इलाज रोडमैप मिले।",
    diabetesBp: "मधुमेह और रक्तचाप प्रबंधन",
    diabetesBpDesc: "मधुमेह और उच्च रक्तचाप जैसी पुरानी स्थितियों के प्रबंधन के लिए दिशानिर्देश-निर्देशित चिकित्सा उपचार। हम निरंतर निगरानी और वैयक्तिकृत चिकित्सीय योजनाएं प्रदान करते हैं ताकि आपके वाइटल संतुलित और इष्टतम रहें।",
    learnMore: "और जानें",
    endocrineCare: "एंडोक्राइन देखभाल",
    endocrineCareDesc: "थायरॉयड-संबंधी विकारों का उन्नत निदान और समग्र प्रबंधन।",
    respiratoryHealth: "श्वसन स्वास्थ्य",
    respiratoryHealthDesc: "अस्थमा, सीओपीडी और अन्य फुफ्फुसीय चुनौतियों के लिए विशेषज्ञ हस्तक्षेप।",
    abdomenDiseases: "पेट के रोग",
    abdomenDiseasesDesc: "पेट और जीआई ट्रैक्ट से संबंधित रोगों के लिए विशेषज्ञ परामर्श और इलाज की योजनाएं।",
    teleconsultation: "टेलीकंसल्टेशन",
    teleconsultationDesc: "अपने घर के आराम से दूरस्थ रूप से वैयक्तिकृत चिकित्सा सलाह और फॉलो-अप देखभाल तक पहुंचें।",
    beyondMedicine: "चिकित्सा से परे: स्वास्थ्य में भागीदारी",
    evidenceBased: "सबूत-आधारित प्रोटोकॉल",
    evidenceBasedDesc: "नवीनतम नैदानिक अनुसंधान और वैश्विक चिकित्सा मानकों में जड़ें उपचार।",
    personalizedTouch: "वैयक्तिकृत स्पर्श",
    personalizedTouchDesc: "हर रोगी अद्वितीय है। हम ऐसी चिकित्सा योजनाएं बनाते हैं जो व्यक्तिगत जीवनशैली का सम्मान करती हैं।",
    startRecovery: "स्वस्थ होने का रास्ता शुरू करें",
    startRecoveryDesc: "आज ही एक व्यापक परामर्श शेड्यूल करें और आधुनिक युग के लिए पुन:कल्पित स्वास्थ्य सेवा का अनुभव करें।",
    scheduleAppt: "अपॉइंटमेंट शेड्यूल करें",
    viewPricing: "मूल्य देखें",

    // Appointments Page
    appointmentTitle: "अपना अपॉइंटमेंट बुक करें",
    clinicLocation: "क्लिनिक का स्थान",
    address: "सक्तिधरमकटा बड़ा जगन्नाथ, गॉड फादर पब्लिक स्कूल के पास, 842004",
    phoneNumber: "फोन नंबर",
    phoneValue: "919994381893",
    operatingHours: "संचालन के घंटे",
    hoursValue: "सुबह का समय 6:30 बजे से 9 बजे तक\nशाम का समय 3 बजे से 6 बजे तक",
    emailAddress: "ईमेल पता",
    emailValue: "deepakkumar21121995@gmail.com",
    availableToday: "आज उपलब्ध",
    requestAppointment: "अपॉइंटमेंट का अनुरोध करें",
    appointmentRequested: "अपॉइंटमेंट का अनुरोध किया गया!",
    appointmentRequestedMsg: "हमें आपका अनुरोध प्राप्त हो गया है और हम जल्द ही आपसे संपर्क करेंगे।",
    submissionFailed: "सबमिशन विफल",
    fullName: "पूरा नाम",
    namePlaceholder: "जैसे रमेश कुमार",
    phonePlaceholder: "91 00000 00000",
    emailPlaceholder: "your@email.com",
    preferredDate: "पसंदीदा तारीख",
    preferredTime: "पसंदीदा समय स्लॉट",
    medicalConcern: "चिकित्सा चिंता",
    concernPlaceholder: "संक्षिप्त में अपनी स्वास्थ्य समस्या का वर्णन करें...",
    sendRequest: "अनुरोध भेजें",
    sending: "भेजा जा रहा है...",
    privacyPolicy: "इस फॉर्म को जमा करके, आप हमारी गोपनीयता नीति से सहमत होते हैं।",
    bookNow: "अपॉइंटमेंट बुक करें",
    confirmation: "अपॉइंटमेंट सफलतापूर्वक बुक किया गया!",
    confirmationMsg: "आपको शीघ्र ही पुष्टि कॉल प्राप्त होगी।",
    selectDate: "तारीख चुनें",
    selectTime: "समय स्लॉट चुनें",
    symptoms: "अपने लक्षणों का वर्णन करें",

    // Time Slots
    morningSlot: "सुबह (9 बजे - 12 बजे)",
    afternoonSlot: "दोपहर (2 बजे - 5 बजे)",
    eveningSlot: "शाम का क्लिनिक (8:30 बजे के बाद)",
    teleconsultSlot: "टेलीकंसल्टेशन",

    // WhatsApp Button
    whatsappChat: "व्हाट्सएप पर चैट करें",
    whatsappMsg: "नमस्ते डॉ. दीपक, मैं आपसे परामर्श करना चाहता हूं।",
    available24x7: "24x7 उपलब्ध",
    instantResponse: "त्वरित प्रतिक्रिया",

    // WhatsApp Widget
    reset: "फिर से शुरू",
    send: "भेजें",
    sendTo: "को भेजें",
    yourDetails: "आपकी जानकारी सीधे जाती है",
    preConsultForm: "पूर्व-परामर्श फॉर्म",
    quickQuestions: "त्वरित प्रश्न",
    thanksSummary: "धन्यवाद! यहाँ आपका सारांश है:",
    concern: "समस्या",
    sendSummary: "नीचे दिए गए बटन पर क्लिक करके व्हाट्सएप पर यह सारांश भेजें!",
    helloAssistant: "नमस्ते! 👋 मैं आरोग्य क्लिनिक का सहायक हूं।\n\nआज आपकी मुख्य स्वास्थ्य समस्या क्या है?",
    typeSymptoms: "कृपया अपने लक्षण टाइप करें:",
    symptomPlaceholder: "जैसे पेट दर्द, सिरदर्द…",
    fever: "बुखार",
    coldCough: "सर्दी खांसी",
    thyroid: "थायरॉयड",
    others: "अन्य",

    // Footer
    footerDesc: "मुजफ्फरपुर में आरोग्य क्लिनिक पर समुदाय के कल्याण के लिए समर्पित विशेषज्ञ स्वास्थ्य देखभाल पेशेवर। एमबीबीएस (एसकेएमसीएच), एमडी जनरल मेडिसिन (डीएमसीएच दरभंगा)।",
    navigation: "नेविगेशन",
    aboutUs: "हमारे बारे में",
    patientPortal: "रोगी पोर्टल",
    reserve: "रिजर्व (डैशबोर्ड)",
    clinicLocationTitle: "आरोग्य क्लिनिक का स्थान",
    morningTiming: "सुबह का समय 6:30 बजे से 9 बजे तक",
    eveningTiming: "शाम का समय 3 बजे से 6 बजे तक",
    copyright: "© 2024 डॉ. दीपक कुमार। सर्वाधिकार सुरक्षित।",

    // Common
    loading: "लोड हो रहा है...",
    submit: "सबमिट करें",
    cancel: "रद्द करें",
    save: "सहेजें",
    close: "बंद करें",
    yes: "हाँ",
    no: "नहीं",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('doctor_profile_language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('doctor_profile_language', language);
  }, [language]);

  const t = (key) => translations[language][key] || key;
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'hi' : 'en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
