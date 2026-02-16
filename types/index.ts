export type PlanType = 'free' | 'pro';

export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    plan_type: PlanType;
    streak_count: number;
    why_quit?: string;
    current_7day_day: number; // 1-7
    current_30day_day: number; // 1-30
    total_relapses: number;
    created_at: string;
}

export interface UrgeLog {
    id: string;
    user_id: string;
    trigger: string;
    intensity: number; // 1-10
    acted_out: boolean;
    note?: string;
    created_at: string;
}

export interface JournalEntry {
    id: string;
    user_id: string;
    title: string;
    content: string;
    created_at: string;
}

export interface ProgramProgress {
    id: string;
    user_id: string;
    program_type: '7day' | '30day';
    current_day: number;
    completed_days: number[];
    updated_at: string;
}

export interface DailyContent {
    day: number;
    title: string;
    content: string;
    action_task: string;
    program_type: '7day' | '30day';
}

export interface DashboardStats {
    current_streak: number;
    program_progress: number;
    urges_today: number;
}
