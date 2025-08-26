import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { NotesComponent } from './notes/notes';
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: NotesComponent, canActivate: [AuthGuard] },
];
