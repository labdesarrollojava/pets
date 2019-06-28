import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPet } from 'app/shared/model/pet.model';
import { AccountService } from 'app/core';
import { PetService } from './pet.service';

@Component({
  selector: 'jhi-pet',
  templateUrl: './pet.component.html'
})
export class PetComponent implements OnInit, OnDestroy {
  pets: IPet[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected petService: PetService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.petService
      .query()
      .pipe(
        filter((res: HttpResponse<IPet[]>) => res.ok),
        map((res: HttpResponse<IPet[]>) => res.body)
      )
      .subscribe(
        (res: IPet[]) => {
          this.pets = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPets();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPet) {
    return item.id;
  }

  registerChangeInPets() {
    this.eventSubscriber = this.eventManager.subscribe('petListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
