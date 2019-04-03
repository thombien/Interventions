import { VerifierCaracteresValidator } from "./longueur-minimum";
import { AbstractControl } from '@angular/forms';

describe('longueur zone Validator', () => {
    it('une chaîne avec 10 espaces est invalide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: '          '};

        let result = validator(control as AbstractControl);

        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec des mots est valide ', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: 'Vive angular'};

        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });
    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide ', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: '   je le veux   '};

        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });
    it('une phrase avec 1 espace et 2 caractères est invalide. ', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: " xx"};

        let result = validator(control as AbstractControl);

        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
    it('une phrase avec 2 espaces et 1 caractère est invalide ', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: "  x"};

        let result = validator(control as AbstractControl);

        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: "   xxx"};

        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });
    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: "     xxxxx     "};

        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });
    it('une chaîne nulle est invalide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: null};

        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3);

        let control = {value: "   xxx"};

        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });


})