export type FAQCategory = 'For Parents' | 'For Schools' | 'For Drivers and Crew' | 'Safety and Emergencies'
export type FAQFilter = 'All Questions' | FAQCategory

export type FAQItem = {
  id: string
  category: FAQCategory
  question: string
  answer: string
  featured?: boolean
}

export const faqFilters: FAQFilter[] = [
  'All Questions',
  'For Parents',
  'For Schools',
  'For Drivers and Crew',
  'Safety and Emergencies',
]

export const faqItems: FAQItem[] = [
  {
    id: 'no-guardian-dropoff',
    category: 'For Parents',
    featured: true,
    question: 'What if no one is home when the bus arrives at the drop-off address?',
    answer:
      'If no verified guardian is present, the door does not open and the child stays safely on the bus. The co-driver marks the stop as no guardian present, operations is alerted, and the parent plus emergency contacts are called in order. If no approved adult is reached, the child is returned to school or taken to a pre-approved alternative address. Tranzita never leaves a child at an address with no verified adult present.',
  },
  {
    id: 'no-app-needed',
    category: 'For Parents',
    featured: true,
    question: "Do I need to download an app to track my child's bus?",
    answer:
      'No. Parent updates arrive through WhatsApp. The live tracking link opens in your phone browser, so Chrome, Safari, or any standard mobile browser works without installing anything. You save the Tranzita operations number and the important updates come to you automatically.',
  },
  {
    id: 'school-launch-time',
    category: 'For Schools',
    featured: true,
    question: 'How long does it take to get Tranzita running for our school?',
    answer:
      'A typical launch takes 10 working days from contract signing. In that window we handle student registration, route mapping, crew assignment, parent onboarding, a dry test route, dashboard training, and a first-day briefing for your transport coordinator.',
  },
  {
    id: 'accident-response',
    category: 'Safety and Emergencies',
    featured: true,
    question: 'What happens if there is an accident involving a Tranzita bus?',
    answer:
      'The onboard nurse starts emergency response immediately while the driver contacts emergency services. Operations receives the route alert, calls the bus, and phones every parent on that bus personally. Journey records are preserved and a written incident report is issued to the school safeguarding lead within 24 hours.',
  },
  {
    id: 'own-music',
    category: 'For Drivers and Crew',
    featured: true,
    question: 'Can I play my own music on the bus?',
    answer:
      'No. Route audio is controlled through the approved Tranzita playlist for child-safe journeys. Drivers cannot use personal audio, streaming apps, radio, or personal devices during an active school route. Any attempt to bypass the audio policy is flagged to operations.',
  },
  {
    id: 'crew-vetting-proof',
    category: 'For Parents',
    featured: true,
    question: 'How do I know the person driving my child has actually been vetted?',
    answer:
      "Every Tranzita crew member carries an ID card with a QR verification code. Parents also receive the assigned driver's, co-driver's, and nurse's names and Tranzita ID numbers in the morning briefing message. You can request vetting confirmation from operations at any time.",
  },
  {
    id: 'parents-how-it-works',
    category: 'For Parents',
    question: 'How does Tranzita work for parents?',
    answer:
      'Your school registers with Tranzita, then you provide your child details and verified guardians. On transport days you receive WhatsApp updates for crew assignment, boarding, departure, live ETA, 4-minute arrival warning, drop-off confirmation, and journey summary.',
  },
  {
    id: 'guardian-count',
    category: 'For Parents',
    question: 'How many guardians can I register for my child?',
    answer:
      'You can register up to four verified guardians per child. Each guardian needs ID verification and school countersigned consent. Changes usually take 24 to 48 hours because every adult on a child profile must be checked before drop-off is allowed.',
  },
  {
    id: 'forgot-wristband',
    category: 'For Parents',
    question: 'What if my child forgets their wristband?',
    answer:
      'The co-driver logs the child manually, marks the wristband as missing, and alerts operations. Your child still travels and you still receive WhatsApp updates. A replacement wristband can be requested through the school.',
  },
  {
    id: 'specific-driver',
    category: 'For Parents',
    question: 'Can I request a specific driver for my child?',
    answer:
      'Crew assignment is managed by operations based on route, availability, and safety planning. Parents cannot choose specific crew members, but any concern about an assigned person can be raised and reviewed promptly.',
  },
  {
    id: 'different-address',
    category: 'For Parents',
    question: 'What if my child is going to a different address today?',
    answer:
      'Temporary address changes must be sent to operations before 10 PM the evening before. Same-day changes are not accepted for safeguarding reasons. The alternative address must be inside the route area and have a verified guardian present.',
  },
  {
    id: 'speak-now',
    category: 'For Parents',
    question: 'How do I speak to someone at Tranzita right now?',
    answer:
      'Message the Tranzita operations WhatsApp line. During transport hours, a real operations team member responds within minutes. Outside transport hours, the team responds as quickly as possible and follows up directly.',
  },
  {
    id: 'lost-property',
    category: 'For Parents',
    question: 'My child left something on the bus. What do I do?',
    answer:
      'WhatsApp operations with the item description, bus number if known, and journey date. The team checks with the crew and depot. Found items are logged and either returned on the next route or arranged for collection.',
  },
  {
    id: 'medical-device',
    category: 'For Parents',
    question: 'Can my child travel with a medical device or medication?',
    answer:
      "Yes. Medical devices and prescribed medication should be disclosed during registration or as soon as the need arises. The onboard nurse receives the child's medical summary and coordinates with the school on health matters.",
  },
  {
    id: 'minimum-students',
    category: 'For Schools',
    question: 'What is the minimum number of students required for Tranzita to serve our school?',
    answer:
      'There is no strict minimum. Tranzita reviews each school by student count, location, and route complexity. Smaller programmes may use a different route structure, so the best step is a route review with the team.',
  },
  {
    id: 'alongside-existing',
    category: 'For Schools',
    question: 'Can we run Tranzita alongside our existing school bus arrangement?',
    answer:
      'Yes. A school can use Tranzita for a subset of students while other arrangements continue. Students registered on Tranzita routes should use Tranzita for the agreed routes and times.',
  },
  {
    id: 'school-data',
    category: 'For Schools',
    question: 'What data does Tranzita share with the school?',
    answer:
      'Schools receive fleet visibility, journey history, safety digests, incident reports, and route performance data through the dashboard. Child data is not sold or shared with third parties.',
  },
  {
    id: 'term-end',
    category: 'For Schools',
    question: 'What happens at the end of a term?',
    answer:
      'Tranzita provides a term operations summary, reviews route performance, updates student lists, and prepares the next term plan. Registrations can carry over unless the school or parent requests a change.',
  },
  {
    id: 'driver-performance',
    category: 'For Schools',
    question: 'Can the school monitor individual driver performance?',
    answer:
      'Yes. The school can review speed compliance, route adherence, and flags raised for drivers serving its routes. Concerns can be escalated directly to Tranzita operations for review.',
  },
  {
    id: 'route-cancellation',
    category: 'For Schools',
    question: 'What is the cancellation policy for individual routes?',
    answer:
      'If a route is cancelled, affected schools and parents are notified quickly through WhatsApp. Tranzita maintains reserve crew capacity to reduce cancellations, and repeated preventable cancellations are handled through service credits or corrective action.',
  },
  {
    id: 'vetting-time',
    category: 'For Drivers and Crew',
    question: 'How long does the vetting process take?',
    answer:
      'The full process usually takes 10 to 15 working days after documents are submitted. Police clearance timing can vary, but Tranzita guides applicants through each stage and keeps them updated.',
  },
  {
    id: 'own-vehicle',
    category: 'For Drivers and Crew',
    question: 'Do I need my own vehicle to work as a Tranzita driver?',
    answer:
      'No. Tranzita drivers operate Tranzita-provided electric vehicles. Drivers complete pre-departure checks and return the vehicle to depot standards after assigned routes.',
  },
  {
    id: 'crew-hours',
    category: 'For Drivers and Crew',
    question: 'What are the working hours for crew members?',
    answer:
      'Typical school transport hours are 6:30 AM to 9:30 AM and 1:30 PM to 6:00 PM on school days. Exact hours depend on the assigned route and school calendar.',
  },
  {
    id: 'crew-sick',
    category: 'For Drivers and Crew',
    question: 'What happens if I am sick and cannot do my route?',
    answer:
      'Call operations as early as possible. Tranzita keeps reserve crew members for cover. Genuine illness is handled practically, while repeated unexplained absence may trigger a route assignment review.',
  },
  {
    id: 'route-before-job',
    category: 'For Drivers and Crew',
    question: 'Can I see the route before I start the job?',
    answer:
      'Yes. Onboarding includes route familiarisation with a senior crew member, and assigned routes are available before the first live day.',
  },
  {
    id: 'seizure',
    category: 'Safety and Emergencies',
    question: 'What is the procedure if a child has a seizure on the bus?',
    answer:
      'The onboard nurse takes charge immediately, assesses the child, follows the medical summary card, and directs the driver if hospital diversion is needed. Operations contacts the parent and school at the same time.',
  },
  {
    id: 'road-collection',
    category: 'Safety and Emergencies',
    question: 'What if a parent tries to stop the bus on the road and take their child?',
    answer:
      'Children are not released on the road, even to a parent. The bus moves to a safe position, doors remain closed, and operations verifies the situation. This protects children from unauthorised collection and unsafe handovers.',
  },
  {
    id: 'gps-offline',
    category: 'Safety and Emergencies',
    question: 'What if the GPS tracking goes offline mid-journey?',
    answer:
      'A GPS transmission gap triggers an operations alert. The team contacts the bus, checks the last known position, and confirms an alternative tracking process before authorising the route to continue.',
  },
  {
    id: 'safeguarding-training',
    category: 'Safety and Emergencies',
    question: 'What safeguarding training do crew members receive?',
    answer:
      'Crew members complete child safeguarding training before routes begin. Training covers child safety, distress response, mandatory reporting, emergency procedures, and Tranzita conduct standards. Certification is renewed periodically.',
  },
  {
    id: 'parent-ride',
    category: 'Safety and Emergencies',
    question: 'Can a parent ride on the bus to check the service?',
    answer:
      'Yes, with advance notice and school approval. Observers must provide ID and be recorded as authorised adults on board. Tranzita welcomes route observation because the service should stand up to inspection.',
  },
]

export const featuredFaqs = faqItems.filter((item) => item.featured)
