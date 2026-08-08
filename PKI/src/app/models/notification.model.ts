export interface Notification {
    id: string,
    admin: string,
    username: string,
    eventName: string,
    description: string,
    date?: string,
    read: boolean
}