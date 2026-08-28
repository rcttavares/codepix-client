import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

export function PageContainer(props: PropsWithChildren) {
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        mx: ['16px', '120px'],
        my: ['48px', '80px'],
      }}
    >
      {props.children}
    </Box>
  );
}
