'use client';

import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import { Card } from '@/components/Card';
import { createPixKeyAction } from './create-pix-key.action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RegisterPixKeyForm({
  bankAccountId,
}: {
  bankAccountId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const createPixKeyActionWithBankAccountId = createPixKeyAction.bind(
    null,
    bankAccountId
  );

  async function onSubmit(formData: FormData) {
    try {
      await createPixKeyActionWithBankAccountId(formData);
      setOpen(true);
    } catch {
      setError(true);
    }
  }

  function handleClose() {
    setOpen(false);
    setError(false);
  }

  return (
    <div>
      <Typography variant='h5'>Cadastrar chaves pix</Typography>

      <Card>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          action={onSubmit}
        >
          <FormControl sx={{ mt: 2 }} required>
            <FormLabel>Escolha um tipo de chave</FormLabel>

            <RadioGroup name='kind'>
              <FormControlLabel value='cpf' control={<Radio />} label='CPF' />

              <FormControlLabel
                value='email'
                control={<Radio />}
                label='E-mail'
              />
            </RadioGroup>
          </FormControl>

          <TextField name='key' label='Digite sua chave pix' margin='normal' />

          <Box display={'flex'} gap={1} mt={2}>
            <Button type='submit' variant='contained'>
              Cadastrar
            </Button>

            <Button
              type='button'
              variant='contained'
              color='secondary'
              onClick={() => {
                router.push(`/bank-accounts/${bankAccountId}/dashboard`);
              }}
            >
              Voltar
            </Button>
          </Box>
        </form>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Chave pix cadastrada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Erro ao cadastrar chave pix. Tente novamente.
        </Alert>
      </Snackbar>
    </div>
  );
}
