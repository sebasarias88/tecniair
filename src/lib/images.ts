/**
 * Demo photography from Unsplash (free license, hotlinked from their CDN).
 * Swap for Tecniair's own photos before launch: same keys, local paths in /public.
 */
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  heroFans: unsplash("photo-1698479603408-1a66a6d9e80f"),
  livingRoom: unsplash("photo-1541194577687-8c63bf9e7ee3"),
  rooftopCrew: unsplash("photo-1642749776312-aa42ce20c9f5"),
  technicianHelmet: unsplash("photo-1613620838744-a0fbfb76bae3"),
  technicianPanel: unsplash("photo-1660330589827-da8ab7dd3c02"),
  splitDisplay: unsplash("photo-1762341123870-d706f257a12e"),
  homeInterior: unsplash("photo-1616593871468-2a9452218369"),
  splitWall: unsplash("photo-1759772238012-9d5ad59ae637"),
  buildingPipes: unsplash("photo-1635604866833-70844856de75"),
} as const;
