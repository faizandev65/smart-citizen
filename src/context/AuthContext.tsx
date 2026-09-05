import React, { createContext, useContext, useState } from 'react';
import type { CitizenProfile, AdminProfile } from '../types';

interface AuthContextType {
  // Citizen state
  currentCitizen: CitizenProfile | null;
  savedUser: CitizenProfile | null;
  isAuthenticated: boolean;
  registerCitizen: (data: {
    fullName: string;
    email: string;
    phone: string;
    ward: string;
    address: string;
    avatarUrl?: string;
  }) => CitizenProfile;
  loginCitizen: (identifier?: string) => CitizenProfile;
  updateCitizenProfile: (updates: Partial<CitizenProfile>) => void;
  logoutCitizen: () => void;

  // Admin state (completely separated from citizen)
  currentAdmin: AdminProfile | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (idOrEmail: string, pass: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
}

const CITIZEN_SESSION_KEY = 'smartcitizen_demo_session';
const CITIZEN_SAVED_KEY = 'smartcitizen_demo_user';
const ADMIN_SESSION_KEY = 'smartcitizen_admin_session';

// Internal Admin Credentials (Simulated authentication check)
const ADMIN_AUTH_CREDENTIALS = {
  validIdentifiers: ['admin@smartcitizen.demo', 'sc-admin-01', 'admin'],
  password: 'SmartCitizen@Admin2026',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read active citizen session from localStorage
  const [currentCitizen, setCurrentCitizen] = useState<CitizenProfile | null>(() => {
    try {
      const savedSession = localStorage.getItem(CITIZEN_SESSION_KEY);
      if (savedSession) {
        return JSON.parse(savedSession);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Read saved registered citizen
  const [savedUser, setSavedUser] = useState<CitizenProfile | null>(() => {
    try {
      const saved = localStorage.getItem(CITIZEN_SAVED_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Read active admin session from localStorage
  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile | null>(() => {
    try {
      const savedAdmin = localStorage.getItem(ADMIN_SESSION_KEY);
      if (savedAdmin) {
        const parsed = JSON.parse(savedAdmin);
        // Normalize any old or mock identities to the Project Administrator
        if (
          parsed &&
          (parsed.fullName === 'Dr. Rajeshwar Varma' ||
            parsed.fullName === 'Municipal Administrator' ||
            parsed.designation === 'Municipal Administrator' ||
            !parsed.fullName)
        ) {
          parsed.fullName = 'Md Faizan Mustafa';
          parsed.role = 'Project Administrator';
          parsed.designation = 'Project Administrator';
          parsed.department = 'SmartCitizen — Academic Major Project';
          parsed.badgeId = 'PROJ-ADM-2026';
          localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  });

  // --- Citizen Handlers ---
  const registerCitizen = (data: {
    fullName: string;
    email: string;
    phone: string;
    ward: string;
    address: string;
    avatarUrl?: string;
  }): CitizenProfile => {
    const randomId = 'CIT-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newCitizen: CitizenProfile = {
      id: randomId,
      fullName: data.fullName.trim() || 'Registered Citizen',
      email: data.email.trim() || 'citizen@smartcity.demo',
      phone: data.phone.trim() || '+91 98765 43210',
      ward: data.ward || 'Ward 14 - North Central District',
      primaryAddress: data.address.trim() || 'Smart City Residential Area',
      city: 'Smart Municipal Corporation Area',
      joinedDate: 'September 2026',
      avatarUrl: data.avatarUrl?.trim() || '',
    };

    try {
      localStorage.setItem(CITIZEN_SAVED_KEY, JSON.stringify(newCitizen));
      localStorage.setItem(CITIZEN_SESSION_KEY, JSON.stringify(newCitizen));
    } catch {
      // ignore
    }

    setSavedUser(newCitizen);
    setCurrentCitizen(newCitizen);
    return newCitizen;
  };

  const loginCitizen = (identifier?: string): CitizenProfile => {
    const idStr = identifier?.trim() || '';
    let profileToUse = savedUser;

    // If identifier is provided and differs from savedUser, create/switch to a profile matching the identifier
    if (idStr && savedUser) {
      const isMatch =
        (savedUser.email && savedUser.email.toLowerCase() === idStr.toLowerCase()) ||
        (savedUser.phone && savedUser.phone.replace(/\D/g, '') === idStr.replace(/\D/g, ''));

      if (!isMatch) {
        const isEmail = idStr.includes('@');
        const generatedName = isEmail
          ? idStr.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
          : 'Resident Citizen';

        profileToUse = {
          id: 'CIT-2026-' + Math.floor(1000 + Math.random() * 9000),
          fullName: generatedName || 'Resident Citizen',
          email: isEmail ? idStr : 'citizen@smartcity.demo',
          phone: !isEmail && idStr.length >= 10 ? idStr : '+91 98765 43210',
          ward: 'Ward 14 - North Central District',
          primaryAddress: 'Flat 402, Royal Palms Society, Sector 14',
          city: 'Smart Municipal Corporation Area',
          joinedDate: 'September 2026',
          avatarUrl: '',
        };
        try {
          localStorage.setItem(CITIZEN_SAVED_KEY, JSON.stringify(profileToUse));
        } catch {
          // ignore
        }
        setSavedUser(profileToUse);
      }
    } else if (!profileToUse) {
      const isEmail = idStr.includes('@');
      const generatedName = isEmail
        ? idStr.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
        : 'Resident Citizen';

      profileToUse = {
        id: 'CIT-2026-' + Math.floor(1000 + Math.random() * 9000),
        fullName: generatedName || 'Resident Citizen',
        email: isEmail ? idStr : 'citizen@smartcity.demo',
        phone: !isEmail && idStr.length >= 10 ? idStr : '+91 98765 43210',
        ward: 'Ward 14 - North Central District',
        primaryAddress: 'Flat 402, Royal Palms Society, Sector 14',
        city: 'Smart Municipal Corporation Area',
        joinedDate: 'September 2026',
        avatarUrl: '',
      };

      try {
        localStorage.setItem(CITIZEN_SAVED_KEY, JSON.stringify(profileToUse));
      } catch {
        // ignore
      }
      setSavedUser(profileToUse);
    }

    const finalProfile: CitizenProfile = profileToUse || {
      id: 'CIT-2026-' + Math.floor(1000 + Math.random() * 9000),
      fullName: 'Resident Citizen',
      email: 'citizen@smartcity.demo',
      phone: '+91 98765 43210',
      ward: 'Ward 14 - North Central District',
      primaryAddress: 'Flat 402, Royal Palms Society, Sector 14',
      city: 'Smart Municipal Corporation Area',
      joinedDate: 'September 2026',
      avatarUrl: '',
    };

    try {
      localStorage.setItem(CITIZEN_SESSION_KEY, JSON.stringify(finalProfile));
    } catch {
      // ignore
    }

    setCurrentCitizen(finalProfile);
    return finalProfile;
  };

  const updateCitizenProfile = (updates: Partial<CitizenProfile>) => {
    if (!currentCitizen) return;
    const updated = { ...currentCitizen, ...updates };
    setCurrentCitizen(updated);
    try {
      localStorage.setItem(CITIZEN_SESSION_KEY, JSON.stringify(updated));
      localStorage.setItem(CITIZEN_SAVED_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const logoutCitizen = () => {
    try {
      localStorage.removeItem(CITIZEN_SESSION_KEY);
    } catch {
      // ignore
    }
    setCurrentCitizen(null);
  };

  // --- Admin Handlers (Separate & Protected) ---
  const loginAdmin = (idOrEmail: string, pass: string): { success: boolean; error?: string } => {
    const rawInput = idOrEmail.trim();
    const trimmedId = rawInput.toLowerCase();

    // Check credentials against internal admin authentication
    if (ADMIN_AUTH_CREDENTIALS.validIdentifiers.includes(trimmedId) && pass === ADMIN_AUTH_CREDENTIALS.password) {
      const adminProfile: AdminProfile = {
        id: 'ADM-PROJ-2026',
        email: rawInput.includes('@') ? rawInput : 'faizan.mustafa@smartcitizen.demo',
        fullName: 'Md Faizan Mustafa',
        designation: 'Project Administrator',
        department: 'SmartCitizen — Academic Major Project',
        badgeId: 'PROJ-ADM-2026',
        role: 'Project Administrator',
      };

      try {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminProfile));
      } catch {
        // ignore
      }

      setCurrentAdmin(adminProfile);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid Admin credentials. Please check your Admin ID and password.',
    };
  };

  const logoutAdmin = () => {
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
    setCurrentAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        // Citizen
        currentCitizen,
        savedUser,
        isAuthenticated: !!currentCitizen,
        registerCitizen,
        loginCitizen,
        updateCitizenProfile,
        logoutCitizen,

        // Admin
        currentAdmin,
        isAdminAuthenticated: !!currentAdmin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
