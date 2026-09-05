import type {
  Complaint,
  ServiceCategory,
  CivicStat,
  CityNotice,
  ServiceRequest,
  CitizenNotification,
  CitizenProfile
} from '../types';

export const CIVIC_STATS: CivicStat[] = [
  {
    label: 'Complaints Resolved (Demo)',
    value: '94,820+',
    numericValue: 94820,
    suffix: '+',
    change: '+14.2% demo trend',
    isPositive: true,
    description: 'Simulated civic issues successfully closed with photo records'
  },
  {
    label: 'Active In-Progress',
    value: '1,240',
    numericValue: 1240,
    suffix: '',
    change: 'Sample active queue',
    isPositive: true,
    description: 'Field officer work units currently assigned in mock database'
  },
  {
    label: 'Registered Citizens',
    value: '352,400+',
    numericValue: 352400,
    suffix: '+',
    change: '+3.8k joined (mock)',
    isPositive: true,
    description: 'Simulated resident accounts across 48 demo municipal wards'
  },
  {
    label: 'Avg. Resolution Time',
    value: '28.5 Hrs',
    numericValue: 28.5,
    suffix: ' Hrs',
    change: '32% faster than SLA',
    isPositive: true,
    description: 'Simulated SLA target benchmark: 48 Hrs'
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'roads',
    slug: 'roads',
    title: 'Road & Street Issues',
    category: 'roads',
    description: 'Potholes, broken footpaths, road cave-ins, and uneven speed breakers needing immediate resurfacing.',
    icon: 'Hammer',
    slaHours: '24 - 48 Hours',
    avgRating: 4.8,
    department: 'Civil Infrastructure & Highways Dept. (Demo)',
    popularIssues: ['Dangerous Pothole on Main Road', 'Damaged Footpath / Paver Blocks', 'Manhole Cover Missing', 'Illegal Speed Breaker']
  },
  {
    id: 'sanitation',
    slug: 'sanitation',
    title: 'Garbage & Sanitation',
    category: 'sanitation',
    description: 'Missed door-to-door waste collection, overflowing neighborhood dustbins, and open waste dumping.',
    icon: 'Trash2',
    slaHours: '12 - 24 Hours',
    avgRating: 4.7,
    department: 'Solid Waste Management Division (Demo)',
    popularIssues: ['Unattended Garbage Pile', 'Door-to-Door Van Missed', 'Debris / Construction Waste', 'Public Urinal Cleanliness']
  },
  {
    id: 'water',
    slug: 'water',
    title: 'Water Supply & Drainage',
    category: 'water',
    description: 'Pipeline leakages, contaminated tap water, low pressure, and monsoon drain waterlogging.',
    icon: 'Droplets',
    slaHours: '18 - 36 Hours',
    avgRating: 4.9,
    department: 'Municipal Water Supply & Sewerage Board (Demo)',
    popularIssues: ['Main Pipeline Burst / Leakage', 'Choked Stormwater Drain', 'Contaminated Muddy Water', 'Water Tanker Urgent Request']
  },
  {
    id: 'electricity',
    slug: 'electricity',
    title: 'Street Lights & Electrical',
    category: 'electricity',
    description: 'Non-functional streetlights, blinking poles, dangling exposed electrical cables, and dark hazard spots.',
    icon: 'Zap',
    slaHours: '12 - 24 Hours',
    avgRating: 4.8,
    department: 'Urban Electrical & Lighting Dept. (Demo)',
    popularIssues: ['Pole Light Not Working', 'Exposed Live Wire Hazard', 'High-Mast Light Malfunction', 'New Street Light Request']
  },
  {
    id: 'infrastructure',
    slug: 'infrastructure',
    title: 'Public Infrastructure & Parks',
    category: 'infrastructure',
    description: 'Damaged children park equipment, broken public benches, bus stops, and municipal property upkeep.',
    icon: 'Building2',
    slaHours: '48 - 72 Hours',
    avgRating: 4.6,
    department: 'Horticulture & Public Works Division (Demo)',
    popularIssues: ['Dangerous Tree Branch Overhanging', 'Broken Park Play Equipment', 'Damaged Bus Shelter', 'Encroachment on Public Space']
  },
  {
    id: 'health',
    slug: 'health',
    title: 'Public Health & Environment',
    category: 'health',
    description: 'Anti-mosquito thermal fogging, stray animal vaccination, dead animal removal, and air quality issues.',
    icon: 'ShieldAlert',
    slaHours: '12 - 24 Hours',
    avgRating: 4.9,
    department: 'Public Health & Vector Control Dept. (Demo)',
    popularIssues: ['Mosquito Breeding / Fogging Needed', 'Stray Dog Menace / Vaccination', 'Dead Animal Removal', 'Noise / Air Pollution Complaint']
  }
];

