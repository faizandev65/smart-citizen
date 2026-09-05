import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Hammer,
  Trash2,
  Droplets,
  Zap,
  Building2,
  ShieldAlert,
  Camera,
  Workflow,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Search,
  PhoneCall,
  FileText,
  User,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
  X,
  Menu,
  Check,
  Eye,
  Send,
  Lock,
  Mail,
  UserCheck,
  Building
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Hammer,
  Trash2,
  Droplets,
  Zap,
  Building2,
  ShieldAlert,
  Camera,
  Workflow,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Search,
  PhoneCall,
  FileText,
  User,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
  X,
  Menu,
  Check,
  Eye,
  Send,
  Lock,
  Mail,
  UserCheck,
  Building
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
};
