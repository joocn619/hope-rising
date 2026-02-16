import { db } from "./client";
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    addDoc,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    Timestamp
} from "firebase/firestore";
import { UserProfile, UrgeLog, JournalEntry } from "@/types/firestore";

// User Profile Helpers
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
    } else {
        return null;
    }
}

export async function createUserProfile(uid: string, email: string, data: Partial<UserProfile> = {}) {
    const userRef = doc(db, "users", uid);
    const initialProfile: UserProfile = {
        uid,
        email,
        createdAt: Timestamp.now(),
        lastLogin: Timestamp.now(),
        streak: 0,
        longestStreak: 0,
        lastRelapseDate: null,
        totalUrgesLogged: 0,
        whyQuit: "",
        frequencyLevel: "daily", // Default, updated in onboarding
        mainTriggers: [],
        starter7CurrentDay: 1,
        points: 0,
        rankLevel: "Novice",
        settings: {
            notifications: true,
            theme: "dark",
            isPro: false
        },
        ...data
    };

    await setDoc(userRef, initialProfile, { merge: true });
    return initialProfile;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
}

export async function checkAndUpdateStreak(uid: string) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data() as UserProfile;

        // Default to a safe past date if lastRelapseDate is missing (e.g., createdAt or now)
        // If lastRelapseDate is null, it might mean they haven't relapsed since creating account.
        // We'll calculate from createdAt in that case.
        const startDate = userData.lastRelapseDate ? userData.lastRelapseDate.toDate() : userData.createdAt.toDate();
        const now = new Date();

        // Calculate difference in days
        const diffTime = Math.abs(now.getTime() - startDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Only update if the calculated streak is different (and strictly arguably greater or equal, but let's trust the calc)
        // Note: This logic assumes 'streak' is strictly 'days clean'. 
        if (userData.streak !== diffDays) {
            let updates: Partial<UserProfile> = {
                streak: diffDays
            };

            // Check for new High Score
            if (diffDays > (userData.longestStreak || 0)) {
                updates.longestStreak = diffDays;
            }

            // Award daily points? Matches spec "Clean Day: +10 Points".
            // Implementation detail: To avoid spamming points on every page load, we'd need a 'lastPointsAwardedDate'.
            // For MVP/Free version, we might skip the points auto-add or simplisticly add it. 
            // Let's stick to just updating the streak visuals for now to ensure data accuracy.

            await updateDoc(userRef, updates);
            return { ...userData, ...updates };
        }
        return userData;
    }
    return null;
}

// Urge Log Helpers
export async function addUrgeLog(log: Omit<UrgeLog, "id">) {
    const logsRef = collection(db, "urge_logs");
    const newLog = {
        ...log,
        createdAt: log.createdAt || Timestamp.now()
    };
    const docRef = await addDoc(logsRef, newLog);

    // Update User Stats
    const userRef = doc(db, "users", log.userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data() as UserProfile;

        let updates: Partial<UserProfile> = {
            totalUrgesLogged: (userData.totalUrgesLogged || 0) + 1,
            points: (userData.points || 0) + 5 // +5 points for logging
        };

        if (log.actedOut) {
            // RELAPSE LOGIC
            updates.streak = 0;
            updates.lastRelapseDate = Timestamp.now();
        } else {
            // VICTORY LOGIC (Streak isn't incremented here, it's calculated daily, but we could add logic)
            // Points for resisting? Maybe handled elsewhere.
        }

        await updateDoc(userRef, updates);
    }

    return docRef.id;
}

export async function getRecentUrges(userId: string, limitCount = 7) {
    const logsRef = collection(db, "urge_logs");
    const q = query(
        logsRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UrgeLog));
}

// Journal Helpers
export async function addJournalEntry(entry: Omit<JournalEntry, "id" | "createdAt">) {
    const journalRef = collection(db, "journal_entries");
    const newEntry = {
        ...entry,
        createdAt: Timestamp.now()
    };
    const docRef = await addDoc(journalRef, newEntry);

    // Update Points
    const userRef = doc(db, "users", entry.userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data() as UserProfile;
        await updateDoc(userRef, {
            points: (userData.points || 0) + 15 // +15 points for journaling
        });
    }

    return docRef.id;
}

export async function getJournalEntries(userId: string, limitCount = 10) {
    const journalRef = collection(db, "journal_entries");
    const q = query(
        journalRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JournalEntry));
}

export async function getCombinedStats(userId: string) {
    const urgeLogs = await getRecentUrges(userId, 100); // Fetch last 100 for stats
    const journalEntries = await getJournalEntries(userId, 100);

    // Calculate Relapses
    const relapseCount = urgeLogs.filter(log => log.actedOut).length;
    const victoryCount = urgeLogs.filter(log => !log.actedOut).length;

    // Calculate Triggers
    const triggers: Record<string, number> = {};
    urgeLogs.forEach(log => {
        if (log.triggerType) {
            triggers[log.triggerType] = (triggers[log.triggerType] || 0) + 1;
        }
    });

    // Sort Triggers
    const topTriggers = Object.entries(triggers)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Activity by Time of Day
    const timeOfDay: Record<string, number> = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    urgeLogs.forEach(log => {
        if (log.timeOfDay && timeOfDay[log.timeOfDay] !== undefined) {
            timeOfDay[log.timeOfDay]++;
        }
    });

    // Calculate Daily Activity (Last 7 Days)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyActivity = Array(7).fill(0).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i)); // Go back 6, 5, ... 0 days
        const dayName = days[d.getDay()];

        // Count urges for this day
        const count = urgeLogs.filter(log => {
            const logDate = log.createdAt.toDate();
            return logDate.getDate() === d.getDate() &&
                logDate.getMonth() === d.getMonth() &&
                logDate.getFullYear() === d.getFullYear();
        }).length;

        return { name: dayName, urges: count };
    });

    return {
        totalUrges: urgeLogs.length,
        relapses: relapseCount,
        victories: victoryCount,
        journalCount: journalEntries.length,
        topTriggers,
        timeOfDay: [
            { name: 'Morning', value: timeOfDay.morning },
            { name: 'Afternoon', value: timeOfDay.afternoon },
            { name: 'Evening', value: timeOfDay.evening },
            { name: 'Night', value: timeOfDay.night },
        ],
        dailyActivity
    };
}

// Program Helpers
export async function completeProgramDay(userId: string, dayNumber: number) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data() as UserProfile;

        if (userData.starter7CurrentDay !== dayNumber) {
            console.warn("User tried to complete a day out of order");
            return;
        }

        await updateDoc(userRef, {
            starter7CurrentDay: dayNumber + 1,
            points: (userData.points || 0) + 50 // +50 XP for completing a lesson
        });
    }
}

export async function completeTransformationDay(userId: string, dayNumber: number) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data() as UserProfile;
        const currentDay = userData.transformationCurrentDay || 1;

        if (currentDay !== dayNumber) {
            console.warn("User tried to complete a day out of order");
            return;
        }

        await updateDoc(userRef, {
            transformationCurrentDay: dayNumber + 1,
            points: (userData.points || 0) + 100 // +100 XP for Pro lessons
        });
    }
}
