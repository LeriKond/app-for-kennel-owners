import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
        // canActivate: [NoAuthGuard], // Защита от доступа для авторизованных пользователей
    },
    {
        path: '',
        component: AppLayoutComponent,
        // canActivate: [AuthGuard], // Защита только для авторизованных пользователей
        children: [
            // Главная страница (например, дашборд)
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
            },
            {
                path: 'litters',
                loadChildren: () => import('./pages/puppies/litters/littersdemo.module').then(m => m.LittersDemoModule),
                data: { menuItem: 'litters' }
            },
            // Страница списка собак и деталей
            {
                path: 'dogs',
                loadChildren: () => import('./pages/dogs/dogs.module').then(m => m.DogsModule),
            },
            // Страница профиля пользователя
            {
                path: 'profile',
                loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
            },
        ],
    },

    // Перенаправление на главную страницу для неизвестных маршрутов
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