export const SAMPLE_COMPLAINTS: Record<string, Complaint> = {
  'SC-2026-8942': {
    id: 'SC-2026-8942',
    category: 'roads',
    categoryName: 'Road & Street Issues',
    title: 'Hazardous deep pothole near Metro Pillar 142',
    description: 'Deep pothole causing two-wheeler skidding risk during evening peak rush hours. Approx 3ft width and 6 inches deep.',
    ward: 'Ward 14 - North Central District',
    location: 'Outer Ring Road, Opp. Central Mall, Metro Pillar 142',
    status: 'Resolved',
    priority: 'High',
    submittedAt: 'Sep 04, 2026 • 09:15 AM',
    estimatedResolution: 'Completed in 19 Hours',
    citizenName: 'Citizen Resident (Ward 14)',
    assignedOfficer: {
      name: 'Er. Rajesh Kumar',
      designation: 'Senior Assistant Engineer (PHE & Roads)',
      department: 'Ward 14 Civil Works Division',
      phone: '+91 98765 00000 (Demo)'
    },
    timeline: [
      {
        title: 'Complaint Registered',
        timestamp: 'Sep 04, 2026 • 09:15 AM',
        description: 'Geo-tagged ticket automatically logged in demo database.',
        completed: true
      },
      {
        title: 'Officer Assigned & Site Inspected',
        timestamp: 'Sep 04, 2026 • 11:30 AM',
        description: 'Field Officer inspected the pothole and dispatched hot-mix asphalt road repair team.',
        completed: true,
        officer: 'Er. Rajesh Kumar',
        designation: 'Ward 14 Civil Works Division'
      },
      {
        title: 'On-Ground Repair Work In Progress',
        timestamp: 'Sep 04, 2026 • 04:45 PM',
        description: 'Asphalt compaction and resurfacing completed with safety barricading.',
        completed: true
      },
      {
        title: 'Quality Verification & Resolved',
        timestamp: 'Sep 05, 2026 • 04:15 AM',
        description: 'Quality audit photo uploaded. Simulated closure confirmation dispatched.',
        completed: true
      }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  'SC-2026-9104': {
    id: 'SC-2026-9104',
    category: 'electricity',
    categoryName: 'Street Lights & Electrical',
    title: 'Cluster of 4 streetlights dark on 7th Main Avenue',
    description: 'Entire residential stretch completely pitch dark for 2 nights causing severe safety concerns for pedestrians.',
    ward: 'Ward 22 - Green Valley East',
    location: '7th Main, Cross 3 to Cross 6, Green Valley',
    status: 'In Progress',
    priority: 'Medium',
    submittedAt: 'Today at 08:30 AM',
    estimatedResolution: 'Today by 08:00 PM',
    citizenName: 'Pooja Verma (Demo User)',
    assignedOfficer: {
      name: 'Mr. Sunil Deshmukh',
      designation: 'Superintendent Electrical Maintenance',
      department: 'Smart Lighting Command Centre',
      phone: '+91 94231 00000 (Demo)'
    },
    timeline: [
      {
        title: 'Complaint Registered',
        timestamp: 'Today • 08:30 AM',
        description: 'Automated verification check passed. System notified the electrical response team.',
        completed: true
      },
      {
        title: 'Technician Dispatched',
        timestamp: 'Today • 10:15 AM',
        description: 'Feeder box inspection assigned to Electrical Maintenance Unit 4.',
        completed: true,
        officer: 'Mr. Sunil Deshmukh',
        designation: 'Electrical Division'
      },
      {
        title: 'Component Replacement In-Progress',
        timestamp: 'Today • 02:00 PM',
        description: 'Replacing damaged MCB and LED lamp driver on pole #22-841.',
        completed: true
      },
      {
        title: 'Final Quality Redressal',
        timestamp: 'Pending Dusk Test (Approx 07:30 PM)',
        description: 'Post-sunset automated illuminance test scheduled before closing ticket.',
        completed: false
      }
    ]
  },
  'SC-2026-7821': {
    id: 'SC-2026-7821',
    category: 'sanitation',
    categoryName: 'Garbage & Sanitation',
    title: 'Overflowing community waste bin at Sector 9 Market',
    description: 'Waste spilling onto walkway near fresh produce market. Immediate collection and disinfectant wash requested.',
    ward: 'Ward 09 - Central Commercial Zone',
    location: 'Sector 9 Weekly Market Gate #2',
    status: 'Officer Assigned',
    priority: 'High',
    submittedAt: 'Today at 11:20 AM',
    estimatedResolution: 'Within 4 Hours',
    citizenName: 'Citizen Resident (Ward 14)',
    assignedOfficer: {
      name: 'Ms. Sunita Patil',
      designation: 'Sanitation Ward Inspector',
      department: 'Public Health Sanitation Wing',
      phone: '+91 98220 00000 (Demo)'
    },
    timeline: [
      {
        title: 'Complaint Registered',
        timestamp: 'Today • 11:20 AM',
        description: 'Citizen submitted report with demo geo-coordinates.',
        completed: true
      },
      {
        title: 'Compactor Vehicle Rerouted',
        timestamp: 'Today • 12:05 PM',
        description: 'Solid Waste Quick Response Vehicle (MH-12-CZ-4921) dispatched.',
        completed: true,
        officer: 'Ms. Sunita Patil',
        designation: 'Sanitation Inspector'
      },
      {
        title: 'Cleaning & Lime Spray Sanitization',
        timestamp: 'In Progress (ETA 02:30 PM)',
        description: 'Heavy bin clearance and anti-bacterial spraying.',
        completed: false
      },
      {
        title: 'Redressed & Photo Verification',
        timestamp: 'Pending Final Inspection',
        description: 'Closure report with clean site photograph.',
        completed: false
      }
    ]
  },
  'SC-2026-6410': {
    id: 'SC-2026-6410',
    category: 'water',
    categoryName: 'Water Supply & Drainage',
    title: 'Low water pressure and brown sediment in tap supply',
    description: 'Water pressure dropped drastically over the last 3 days and water is noticeably discolored.',
    ward: 'Ward 14 - North Central District',
    location: 'Building 4, Sector 7, Orchid Avenue',
    status: 'Submitted',
    priority: 'Medium',
    submittedAt: 'Sep 02, 2026 • 04:30 PM',
    estimatedResolution: 'Within 36 Hours',
    citizenName: 'Citizen Resident (Ward 14)',
    timeline: [
      {
        title: 'Complaint Registered',
        timestamp: 'Sep 02, 2026 • 04:30 PM',
        description: 'Ticket received and queued for zonal pipeline inspection.',
        completed: true
      },
      {
        title: 'Desk Review & Officer Triage',
        timestamp: 'Pending Assignment',
        description: 'Scheduling water quality testing unit.',
        completed: false
      }
    ]
  },
  'SC-2026-5199': {
    id: 'SC-2026-5199',
    category: 'infrastructure',
    categoryName: 'Public Infrastructure & Parks',
    title: 'Broken swing set chain at Children Memorial Park',
    description: 'Heavy metal link snapped on swing #3 creating injury hazard for neighborhood kids.',
    ward: 'Ward 14 - North Central District',
    location: 'Ward 14 Community Park, Sector 4',
    status: 'Resolved',
    priority: 'Low',
    submittedAt: 'Aug 28, 2026 • 10:00 AM',
    estimatedResolution: 'Completed in 24 Hours',
    citizenName: 'Citizen Resident (Ward 14)',
    assignedOfficer: {
      name: 'Mr. Vikas Shinde',
      designation: 'Parks Maintenance Supervisor',
      department: 'Horticulture & Parks Dept.',
      phone: '+91 97654 00000 (Demo)'
    },
    timeline: [
      {
        title: 'Complaint Registered',
        timestamp: 'Aug 28, 2026 • 10:00 AM',
        description: 'Ticket logged by resident.',
        completed: true
      },
      {
        title: 'Field Team Repaired & Verified',
        timestamp: 'Aug 29, 2026 • 09:30 AM',
        description: 'New industrial grade swing chain and shackle bolted.',
        completed: true
      }
    ]
  }
};

export const DEMO_CITIZEN_COMPLAINTS: Complaint[] = Object.values(SAMPLE_COMPLAINTS);

export const ALL_MOCK_COMPLAINTS: Complaint[] = Object.values(SAMPLE_COMPLAINTS);

export const DEMO_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'SR-2026-4019',
    serviceType: 'tree-pruning',
    serviceName: 'Overgrown Tree Branch Pruning',
    department: 'Horticulture Department (Demo)',
    scheduledDate: 'Sep 08, 2026',
    address: 'Flat 402, Royal Palms, Sector 14, Ward 14',
    phone: '+91 98765 43210',
    status: 'Scheduled',
    submittedAt: 'Sep 04, 2026',
    estimatedCompletion: 'Sep 08, 2026 by 02:00 PM',
    notes: 'Large banyan branch touching overhead telecom cables near balcony.'
  },
  {
    id: 'SR-2026-3812',
    serviceType: 'fogging',
    serviceName: 'Anti-Dengue Mosquito Thermal Fogging',
    department: 'Public Health Wing (Demo)',
    scheduledDate: 'Sep 02, 2026',
    address: 'Green Meadows Society, Gate 2, Sector 14, Ward 14',
    phone: '+91 98765 43210',
    status: 'Completed',
    submittedAt: 'Aug 30, 2026',
    estimatedCompletion: 'Completed on Sep 02, 2026',
    notes: 'Comprehensive compound fogging completed with larvicide treatment.'
  },
  {
    id: 'SR-2026-2980',
    serviceType: 'water-tanker',
    serviceName: 'Emergency Potable Water Tanker (5000L)',
    department: 'Water Board Supply Wing (Demo)',
    scheduledDate: 'Aug 18, 2026',
    address: 'Block B, Sunrise Apartments, Ward 14',
    phone: '+91 98765 43210',
    status: 'Completed',
    submittedAt: 'Aug 18, 2026',
    estimatedCompletion: 'Completed in 4.5 Hours',
    notes: 'Dispatched 5000L municipal supply tanker due to society pump failure.'
  }
];

