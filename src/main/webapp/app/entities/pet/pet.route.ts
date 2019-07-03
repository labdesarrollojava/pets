import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pet } from 'app/shared/model/pet.model';
import { PetService } from './pet.service';
import { PetComponent } from './pet.component';
import { PetDetailComponent } from './pet-detail.component';
import { PetUpdateComponent } from './pet-update.component';
import { PetDeletePopupComponent } from './pet-delete-dialog.component';
import { IPet } from 'app/shared/model/pet.model';
import { IOwner, Owner } from 'app/shared/model/owner.model';
import { OwnerService } from 'app/entities/owner/owner.service';

@Injectable({ providedIn: 'root' })
export class PetResolve implements Resolve<IPet> {
  constructor(private service: PetService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPet> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Pet>) => response.ok),
        map((pet: HttpResponse<Pet>) => pet.body)
      );
    }
    return of(new Pet());
  }
}

@Injectable({ providedIn: 'root' })
export class OwnerResolve implements Resolve<IOwner> {
  constructor(private service: OwnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['ownerId'] ? route.params['ownerId'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Owner>) => response.ok),
        map((owner: HttpResponse<Owner>) => owner.body)
      );
    }
    return of(new Owner());
  }
}

export const petRoute: Routes = [
  {
    path: '',
    component: PetComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'petsApp.pet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PetDetailComponent,
    resolve: {
      pet: PetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'petsApp.pet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },

  {
    // path: 'pet/new/:ownerId',
    path: 'new/:ownerId',
    component: PetUpdateComponent,
    resolve: {
      pet: PetResolve,
      owner: OwnerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'petsApp.pet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'new',
    component: PetUpdateComponent,
    resolve: {
      pet: PetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'petsApp.pet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PetUpdateComponent,
    resolve: {
      pet: PetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'petsApp.pet.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const petPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PetDeletePopupComponent,
    resolve: {
      pet: PetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'petsApp.pet.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
