export type Attendance = 'accepted' | 'rejected';

export interface RSVPFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    attendance: Attendance;
    guestNumber: number;
    message: string;
}

export interface RSVPResponse {
    success: boolean;
    message: string;
    rsvp?: {
        id: number;
        fullName: string;
        email: string | null;
        phoneNumber: string | null;
        attendance: Attendance;
        guestNumber: number;
        message: string | null;
        createdAt: Date;
    };
}