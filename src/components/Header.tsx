import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export type HeaderProps = {
  accountName?: string;
};

export function Header(props: HeaderProps) {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ mx: ['16px', '104px'] }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Link href='/bank-accounts' style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography variant='h6' component='span'>
              CodePix
            </Typography>
          </Link>

          {props.accountName && (
            <Typography variant='subtitle1' component='span' sx={{ opacity: 0.7 }}>
              / {props.accountName}
            </Typography>
          )}
        </Box>

        <Link href='/bank-accounts' style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button color='inherit' startIcon={<AccountBalanceIcon />}>
            Contas bancárias
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
