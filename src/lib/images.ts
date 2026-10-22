/**
 * Photography from Unsplash (free license), served from their CDN through the custom
 * loader in imageLoader.ts. To use a client photo instead, put an optimized WebP in
 * /public/images and set the key to its local path ("/images/name.webp").
 */
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  // Home
  heroFans: unsplash("photo-1698479603408-1a66a6d9e80f"),
  livingRoom: unsplash("photo-1541194577687-8c63bf9e7ee3"),

  // Services
  rooftopCrew: unsplash("photo-1642749776312-aa42ce20c9f5"),
  technicianHelmet: unsplash("photo-1613620838744-a0fbfb76bae3"),
  technicianPanel: unsplash("photo-1660330589827-da8ab7dd3c02"),
  splitDisplay: unsplash("photo-1762341123870-d706f257a12e"),
  hotelLobby: unsplash("photo-1742844552193-2fd3425cd26d"),
  condenserBrick: unsplash("photo-1718203862467-c33159fdc504"),
  flexibleDucts: unsplash("photo-1786840671711-bdabee8634cf"),
  splitWallMono: unsplash("photo-1702443418982-9aeb9e04b322"),
  constructionInterior: unsplash("photo-1673978484281-e9370ac3b81c"),
  electronicsRepair: unsplash("photo-1721332154191-ba5f1534266e"),

  // Sectors
  homeInterior: unsplash("photo-1616593871468-2a9452218369"),
  openOffice: unsplash("photo-1631193816258-28b44b21e78b"),
  retailStore: unsplash("photo-1764795850238-7a024db5e3ee"),
  restaurant: unsplash("photo-1517248135467-4c7edcad34c4"),
  hotelRoom: unsplash("photo-1611892440504-42a792e24d32"),
  casino: unsplash("photo-1596838132731-3301c3fd4317"),
  dentalClinic: unsplash("photo-1629909613654-28e377c37b09"),
  constructionCrane: unsplash("photo-1527335988388-b40ee248d80c"),
  splitWall: unsplash("photo-1759772238012-9d5ad59ae637"),
  buildingPipes: unsplash("photo-1635604866833-70844856de75"),
} as const;
