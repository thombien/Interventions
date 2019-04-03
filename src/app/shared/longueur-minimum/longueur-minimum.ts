import { ValidatorFn, AbstractControl } from '@angular/forms';

export class VerifierCaracteresValidator {
    static longueurMinimum(longueur: number): ValidatorFn{ 
        return(valeurControle : AbstractControl): { [key: string]: boolean} | null => { 


            if(valeurControle.value != null && valeurControle.value.trim().length >= longueur ) {
                return null;
            }
            return { 'nbreCaracteresInsuffisants' : true };
        };
    }

    static longueurMaximum(longueur: number): ValidatorFn{ 
        return(valeurControle : AbstractControl): { [key: string]: boolean} | null => { 


            if(valeurControle.value != null && valeurControle.value.trim().length <= longueur ) {
                return null;
            }
            return { 'nbreCaracteresTrop' : true };
        };
    }

    static selectionObligatoire(): ValidatorFn{ 
        return(valeurControle : AbstractControl): { [key: string]: boolean} | null => { 


            if(0 != valeurControle.value ) {
                return null;
            }
            return { 'selectionnerValeur' : true };
        };
    }

}