# ADR 0001 – Stack, hosting a způsob práce

- Stav: přijato
- Datum: 2026-11-04

## Kontext

První zakázka je web pro malý rodinný penzion: rodiny s dětmi, rezervace a SEO, rozpočet kolem 15 000 Kč, termín do konce ledna 2027. Web má běžet na levném webhostingu klienta a zároveň poslouží jako reference do portfolia. Další podobná zakázka (jiné ubytovací zařízení) by měla jít postavit z velké části z tohoto kódu.

Rezervační část jsme ověřili prakticky (Google kalendář, iCal export, změna se v exportu projeví do pár sekund). Penzion nemusí být na Booking.com.

## Rozhodnutí

1. **Astro, statický výstup.** Z výsledku je složka HTML/CSS (`dist/`), kterou lze nahrát na jakýkoli webhosting. Je rychlá, bezpečná (není co hacknout) a dobrá pro SEO. **Ne .NET:** na webhosting za pár desítek korun se nevejde a klient ani další dodavatel by ho neudržel.
2. **Obsah v datových souborech** (`src/data/*.json`), validovaný schématem (zod) při buildu. Překlep v datech zastaví build s českou hláškou, na web se nedostane rozbitá stránka. Klíče jsou anglicky (kód), obsah česky.
3. **Obecnost jen tam, kde nic nestojí.** Barvy, pokoje, kapacity, ceník a hranice stavů obsazenosti jsou v datech. Žádný „engine“, pluginy ani multi-tenant. Šablonu z toho vytáhneme až u druhého klienta, až uvidíme, co se opravdu opakuje (stejná lekce jako WakePark ADR 0008).
4. **Obsazenost = Google kalendář klienta**, jeden kalendář na pokoj, čtený přes tajnou iCal adresu malým PHP skriptem na hostingu (s cache). Vlastní databáze rezervací ani administrace nebude. Rezervace z webu je **nezávazná poptávka**, kterou majitel potvrdí a zapíše do kalendáře. Implementace přijde v samostatném PR.
5. **Nasazení přes FTP na webhosting**, z GitHub Actions po merge do `main`. Merge do `main` = produkce. Druhé (testovací) prostředí zatím ne.
   - Prostý FTP posílá heslo nešifrovaně. Pokud hosting umí FTPS, přepneme na něj jedním nastavením (nástroj `lftp` umí obojí). Rozhodnutí o protokolu padne podle hostingu klienta.
   - Přístupové údaje jsou jen v GitHub Secrets, nikdy v repu.
6. **Veřejné repo s ukázkovým penzionem.** Obsah skutečného klienta (texty, fotky) se do veřejného repa nedává bez jeho souhlasu. Tajné údaje (iCal adresy, FTP, SMTP) nikdy v repu.
7. **Git: větev a PR na každý úkol**, CI (kontrola typů a build) na každém PR, merguje jen Martin (squash). Detaily v `CONTRIBUTING.md`.
8. **Node 24 LTS** (`.nvmrc`). Astro 7 vyžaduje Node ≥ 22.23.4.

## Důsledky

- Změna obsahu znamená build a nasazení. Na začátku ji dělá Martin. Pokud bude klient chtít obsah upravovat sám, přidáme formulářový editor (Decap CMS) nad stejnými datovými soubory.
- Dynamické části (obsazenost, odeslání poptávky) potřebují PHP na hostingu. Hosting bez PHP by vyžadoval jiné řešení (např. serverless funkce).
- Statický web nemá žádné vlastní uživatelské účty ani databázi – méně provozu, méně rizik.
