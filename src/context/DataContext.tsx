import React, { createContext, useContext, useState } from 'react';
import type {
  Complaint,
  ComplaintStatus,
  PriorityLevel,
  ComplaintCategory,
  ServiceRequest,
  CitizenNotification,
} from '../types';
import {
  ALL_MOCK_COMPLAINTS,
  DEMO_SERVICE_REQUESTS,
  DEMO_NOTIFICATIONS,
} from '../data/mockData';

interface DataContextType {
  complaints: Complaint[];
  serviceRequests: ServiceRequest[];
  notifications: CitizenNotification[];
  addComplaint: (data: {
    title: string;
    category: ComplaintCategory;
    categoryName: string;
    description: string;
    ward: string;
    location: string;
    priority: PriorityLevel;
    citizenName?: string;
    customId?: string;
    beforeImage?: string;
  }) => Complaint;
  updateComplaintStatus: (
    id: string,
    status: ComplaintStatus,
    officerName?: string,
    officerNote?: string
  ) => void;
  getComplaintById: (id: string) => Complaint | undefined;
  addServiceRequest: (data: {
    serviceType: string;
    serviceName: string;
    department: string;
    scheduledDate: string;
    address: string;
    phone: string;
    notes?: string;
  }) => ServiceRequest;
  updateServiceRequestStatus: (
    id: string,
    status: 'Pending Assignment' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
  ) => void;
  getServiceRequestById: (id: string) => ServiceRequest | undefined;
  markAllNotificationsRead: () => void;
  toggleNotificationRead: (id: string) => void;
  addNotification: (notif: {
    title: string;
    message: string;
    type: 'status_update' | 'assignment' | 'service_alert' | 'general';
    relatedTicketId?: string;
  }) => void;
}

