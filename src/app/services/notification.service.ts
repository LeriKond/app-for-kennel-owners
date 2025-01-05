import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    type: 'info' | 'warning' | 'error';
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notifications = new BehaviorSubject<Notification[]>([]);
    private unreadCount = new BehaviorSubject<number>(0);

    // constructor(private http: HttpClient) {}

    constructor(private http: HttpClient) {
        // Инициализируем моковыми данными, пока нет API
        const mockData: Notification[] = [
            {
                id: 1,
                title: "Новое сообщение",
                message: "У вас новое сообщение от администратора",
                timestamp: new Date(),
                isRead: false,
                type: "info"
            },
            {
                id: 2,
                title: "Внимание!",
                message: "Необходимо обновить данные профиля",
                timestamp: new Date(),
                isRead: false,
                type: "warning"
            },
            {
                id: 3,
                title: "Ошибка системы",
                message: "Произошла ошибка при сохранении данных",
                timestamp: new Date(),
                isRead: true,
                type: "error"
            }
        ];

        this.notifications.next(mockData);
        this.updateUnreadCount();
    }

    private loadNotifications() {
        // В реальном приложении здесь был бы API endpoint
        this.http.get<Notification[]>('assets/demo/data/mock-notifications.json')
            .subscribe(notifications => {
                this.notifications.next(notifications);
                this.updateUnreadCount();
            });
    }

    getNotifications(): Observable<Notification[]> {
        return this.notifications.asObservable();
    }

    getUnreadCount(): Observable<number> {
        return this.unreadCount.asObservable();
    }

    markAsRead(id: number) {
        const currentNotifications = this.notifications.value;
        const updatedNotifications = currentNotifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        );
        this.notifications.next(updatedNotifications);
        this.updateUnreadCount();
    }

    private updateUnreadCount() {
        const count = this.notifications.value.filter(n => !n.isRead).length;
        this.unreadCount.next(count);
    }
}
