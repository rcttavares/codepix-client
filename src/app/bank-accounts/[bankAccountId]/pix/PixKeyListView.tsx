'use client';

import { Alert, List, Snackbar } from '@mui/material';

import { PixKey } from '@/models';
import { PixKeyRow } from './PixKeyRow';
import { useState } from 'react';

export function PixKeyListView({
  bankAccountId,
  pixKeys,
}: {
  bankAccountId: string;
  pixKeys: PixKey[];
}) {
  const [deleted, setDeleted] = useState(false);

  return (
    <>
      <List>
        {pixKeys.map((pixKey) => (
          <PixKeyRow
            key={pixKey.id}
            bankAccountId={bankAccountId}
            pixKey={pixKey}
            onDeleted={() => setDeleted(true)}
          />
        ))}
      </List>

      <Snackbar
        open={deleted}
        autoHideDuration={4000}
        onClose={() => setDeleted(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setDeleted(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          Chave pix removida com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}