const COMPLAINTS_KEY = 'smartcitizen_live_complaints';
const SERVICES_KEY = 'smartcitizen_live_services';
const NOTIFICATIONS_KEY = 'smartcitizen_live_notifications';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize Complaints
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLAINTS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return ALL_MOCK_COMPLAINTS;
  });

  // Initialize Service Requests
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    try {
      const saved = localStorage.getItem(SERVICES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEMO_SERVICE_REQUESTS;
  });

  // Initialize Notifications
  const [notifications, setNotifications] = useState<CitizenNotification[]>(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEMO_NOTIFICATIONS;
  });

  // Sync to localStorage
  const saveComplaints = (items: Complaint[]) => {
    setComplaints(items);
    try {
      localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const saveServices = (items: ServiceRequest[]) => {
    setServiceRequests(items);
    try {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const saveNotifications = (items: CitizenNotification[]) => {
    setNotifications(items);
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const addNotification = (notif: {
    title: string;
    message: string;
    type: 'status_update' | 'assignment' | 'service_alert' | 'general';
    relatedTicketId?: string;
  }) => {
    const newNotif: CitizenNotification = {
      id: 'notif-' + Date.now(),
      title: notif.title,
      message: notif.message,
      timestamp: 'Just now',
      type: notif.type,
      isRead: false,
      relatedTicketId: notif.relatedTicketId,
    };
    saveNotifications([newNotif, ...notifications]);
  };

  // --- Complaint Actions ---
  const addComplaint = (data: {
    title: string;
    category: ComplaintCategory;
    categoryName: string;
    description: string;
    ward: string;
    location: string;
    priority: PriorityLevel;
    citizenName?: string;
    customId?: string;
    beforeImage?: string;
  }): Complaint => {
    const newId = data.customId || `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = `Today at ${timeStr}`;

    const newComplaint: Complaint = {
      id: newId,
      title: data.title.trim(),
      category: data.category,
      categoryName: data.categoryName,
      description: data.description.trim(),
      ward: data.ward,
      location: data.location.trim() || 'Sector 14 Municipal Area',
      priority: data.priority,
      status: 'Submitted',
      submittedAt: formattedDate,
      estimatedResolution: data.priority === 'Emergency' ? 'Within 6 Hours' : data.priority === 'High' ? 'Within 24 Hours' : 'Within 48 Hours',
      citizenName: data.citizenName?.trim() || 'Resident Citizen',
      beforeImage: data.beforeImage,
      timeline: [
        {
          title: 'Grievance Registered',
          timestamp: `Today • ${timeStr}`,
          description: 'Ticket successfully logged and queued for Ward Nodal verification.',
          completed: true,
        },
        {
          title: 'Field Officer Assignment',
          timestamp: 'Pending SLA Assignment',
          description: 'Municipal engineering officer being dispatched.',
          completed: false,
        },
        {
          title: 'On-Ground Repair / Redressal',
          timestamp: 'Pending Work Order',
          description: 'Field crew assigned to complete on-site repair.',
          completed: false,
        },
        {
          title: 'Photo Verification & Resolved',
          timestamp: 'Pending Final Inspection',
          description: 'Closure audit and citizen feedback verification.',
          completed: false,
        },
      ],
    };

    const updated = [newComplaint, ...complaints];
    saveComplaints(updated);

    // Also add notification for citizen
    addNotification({
      title: `Grievance Logged: ${newId}`,
      message: `Your complaint "${data.title}" has been registered in ${data.ward}. Reference Token: ${newId}`,
      type: 'general',
      relatedTicketId: newId,
    });

    return newComplaint;
  };

  const updateComplaintStatus = (
    id: string,
    status: ComplaintStatus,
    officerName?: string,
    officerNote?: string
  ) => {
    const updated = complaints.map((c) => {
      if (c.id.toLowerCase() !== id.toLowerCase()) return c;

      const defaultOfficer = officerName || c.assignedOfficer?.name || 'Er. Rajesh Kumar';
      const assignedOfficerObj = c.assignedOfficer || {
        name: defaultOfficer,
        designation: 'Senior Assistant Engineer',
        department: 'Ward Grievance Redressal Division',
        phone: '+91 98765 00000 (Official)',
      };

      // Update timeline steps based on status
      const newTimeline = [...c.timeline];
      if (status === 'Officer Assigned') {
        newTimeline[1] = {
          ...newTimeline[1],
          completed: true,
          timestamp: 'Today • Assigned',
          officer: defaultOfficer,
          description: officerNote || `Assigned to ${defaultOfficer} for site inspection.`,
        };
      } else if (status === 'In Progress') {
        newTimeline[1] = { ...newTimeline[1], completed: true };
        newTimeline[2] = {
          ...newTimeline[2],
          completed: true,
          timestamp: 'Today • Work In Progress',
          description: officerNote || 'Repair crew dispatched with on-ground work order.',
        };
      } else if (status === 'Resolved' || status === 'Closed') {
        newTimeline[1] = { ...newTimeline[1], completed: true };
        newTimeline[2] = { ...newTimeline[2], completed: true };
        newTimeline[3] = {
          ...newTimeline[3],
          completed: true,
          timestamp: 'Today • Verified & Closed',
          description: officerNote || 'Civic redressal verified with photo audit.',
        };
      }

      return {
        ...c,
        status,
        assignedOfficer: assignedOfficerObj,
        timeline: newTimeline,
      };
    });

    saveComplaints(updated);

    // Notify citizen
    addNotification({
      title: `Grievance Status Updated: ${id}`,
      message: `Ticket #${id} status changed to "${status}". ${officerNote || 'Inspect details in your citizen dashboard.'}`,
      type: 'status_update',
      relatedTicketId: id,
    });
  };

  const getComplaintById = (id: string): Complaint | undefined => {
    const trimmed = id.trim().toLowerCase();
    return complaints.find((c) => c.id.toLowerCase() === trimmed);
  };

  // --- Service Request Actions ---
  const addServiceRequest = (data: {
    serviceType: string;
    serviceName: string;
    department: string;
    scheduledDate: string;
    address: string;
    phone: string;
    notes?: string;
  }): ServiceRequest => {
    const newId = `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: ServiceRequest = {
      id: newId,
      serviceType: data.serviceType,
      serviceName: data.serviceName,
      department: data.department,
      scheduledDate: data.scheduledDate,
      address: data.address,
      phone: data.phone,
      status: 'Scheduled',
      submittedAt: 'Today',
      estimatedCompletion: `${data.scheduledDate} by 04:00 PM`,
      notes: data.notes,
    };

    const updated = [newRequest, ...serviceRequests];
    saveServices(updated);

    addNotification({
      title: `Service Booking Confirmed: ${newId}`,
      message: `Your booking for "${data.serviceName}" is scheduled on ${data.scheduledDate}. Work order: ${newId}`,
      type: 'service_alert',
    });

    return newRequest;
  };

  const updateServiceRequestStatus = (
    id: string,
    status: 'Pending Assignment' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
  ) => {
    const updated = serviceRequests.map((r) =>
      r.id.toLowerCase() === id.toLowerCase() ? { ...r, status } : r
    );
    saveServices(updated);

    addNotification({
      title: `Service Work Order Updated: ${id}`,
      message: `Work order #${id} is now "${status}".`,
      type: 'service_alert',
    });
  };

  const getServiceRequestById = (id: string): ServiceRequest | undefined => {
    const trimmed = id.trim().toLowerCase();
    return serviceRequests.find((r) => r.id.toLowerCase() === trimmed);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    saveNotifications(updated);
  };

  const toggleNotificationRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, isRead: !n.isRead } : n
    );
    saveNotifications(updated);
  };

  return (
    <DataContext.Provider
      value={{
        complaints,
        serviceRequests,
        notifications,
        addComplaint,
        updateComplaintStatus,
        getComplaintById,
        addServiceRequest,
        updateServiceRequestStatus,
        getServiceRequestById,
        markAllNotificationsRead,
        toggleNotificationRead,
        addNotification,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
