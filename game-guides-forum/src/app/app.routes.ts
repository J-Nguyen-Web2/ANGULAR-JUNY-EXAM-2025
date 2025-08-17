import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [

    {
        path:'', redirectTo:'home', pathMatch:'full'
    },
    {
        path:'home',
        loadComponent:() => import('./features/public/home/home').then(component => component.Home)
    },
    {
        path:'lore',
        loadComponent:() => import('./features/public/lore/lore').then(component => component.Lore)
    },
    {
        path:'characters',
        loadComponent:() => import('./features/public/character-board/character-board').then(component => component.CharacterBoard)
    },
    {
        path:'login',
        loadComponent:() => import('./features/auth/login/login').then(component => component.Login)
    },
    {
        path:'register',
        loadComponent:() => import('./features/auth/register/register').then(component => component.Register)
    },
    {
        path:'profile',
        loadComponent:() => import('./features/private/profile/profile').then(component => component.Profile)
    },
    {
        path:'create',
        loadComponent:() => import('./features/private/create-guide/create-guide').then(component => component.CreateGuide)
    },
    {
        path:'catalog',
        loadComponent:() => import('./features/public/catalog/catalog').then(component => component.Catalog)
    },
    {
        path:'catalog/:themeId',
        loadComponent:() => import('./features/public/guide-content/guide-content').then(component => component.GuideContent)
    },
    {
        path: '**',
        component: NotFound
    }
    
];
