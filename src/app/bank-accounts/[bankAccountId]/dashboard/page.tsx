import { CardAction } from '@/components/CardAction';
import { CurrentBalance } from '@/components/CurrentBalance';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';

export function BankAccountDashboardPage({
  params,
}: {
  params: { bankAccountId: string };
}) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={12} lg={6}>
        <div>
          <CurrentBalance bankAccountId={params.bankAccountId} />
        </div>
      </Grid2>

      <Grid2 container xs={12} lg={6} spacing={1}>
        <Grid2 xs={6}>
          <CardAction sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component='span' color={'primary'}>
              Transferência
            </Typography>
          </CardAction>
        </Grid2>

        <Grid2 xs={6}>
          <CardAction sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component='span' color={'primary'}>
              Nova chave pix
            </Typography>
          </CardAction>
        </Grid2>
      </Grid2>

      <Grid2 xs={12}>
        <Typography variant='h5'>Útimos lançamentos</Typography>
      </Grid2>
    </Grid2>
  );
}

export default BankAccountDashboardPage;
