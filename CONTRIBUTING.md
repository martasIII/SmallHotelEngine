# Jak přispívat

Každá změna jde přes větev a pull request. Do `main` se nepushuje přímo. **Merge do `main` = nasazení do produkce.**

## Postup

1. **Jedna větev = jeden úkol**, krátce žijící (hodiny až dny):
   - `feature/<popis>` – nová funkce, např. `feature/kalendar-obsazenosti`
   - `fix/<popis>` – oprava chyby
   - `docs/<popis>`, `chore/<popis>` – dokumentace, údržba, závislosti
2. **Commity** ve stylu [Conventional Commits](https://www.conventionalcommits.org/): `feat: …`, `fix: …`, `docs: …`, `chore: …`, `ci: …`. Popis česky.
3. Před otevřením PR lokálně: `npm run check` a `npm run build`.
4. **Pull request** podle šablony: co se mění, proč, jak to ověřit. Malé PR jsou lepší než velké.
5. **CI** musí být zelené (kontrola typů + build).
6. **Review:** Martin schválí, nebo vrátí s připomínkami v PR. Připomínky se zapracují do **stejné větve** novými commity.
7. **Merge** dělá jen Martin, metodou **squash merge**. Větev se po merge smaže.

## Pravidla

- Žádné tajné údaje v repu (FTP, iCal adresy, SMTP, API klíče) – patří do GitHub Secrets nebo konfigurace na hostingu.
- Obsah skutečného klienta (texty, fotky) do veřejného repa jen s jeho souhlasem.
- Nové architektonické rozhodnutí = nový ADR v `docs/adr/`.
