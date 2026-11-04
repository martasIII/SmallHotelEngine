/**
 * Načtení a validace obsahu webu.
 *
 * Veškerý obsah (penzion, pokoje, ceník) je v JSON souborech vedle tohoto modulu.
 * Při buildu se validuje schématem – chyba v datech (chybějící pole, překlep v id pokoje)
 * zastaví build se srozumitelnou hláškou, místo aby se na web dostala rozbitá stránka.
 */
import { z } from 'astro/zod';
import propertyJson from './property.json';
import roomsJson from './rooms.json';
import pricingJson from './pricing.json';

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Barva musí být ve tvaru #rrggbb');
const slug = z.string().regex(/^[a-z0-9-]+$/, 'Id smí obsahovat jen malá písmena, číslice a pomlčky');

export const propertySchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
    country: z.string().length(2),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.email(),
  }),
  checkIn: z.string().regex(/^\d{2}:\d{2}$/),
  checkOut: z.string().regex(/^\d{2}:\d{2}$/),
  theme: z.object({
    primary: hexColor,
    primaryDark: hexColor,
    accent: hexColor,
    background: hexColor,
    text: hexColor,
  }),
  availability: z.object({
    /** Když je volných pokojů nejvýš tolik, noc se zobrazí jako „poslední pokoje“. */
    lastRoomsThreshold: z.number().int().min(1),
  }),
});

export const roomSchema = z.object({
  id: slug,
  name: z.string().min(1),
  capacity: z.number().int().min(1),
  beds: z.string(),
  sizeM2: z.number().positive().optional(),
  description: z.string(),
  amenities: z.array(z.string()),
});

export const pricingSchema = z.object({
  currency: z.literal('CZK'),
  seasons: z.array(z.object({ id: slug, name: z.string(), period: z.string() })).min(1),
  rates: z.array(z.object({ roomId: slug, perNight: z.record(z.string(), z.number().int().positive()) })),
  minNights: z.number().int().min(1),
  notes: z.array(z.string()),
});

export type Property = z.infer<typeof propertySchema>;
export type Room = z.infer<typeof roomSchema>;
export type Pricing = z.infer<typeof pricingSchema>;

function parse<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Chyba v datech ${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const property = parse(propertySchema, propertyJson, 'src/data/property.json');
export const rooms = parse(z.array(roomSchema).min(1), roomsJson, 'src/data/rooms.json');
export const pricing = parse(pricingSchema, pricingJson, 'src/data/pricing.json');

// Kontroly napříč soubory, které samotné schéma nepokryje.
const roomIds = new Set(rooms.map((r) => r.id));
const seasonIds = new Set(pricing.seasons.map((s) => s.id));
if (roomIds.size !== rooms.length) {
  throw new Error('Chyba v datech src/data/rooms.json: id pokojů musí být unikátní.');
}
for (const rate of pricing.rates) {
  if (!roomIds.has(rate.roomId)) {
    throw new Error(`Chyba v datech src/data/pricing.json: neznámý pokoj „${rate.roomId}“.`);
  }
  for (const seasonId of Object.keys(rate.perNight)) {
    if (!seasonIds.has(seasonId)) {
      throw new Error(`Chyba v datech src/data/pricing.json: pokoj „${rate.roomId}“ má cenu pro neznámou sezónu „${seasonId}“.`);
    }
  }
}
for (const room of rooms) {
  if (!pricing.rates.some((r) => r.roomId === room.id)) {
    throw new Error(`Chyba v datech src/data/pricing.json: chybí ceník pro pokoj „${room.id}“.`);
  }
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: pricing.currency, maximumFractionDigits: 0 }).format(amount);
}
