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
        prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3),Validators.required]],
        nom: ['',[VerifierCaracteresValidator.longueurMaximum(50),Validators.required]],
        type: ['',VerifierCaracteresValidator.selectionObligatoire()]
    });

    this.types.obtenirTypeProbleme()
    .subscribe(cat => this.typesProbleme = cat,
               error => this.errorMessage = <any>error);  

  }

  

}
