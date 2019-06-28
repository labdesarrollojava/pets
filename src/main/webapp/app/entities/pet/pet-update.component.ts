import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPet, Pet } from 'app/shared/model/pet.model';
import { PetService } from './pet.service';
import { IOwner } from 'app/shared/model/owner.model';
import { OwnerService } from 'app/entities/owner';

@Component({
  selector: 'jhi-pet-update',
  templateUrl: './pet-update.component.html'
})
export class PetUpdateComponent implements OnInit {
  pet: IPet;
  isSaving: boolean;

  owners: IOwner[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    species: [null, [Validators.required]],
    owner: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected petService: PetService,
    protected ownerService: OwnerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  //   ngOnInit() {
  //     this.isSaving = false;
  //     this.activatedRoute.data.subscribe(({ pet }) => {
  //         this.pet = pet;
  //     });

  //     this.activatedRoute.data.subscribe(({ owner }) => {
  //         this.pet.owner = owner;
  //     });

  //     this.ownerService.query().subscribe(
  //         (res: HttpResponse<IOwner[]>) => {
  //             this.owners = res.body;
  //         },
  //         (res: HttpErrorResponse) => this.onError(res.message)
  //     );
  // }
  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pet }) => {
      this.updateForm(pet);
      this.pet = pet;
    });
    this.ownerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOwner[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOwner[]>) => response.body)
      )
      .subscribe((res: IOwner[]) => (this.owners = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pet: IPet) {
    this.editForm.patchValue({
      id: pet.id,
      name: pet.name,
      species: pet.species,
      owner: pet.owner
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pet = this.createFromForm();
    if (pet.id !== undefined) {
      this.subscribeToSaveResponse(this.petService.update(pet));
    } else {
      this.subscribeToSaveResponse(this.petService.create(pet));
    }
  }

  private createFromForm(): IPet {
    return {
      ...new Pet(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      species: this.editForm.get(['species']).value,
      owner: this.editForm.get(['owner']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPet>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackOwnerById(index: number, item: IOwner) {
    return item.id;
  }
}
