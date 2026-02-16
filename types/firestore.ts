export interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    createdAt: any; // Firestore Timestamp
    lastLogin: any; // Firestore Timestamp

    // Recovery Stats
    streak: number;
    longestStreak: number;
    lastRelapseDate: any | null; // Firestore Timestamp or null
    totalUrgesLogged: number;

    // Onboarding Data
    whyQuit: string;
    frequencyLevel: 'daily' | 'weekly' | 'monthly' | 'rarely';
    mainTriggers: string[];
    motivationText?: string;

    // Commitment
    commitmentStatement?: string;
    commitmentCreatedAt?: any; // Firestore Timestamp

    // Progress
    starter7CurrentDay: number; // 1-7
    transformationCurrentDay?: number; // 1-30
    points: number;
    rankLevel: string; // 'Novice', 'Apprentice', etc.

    // Settings
    settings: {
        notifications: boolean;
        theme: 'dark' | 'light' | 'system';
        isPro: boolean;
    };
}

export interface UrgeLog {
    id?: string;
    userId: string;
    urgeLevel: number; // 1-10
    triggerType: string;
    actedOut: boolean;
    notes?: string;
    createdAt: any; // Firestore Timestamp
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    hourOfDay?: number; // 0-23
    dayOfWeek?: number; // 0-6 (Sun-Sat)
    durationMinutes?: number;
    emotionalState?: string; // Hungry, Angry, Lonely, Tired, Bored, Stressed
}

export interface JournalEntry {
    id?: string;
    userId: string;
    title: string;
    body: string;
    moodScore: number; // 1-5
    tags: string[];
    createdAt: any; // Firestore Timestamp
    aiFeedback?: string; // For future Pro feature
}

export interface ChallengeTask {
    id: string;
    type: 'starter7';
    dayNumber: number;
    title: string;
    description: string;
    actionItem: string;
    isCompleted?: boolean; // Client-side hydration
}
