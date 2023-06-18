import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { BattleComponent } from './components/battle/battle.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'character-selection', component: CharacterSelectionComponent },
  { path: 'character-creation', component: CharacterCreationComponent },
  { path: 'battle', component: BattleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}