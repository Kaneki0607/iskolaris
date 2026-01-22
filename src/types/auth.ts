export type UserRole = 'student' | 'teacher' | 'parent' | 'schooladmin';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    name?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
