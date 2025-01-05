import { Component, OnInit  } from '@angular/core';

interface UserProfile {
    email: string;
    breederName: string;
    phoneNumber: string;
    password: string;
    firstName: string;
    lastName: string;
    breederNumber: string;
}

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
    userProfile: UserProfile = {
        email: 'example@breedersbest.com',
        breederName: 'Звёздный питомник',
        phoneNumber: '+7 (900) 123-45-67',
        password: '********',
        firstName: 'Иван',
        lastName: 'Петров',
        breederNumber: '12345',
    };

    constructor() {}

    ngOnInit(): void {
        // Здесь можно загрузить данные из сервиса, если потребуется
    }

    editProfile() {
        console.log('Редактирование профиля...');
        // Реализуйте редактирование профиля пользователя
    }
}
