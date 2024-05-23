import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable, filter, map } from 'rxjs';
import { IUser } from './pages/users/models';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }

  authUser$: Observable<IUser[] | null>;
  routeData$: Observable<Data | undefined>;
  
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store,
              private route: ActivatedRoute
  ){
    this.authUser$ = this.store.select(selectAuthUser);
    this.routeData$ = router.events.pipe(
      filter((ev) => ev instanceof NavigationEnd),
      map(() => route.firstChild?.snapshot.data)
    );
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