export const DEMO_CITIZEN_PROFILE: CitizenProfile = {
  id: 'CIT-2026-8841',
  fullName: 'Resident Citizen',
  email: 'citizen@smartcity.demo',
  phone: '+91 98765 43210',
  ward: 'Ward 14 - North Central District',
  primaryAddress: 'Flat 402, Royal Palms Society, Sector 14, Metro Corridor',
  city: 'Smart City Demo Metropolitan Region',
  joinedDate: 'September 2026',
  avatarUrl: ''
};

export const DEMO_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: 'notif-1',
    title: 'Grievance Resolved: SC-2026-8942',
    message: 'Your complaint regarding "Hazardous deep pothole near Metro Pillar 142" has been resolved by Er. Rajesh Kumar. Before/After proof photos uploaded.',
    timestamp: 'Today at 04:15 AM',
    type: 'status_update',
    isRead: false,
    relatedTicketId: 'SC-2026-8942'
  },
  {
    id: 'notif-2',
    title: 'Service Request Confirmed: SR-2026-4019',
    message: 'Your request for "Overgrown Tree Branch Pruning" has been scheduled for Sep 08, 2026. Field team will call prior to arrival.',
    timestamp: 'Yesterday at 02:30 PM',
    type: 'service_alert',
    isRead: false,
    relatedTicketId: 'SR-2026-4019'
  },
  {
    id: 'notif-3',
    title: 'Officer Assigned to Ticket SC-2026-7821',
    message: 'Sanitation Inspector Ms. Sunita Patil has been assigned to inspect "Overflowing community waste bin at Sector 9 Market".',
    timestamp: 'Today at 12:05 PM',
    type: 'assignment',
    isRead: true,
    relatedTicketId: 'SC-2026-7821'
  },
  {
    id: 'notif-4',
    title: 'Demo Municipal Notice: Water Pipeline Maintenance',
    message: 'Scheduled maintenance in Wards 11, 12, and 15 on Sunday 10 PM to 6 AM. Low pressure expected.',
    timestamp: 'Sep 03, 2026',
    type: 'general',
    isRead: true
  }
];

