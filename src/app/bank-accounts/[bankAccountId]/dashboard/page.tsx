import { Link, Typography } from '@mui/material';

import { CardAction } from '@/components/CardAction';
import { CurrentBalance } from '@/components/CurrentBalance';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { MyLatestTransactions } from './MyLatestTransactions';
import { Transaction } from '@/models';

export async function getTransactions(
  bankAccountId: string
): Promise<Transaction[]> {
  const response = await fetch(
    `http://host.docker.internal:3000/bank-accounts/${bankAccountId}/transactions`,
    {
      next: {
        revalidate: 10,
        tags: [`bank-accounts/${bankAccountId}`],
      },
    }
  );

  return response.json();
}

export async function BankAccountDashboardPage({
  params,
  searchParams,
}: {
  params: { bankAccountId: string };
  searchParams: { page: string; per_page: string };
}) {
  const transactions = await getTransactions(params.bankAccountId);
  const page = parseInt(searchParams.page) || 1;
  const perPage = parseInt(searchParams.per_page) || 10;

  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={12} lg={6}>
        <div>
          <CurrentBalance bankAccountId={params.bankAccountId} />
        </div>
      </Grid2>

      <Grid2 container xs={12} lg={6} spacing={1}>
        <Grid2 xs={6}>
          <Link
            href={`/bank-accounts/${params.bankAccountId}/withdraw`}
            style={{ textDecoration: 'none' }}
          >
            <CardAction sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component='span' color={'primary'}>
                Transferência
              </Typography>
            </CardAction>
          </Link>
        </Grid2>

        <Grid2 xs={6}>
          <Link
            href={`/bank-accounts/${params.bankAccountId}/pix`}
            style={{ textDecoration: 'none' }}
          >
            <CardAction sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component='span' color={'primary'}>
                Nova chave pix
              </Typography>
            </CardAction>
          </Link>
        </Grid2>
      </Grid2>

      <Grid2 xs={12}>
        <Typography variant='h5'>Útimos lançamentos</Typography>
        <MyLatestTransactions transactions={transactions} />
      </Grid2>
    </Grid2>
  );
}

export default BankAccountDashboardPage;
