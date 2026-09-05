export type ComplaintCategory = 
  | 'roads' 
  | 'sanitation' 
  | 'water' 
  | 'electricity' 
  | 'infrastructure' 
  | 'health' 
  | 'other';

export type ComplaintStatus = 'Submitted' | 'In Review' | 'Officer Assigned' | 'In Progress' | 'Resolved' | 'Closed';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Emergency';

export interface ComplaintTrackingStep {
  title: string;
  timestamp: string;
  description: string;
  completed: boolean;
  officer?: string;
  designation?: string;
}

export interface Complaint {
  id: string;
  category: ComplaintCategory;
  categoryName: string;
  title: string;
  description: string;
  ward: string;
  location: string;
  status: ComplaintStatus;
  priority: PriorityLevel;
  submittedAt: string;
  estimatedResolution: string;
  citizenName: string;
  assignedOfficer?: {
    name: string;
    designation: string;
    department: string;
    phone: string;
  };
  timeline: ComplaintTrackingStep[];
  beforeImage?: string;
  afterImage?: string;
}

export interface ServiceRequest {
  id: string;
  serviceType: string;
  serviceName: string;
  department: string;
  scheduledDate: string;
  address: string;
  phone: string;
  status: 'Pending Assignment' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  submittedAt: string;
  estimatedCompletion: string;
  notes?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  category: ComplaintCategory;
  slaHours: string;
  avgRating: number;
  popularIssues: string[];
  department: string;
}

export interface CivicStat {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  change: string;
  isPositive: boolean;
  description: string;
}

export interface CityNotice {
  id: string;
  title: string;
  tag: 'Alert' | 'Update' | 'Maintenance' | 'Drive';
  date: string;
  ward?: string;
}

export interface CitizenNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'status_update' | 'assignment' | 'service_alert' | 'general';
  isRead: boolean;
  relatedTicketId?: string;
}

export interface CitizenProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  ward: string;
  primaryAddress: string;
  city: string;
  joinedDate: string;
  avatarUrl?: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  fullName: string;
  designation: string;
  department: string;
  badgeId: string;
  role: string;
}
