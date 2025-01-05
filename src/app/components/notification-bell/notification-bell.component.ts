import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import {LayoutService} from "../../layout/service/app.layout.service";

@Component({
    selector: 'app-notification-bell',
    templateUrl: 'notification-bell.component.html',
    styleUrl: 'notification-bell.component.scss'
})
export class NotificationBellComponent implements OnInit {
    unreadCount: number = 0;

    constructor(
        private notificationService: NotificationService,
        private layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.notificationService.getUnreadCount().subscribe(
            count => this.unreadCount = count
        );
    }

    toggleNotificationSidebar() {
        this.layoutService.showNotificationSidebar();
    }
}
