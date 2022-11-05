import NextAuth from 'next-auth';
// import AppleProvider from 'next-auth/providers/apple'
import Credentials from 'next-auth/providers/credentials';
import prisma from '../../../db';
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
    Credentials({
      name: 'Custom Login',
      credentials: {
        correo: { label: 'Correo', type: 'email', placeholder: 'correo@correo.com' },
        contrasena: { label: 'Contraseña', type: 'password', placeholder: '********' },
      },
      async authorize(credentials: any) {
        return await NextAuthLogin(credentials!.correo, credentials!.password);
      },
    }),
  ],

  //Custom Pages
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    strategy: 'jwt',
    updateAge: 1000 * 60 * 60 * 24 * 1, // 1 day
  },
  //callbacks
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;

          default:
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});

const NextAuthLogin = async (correo: string, contrasena: string) => {
  const user = await prisma.usuario.findUnique({
    where: {
      correo,
    },
  });

  if (!user) return null;

  if (user.activo === false) return null;

  if (!bcrypt.compareSync(contrasena, user.contrasena!)) return null;

  return user;
};
