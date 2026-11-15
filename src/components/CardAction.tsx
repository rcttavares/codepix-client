import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, type SxProps, type Theme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { Card } from './Card';

export type CardActionProps = {
  sx?: SxProps<Theme>;
  href?: string;
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
          {props.href ? (
            <Link href={props.href}>
              <Button color='primary'>
                <ArrowForwardIcon />
              </Button>
            </Link>
          ) : (
            <Button color='primary'>
              <ArrowForwardIcon />
            </Button>
          )}
        </Grid2>
      </Grid2>
    </Card>
  );
}
