import { List, Typography } from '@mui/material';

import { PixKey } from '@/models';
import { PixKeyRow } from './PixKeyRow';

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

      <List>
        {pixKeys.map((pixKey) => (
          <PixKeyRow
            key={pixKey.id}
            bankAccountId={props.bankAccountId}
            pixKey={pixKey}
          />
        ))}
      </List>
    </div>
  );
}
