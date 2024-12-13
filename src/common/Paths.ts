/**
 * Les chemins des routes Express pour l'API.
 */

export default {
  Base: '/',
  Animal: {
    Base: '/animaux',
    Get: '/',
    GetByNom: '/nom/:nom',
    GetByPoids: '/poids/:min/:max',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
} as const;
