export interface Notification {
    id: string,
    user: string,
    eventName: string,
    description: string,
    date?: string,
    read: boolean
}