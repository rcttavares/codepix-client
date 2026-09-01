import { Typography } from '@mui/material';

import { PixKey } from '@/models';
import { PixKeyListView } from './PixKeyListView';

export async function getPixKeys(bankAccountId: string): Promise<PixKey[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/bank-accounts/${bankAccountId}/pix-keys`,
    {
      next: {
        tags: [`pix-keys-${bankAccountId}`],
      },
    }
  );

  return response.json();
}

export type PixKeyListProps = {
  bankAccountId: string;
};

export async function PixKeyList(props: PixKeyListProps) {
  const pixKeys = await getPixKeys(props.bankAccountId);

  return (
    <div>
      <Typography variant='h5'>Minhas chaves pix</Typography>

      <PixKeyListView bankAccountId={props.bankAccountId} pixKeys={pixKeys} />
    </div>
  );
}
