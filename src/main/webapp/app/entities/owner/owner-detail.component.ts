import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOwner } from 'app/shared/model/owner.model';

import { IPet } from 'app/shared/model/pet.model';
import { PetService } from '../pet/pet.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
@Component({
    selector: 'jhi-owner-detail',
    templateUrl: './owner-detail.component.html'
})
export class OwnerDetailComponent implements OnInit {
    owner: IOwner;
    pets: IPet[];

    constructor(private activatedRoute: ActivatedRoute, private petService: PetService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ owner }) => {
            this.owner = owner;
            this.loadPets();
        });
    }

    previousState() {
        window.history.back();
    }

    loadPets() {
        this.petService.queryByOwner(this.owner.id).subscribe(
            (res: HttpResponse<IPet[]>) => {
                this.pets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
