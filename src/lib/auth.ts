import { betterAuth } from 'better-auth';
import { admin as adminPlugin } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { ac, admin, user } from '@/auth/permissions';
import prisma from './prisma';
import { sendEmail } from './email';
import { env } from '@/env';

export const auth = betterAuth({
  trustedOrigins: [env.BETTER_AUTH_URL!],
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
      },
      defaultRole: 'user',
      adminRoles: ['admin'],
      impersonationSessionDuration: 60 * 60 * 24,
    }),
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  session: {
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60,
  },
});
