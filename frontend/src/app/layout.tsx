"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ReduxProvider } from "@/redux/provider";// Import store

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <html lang="en" className={darkMode ? "dark-mode" : ""} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <ReduxProvider> {/* Bọc Redux Provider */}
              <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
              <CssBaseline />
              {children}
              <Footer />
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
