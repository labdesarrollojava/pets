import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PetsSharedModule } from 'app/shared';
import {
  PetComponent,
  PetDetailComponent,
  PetUpdateComponent,
  PetDeletePopupComponent,
  PetDeleteDialogComponent,
  petRoute,
  petPopupRoute
} from './';

const ENTITY_STATES = [...petRoute, ...petPopupRoute];

@NgModule({
  imports: [PetsSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PetComponent, PetDetailComponent, PetUpdateComponent, PetDeleteDialogComponent, PetDeletePopupComponent],
  entryComponents: [PetComponent, PetUpdateComponent, PetDeleteDialogComponent, PetDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PetsPetModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