export const LIVE_RESOLUTIONS = [
  {
    id: 'res-1',
    category: 'Water Supply',
    text: 'Main drinking water pipeline leakage sealed (Demo record)',
    ward: 'Ward 18 (Lakeview)',
    timeAgo: '18 mins ago',
    icon: 'Droplets',
    sla: 'Within SLA'
  },
  {
    id: 'res-2',
    category: 'Street Lighting',
    text: '5 High-Mast LED lights replaced & energized (Demo record)',
    ward: 'Ward 07 (Heritage Quarter)',
    timeAgo: '42 mins ago',
    icon: 'Zap',
    sla: 'Within SLA'
  },
  {
    id: 'res-3',
    category: 'Road Repairs',
    text: '200m asphalt resurfacing & pothole patch completed (Demo record)',
    ward: 'Ward 31 (Tech Park Zone)',
    timeAgo: '1 hour ago',
    icon: 'Hammer',
    sla: 'Superfast'
  },
  {
    id: 'res-4',
    category: 'Sanitation',
    text: 'Special cleanliness drive & green waste collected (Demo record)',
    ward: 'Ward 04 (Civil Lines)',
    timeAgo: '2 hours ago',
    icon: 'Trash2',
    sla: 'Within SLA'
  }
];

export const CITY_NOTICES: CityNotice[] = [
  {
    id: 'n1',
    tag: 'Alert',
    title: 'Demo Notice: 24x7 Monsoon Preparedness Control Desk operational for project demonstration',
    date: 'Sep 05, 2026',
    ward: 'Demo City'
  },
  {
    id: 'n2',
    tag: 'Maintenance',
    title: 'Demo Schedule: Water Supply Pipeline Maintenance simulated in Wards 11, 12, and 15',
    date: 'Sep 06, 2026',
    ward: 'Zone 3'
  },
  {
    id: 'n3',
    tag: 'Drive',
    title: 'Demo Initiative: Zero-Waste Ward Initiative and compost distribution workshop simulation',
    date: 'Sep 08, 2026',
    ward: 'Ward 08'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Snap & Submit',
    subtitle: 'Takes under 60 seconds',
    description: 'Select issue category, capture or attach photo proof, and let your browser pin your simulated GPS location.',
    icon: 'Camera',
    badge: 'Step 1'
  },
  {
    step: '02',
    title: 'Instant Ticket & Routing',
    subtitle: 'Unique Token ID generated',
    description: 'The Smart Citizen engine assigns your request directly to the responsible Ward Nodal Officer with automated SLA countdown.',
    icon: 'Workflow',
    badge: 'Step 2'
  },
  {
    step: '03',
    title: 'Field Team Resolution',
    subtitle: 'Dedicated municipal crews',
    description: 'Simulated city engineering and sanitation crews execute on-ground repairs with verified timestamps.',
    icon: 'Wrench',
    badge: 'Step 3'
  },
  {
    step: '04',
    title: 'Photo Proof & Citizen Rating',
    subtitle: 'Full transparency loop',
    description: 'Receive before/after photos and simulated SMS closure alerts. Rate the municipal work quality or reopen if unsatisfied.',
    icon: 'CheckCircle2',
    badge: 'Step 4'
  }
];

export const CITIZEN_FAQS = [
  {
    question: 'How do I track my complaint without creating an account?',
    answer: 'You can immediately track any grievance by typing your Ticket ID (e.g. SC-2026-8942) into the "Track Complaint" page or search bar at the top of the portal.'
  },
  {
    question: 'What is the maximum time taken to resolve a civic complaint?',
    answer: 'Under the simulated Citizen Charter, standard complaints have an SLA of 24 to 48 hours. Emergency issues like water pipe bursts or open electrical wires are prioritized within 4 hours.'
  },
  {
    question: 'Can I upload photos and geo-locations from my mobile phone?',
    answer: 'Yes! The Smart Citizen portal is fully responsive and supports camera file upload along with browser location tagging.'
  },
  {
    question: 'What happens if a complaint is marked resolved but the work is incomplete?',
    answer: 'Citizens can use the "Re-open Grievance" simulation within 48 hours of resolution to request a supervisor re-inspection.'
  },
  {
    question: 'Is this an official government application?',
    answer: 'No. This website is a Major Academic Project & Prototype demonstrating a modern civic-tech complaint and service delivery architecture. All data, numbers, and officers are simulated demo entries.'
  }
];
