import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export default NextAuth({
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      username: {
        label: "Username",
        type: "text",
      },
      password: {
        label: "Password",
        type: "password"
      },
      //@ts-ignore
      async authorize(credentials: any) {
        const { username, password } = credentials;

        if (username === 'admin' && password === 'admin') {
          return {
            id: 1,
            name: "admin",
            email: "admin@gmail.com",
            image: null
          }
        } else {
          return null;
        }
      },
    }),
  ]
});
