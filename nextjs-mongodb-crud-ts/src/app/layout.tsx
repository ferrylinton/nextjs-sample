import { AlertMessageContainer } from "@/components/AlertMessageContainer";
import { LocaleMenu } from "@/components/LocaleMenu";
import { Sidebar } from "@/components/Sidebar";
import { ToggleSidebar } from "@/components/ToggleSidebar";
import { ToggleTheme } from "@/components/ToggleTheme";
import { ConfirmProvider } from "@/providers/confirm-provider";
import { ThemeContextProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "../css/index.css";


export const metadata: Metadata = {
  title: "Todo APP",
  description: "TODO application built using NextJS and Mongodb",
  authors: {
    name: "Ferry L. H.",
    url: "https://www.marmeam.com/"
  },
  keywords: ["todo", "nextjs", "mongodb"],
  creator: "Ferry L. H."
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();


  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeContextProvider>
            <ConfirmProvider>
              <Sidebar />
              <main className="main">
                <nav className="nav">
                  <div className="nav-content">
                    <ToggleSidebar />
                    <div className="logo"><a href="/">TODO</a></div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0.5rem" }}>
                      <LocaleMenu />
                      <ToggleTheme />
                    </div>
                  </div>
                </nav>
                <div className="main-content">
                  <div className="container">
                    <AlertMessageContainer />
                    {children}
                  </div>
                </div>
              </main>
            </ConfirmProvider>
          </ThemeContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
