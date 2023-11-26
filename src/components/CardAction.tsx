import { Button, SxProps, Theme } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from './Card';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PropsWithChildren } from 'react';

export type CardActionProps = {
  sx?: SxProps<Theme>;
};

export function CardAction(props: PropsWithChildren<CardActionProps>) {
  return (
    <Card>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={9} sx={props.sx}>
          {props.children}
        </Grid2>

        <Grid2
          xs={12}
          sm={3}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
        >
          <Button color='primary'>
            <ArrowForwardIcon />
          </Button>
        </Grid2>
      </Grid2>
    </Card>
  );
}
