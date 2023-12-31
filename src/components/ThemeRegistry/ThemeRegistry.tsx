'use client';

import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline'; //melhoramento de html, body
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
