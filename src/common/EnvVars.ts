export default {
  NodeEnv: process.env.NODE_ENV ?? 'development', 
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/animaux',
  Port: Number(process.env.PORT ?? 3000),
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: process.env.COOKIE_SECRET ?? 'default_cookie_secret', 
        Options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? '/',
      maxAge: Number(process.env.COOKIE_EXP ?? 3600000),
      domain: process.env.COOKIE_DOMAIN ?? 'localhost',
      secure: process.env.SECURE_COOKIE === 'true',
    },
  },
  Jwt: {
    Secret: process.env.JWT_SECRET ?? 'default_jwt_secret',
    Exp: process.env.JWT_EXP ?? '1h', 
  },
} as const;

if (process.env.NODE_ENV === 'production') {
  const requiredVars = ['MONGODB_URI', 'COOKIE_SECRET', 'JWT_SECRET'];
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`❌ La variable d'environnement ${varName} est obligatoire en production.`);
    }
  });
}