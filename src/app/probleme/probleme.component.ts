import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum';
import { typeProblemeService } from './typeProbleme.service';
import { ITypeProbleme } from './typeProbleme';


@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private types: typeProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [VerifierCaracteresValidator.longueurMaximum(50), Validators.required]],
      type: ['', VerifierCaracteresValidator.selectionObligatoire()],
      noTypeProbleme: ['', Validators.required],
      notification: ['NePasModifier'],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
    });

    this.types.obtenirTypeProbleme()
      .subscribe(cat => this.typesProbleme = cat,
        error => this.errorMessage = <any>error);

  }


  appliquerNotifications(notification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephone = this.problemeForm.get('telephone');
    //const courrielGroupControl = this.problemeForm.get('courrielGroup');      

    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephone.clearValidators();
    telephone.reset();    
    telephone.disable();


    if (notification === 'ParCourriel') {
      courrielControl.setValidators([Validators.required]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();

      
      // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
      //courrielGroupControl.setValidators([Validators.compose([datesValides])]);                       
    }
    else if (notification === 'ParMessageTexte') {

      telephone.setValidators([Validators.required])
      telephone.enable();


    }

    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephone.updateValueAndValidity();

  }
}
