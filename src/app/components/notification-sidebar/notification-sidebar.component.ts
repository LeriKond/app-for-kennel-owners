// notification-sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
    selector: 'app-notification-sidebar',
    templateUrl: './notification-sidebar.component.html',
    styleUrls: ['./notification-sidebar.component.scss']
})
export class NotificationSidebarComponent implements OnInit {
    notifications: Notification[] = [];

    constructor(
        public layoutService: LayoutService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.notificationService.getNotifications().subscribe(
            notifications => this.notifications = notifications
        );
    }

    markAsRead(notification: Notification) {
        if (!notification.isRead) {
            this.notificationService.markAsRead(notification.id);
        }
    }

    getNotificationIcon(type: string): string {
        switch (type) {
            case 'warning': return 'pi-exclamation-triangle';
            case 'error': return 'pi-times-circle';
            default: return 'pi-info-circle';
        }
    }
}
