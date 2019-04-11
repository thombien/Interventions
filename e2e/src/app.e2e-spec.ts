import { AppPage } from './app.po';
import { browser, logging, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('#37 | Doit afficher le titre du formulaire Déclarer un problème', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Déclarer un problème');
  });

  it('#38 | Doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();       
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('#39 | Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();       
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('#40 | Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();       
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('#41 | Zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant ', () => {
    page.setZoneDescriptionProblemeCaracteresSuffisants();       
    expect(page.obtenirClassedescriptionProblemeId()).toContain('is-valid');
  });

  it('#42 | Zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.obtenirClasseZoneDescriptionProbleme();       
    expect(page.obtenirClassedescriptionProblemeId()).toContain('is-invalid');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
