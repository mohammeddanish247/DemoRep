export interface IProducts {
    name: string;
    path : string;
    productValue: number;
    img: string;
}

export interface IAppointmentData {
    ClusterAppointmentEndTime: string
    ClusterAppointmentId: number
    ClusterAppointmentStartTime: string
    // ClusterAppointmentSubject: string
    // ContactCount: number
    // FirstName: string
    // FixedRate: number
    // MaxJobs: number
    // SSDate: string
    // SurName: string
    // TotalJobsForAppointment: number
    // TypeName: string
}

export interface IbookingInfo {
    Address: string
    BookingStatus: string
    ClaimID: string
    ContactCount: number
    ContactName: string
    ContactPhone: string
    EngineerAllocatedForDate: string
    HomePhone: string
    JobID: string
    Phone: string
    PostCode: string
    ServiceDueDate:string
    Title: string
    statusid: string
}