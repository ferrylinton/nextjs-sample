import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export default NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined): Promise<User | null> {
        if (credentials?.username === 'admin' && credentials.password === 'admin') {
          return {
            id: "id",
            name: "admin",
            username: "admin",
            email: "admin@gmail.com",
            role: "Admin"
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  jwt: {
    maxAge: 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }
});
