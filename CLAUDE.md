# CLAUDE.md – pokyny pro AI agenta

Statický web pro malé ubytovací zařízení (Astro 7, Node 24). Kontext a rozhodnutí: `docs/adr/`. Postup práce: `CONTRIBUTING.md`.

## Komunikace a styl práce

- S Martinem komunikuj **česky**. Kód, identifikátory a klíče v JSON anglicky, texty na webu a komentáře česky.
- Nejdřív připomínky a otázky, potom kód. Řeš jen zadaný úkol, další nápady sepiš jako návrhy.
- Každý odklon od zadání zdůvodni a uveď jeho cenu.

## Git – závazné

- Pracuj **vždy ve vlastní větvi** (`feature/…`, `fix/…`, `docs/…`, `chore/…`), nikdy přímo v `main`.
- **Nikdy nemerguj a nepushuj do `main`.** Merguje jen Martin po review.
- Na konci úkolu: commit (Conventional Commits, česky) → push větve → PR podle šablony.
- Připomínky z review zapracuj do stejné větve novými commity, historii nepřepisuj (žádný force push bez výslovného pokynu).

## Před PR vždy

```bash
npm run check
npm run build
```

Pro vizuální změny ověř web v prohlížeči (`npm run dev`).

## Pravidla kódu

- Obsah patří do `src/data/*.json`, ne natvrdo do stránek. Nová data = rozšířit schéma v `src/data/index.ts`.
- Žádné tajné údaje v repu. Žádný obsah skutečného klienta ve veřejném repu.
- Minimalismus: žádné frameworky a závislosti navíc, dokud nejsou potřeba (UI knihovny, CSS frameworky, state management).
- České skloňování počtů přes `plural()` v `src/lib/cs.ts`.
