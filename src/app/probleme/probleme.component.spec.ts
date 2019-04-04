import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum';
import { typeProblemeService } from './typeProbleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[typeProblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Zone PRÉNOM invalide avec 2 caractères ', () => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('a'.repeat(2));
    expect(zone.invalid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères ', () => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères ', () => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });


  it('Zone PRÉNOM invalide avec aucune valeur   ', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 10 espaces ', () => {
    let validator = VerifierCaracteresValidator.longueurMinimum(3);
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));

    let result = validator(zone as AbstractControl);
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  let validator = VerifierCaracteresValidator.longueurMinimum(3);
  it('Zone PRÉNOM valide avec 2 espaces et 1 caractère ', () => {
    let zone = component.problemeForm.controls['prenom']
    zone.setValue('  e');
    
    let result = validator(zone as AbstractControl);
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });
  
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier',()=> {
    component.appliquerNotifications("NePasModifier");

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications("NePasModifier");

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toEqual(null);
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("NePasModifier");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("NePasModifier");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel ', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.errors['required']).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur  quand notifier par courriel ', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.errors['required']).toBeTruthy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme ', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("test");
    expect(zone.errors['pattern']).toBeTruthy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone  CONFIRMER COURRIEL avec valeur valide retourne null ', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("");
    zone2.setValue("test@gmail.com");
    let errors ={};

    let groupe = component.problemeForm.get('courrielGroup')
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null  ', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("test@gmail.com");
    zone2.setValue("");
    let errors ={};

    let groupe = component.problemeForm.get('courrielGroup')
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel ', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("test@gmail.com");
    zone2.setValue("teset@gmail.com");
    let errors ={};

    let groupe = component.problemeForm.get('courrielGroup')
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel ', () => {
    component.appliquerNotifications("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("test@gmail.com");
    zone2.setValue("test@gmail.com");
    let errors ={};

    let groupe = component.problemeForm.get('courrielGroup')
    errors = groupe.errors || {};
    expect(errors['match']).toBeFalsy();
  });




});
