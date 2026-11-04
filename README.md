# SmallHotelEngine

Web pro malé ubytovací zařízení (penzion, apartmány): pokoje, ceník, kontakt a **kalendář obsazenosti napojený na Google kalendář** s nezávaznou poptávkou pobytu.

Statický web v [Astro](https://astro.build), který běží na běžném levném webhostingu. Repozitář obsahuje smyšlený ukázkový **Penzion U Lesa**.

## Stav

| Část | Stav |
|---|---|
| Kostra webu: Úvod, Pokoje, Ceník, Rezervace, Kontakt | ✅ |
| Obsah v datových souborech s validací | ✅ |
| CI: kontrola typů a build na každém PR | ✅ |
| Kalendář obsazenosti z Google kalendáře (PHP + iCal) | plánováno |
| Poptávkový formulář (e-mail majiteli) | plánováno |
| Nasazení přes FTP po merge do `main` | plánováno |
| SEO: sitemap, schema.org `LodgingBusiness`, Open Graph obrázky | plánováno |
| Fotogalerie | plánováno |

## Spuštění

Potřebuješ **Node 24 LTS** (viz `.nvmrc`, minimum 22.23.4).

```bash
npm install
npm run dev      # vývojový server na http://localhost:4321
npm run check    # kontrola typů
npm run build    # statický web do dist/
npm run preview  # náhled sestaveného webu
```

## Jak upravit obsah

Veškerý obsah je v `src/data/`:

| Soubor | Co obsahuje |
|---|---|
| `property.json` | název, popis, adresa, kontakt, časy příjezdu a odjezdu, **barvy webu** |
| `rooms.json` | pokoje: `id`, název, kapacita, lůžka, vybavení |
| `pricing.json` | sezóny, ceny za noc pro každý pokoj, minimální počet nocí, poznámky |

Při buildu se data kontrolují (`src/data/index.ts`). Chybějící pole, špatná barva nebo ceník pro neexistující pokoj build zastaví s českou hláškou, například:

```
Chyba v datech src/data/pricing.json: neznámý pokoj „pokoj-duub“.
```

## Struktura

```
src/
  data/        obsah webu (JSON) + validace
  layouts/     společné rozvržení stránky (hlavička, patička, meta tagy)
  components/  znovupoužitelné části (karta pokoje…)
  pages/       stránky – každý soubor = jedna URL
  styles/      globální CSS (barvy přes CSS proměnné z property.json)
  lib/         pomocné funkce
docs/adr/      architektonická rozhodnutí
```

## Dokumentace

- [ADR 0001 – Stack, hosting a způsob práce](docs/adr/0001-stack-a-hosting.md)
- [Jak přispívat (větve, PR, review)](CONTRIBUTING.md)
