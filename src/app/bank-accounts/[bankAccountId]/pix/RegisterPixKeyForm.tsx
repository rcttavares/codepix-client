'use client';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { Card } from '@/components/Card';
import { createPixKeyAction } from './create-pix-key.action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  PixKeyKind,
  formatCpf,
  isValidPixKey,
  pixKeyErrorMessage,
  pixKeyPlaceholder,
} from '@/utils/pixKey';

export function RegisterPixKeyForm({
  bankAccountId,
}: {
  bankAccountId: string;
}) {
  const router = useRouter();
  const [kind, setKind] = useState<PixKeyKind>('cpf');
  const [key, setKey] = useState('');
  const [keyError, setKeyError] = useState(false);
  const createPixKeyActionWithBankAccountId = createPixKeyAction.bind(
    null,
    bankAccountId
  );

  async function onSubmit(formData: FormData) {
    try {
      await createPixKeyActionWithBankAccountId(formData);
      toast.success('Chave pix cadastrada com sucesso!');
    } catch {
      toast.error('Erro ao cadastrar chave pix. Tente novamente.');
    }
  }

  function handleKindChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKind(event.target.value as PixKeyKind);
    setKey('');
    setKeyError(false);
  }

  function handleKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(kind === 'cpf' ? formatCpf(event.target.value) : event.target.value);
    setKeyError(false);
  }

  function handleKeyBlur() {
    if (!key) {
      return;
    }

    setKeyError(!isValidPixKey(kind, key));
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

            <RadioGroup name='kind' value={kind} onChange={handleKindChange}>
              <FormControlLabel value='cpf' control={<Radio />} label='CPF' />

              <FormControlLabel
                value='email'
                control={<Radio />}
                label='E-mail'
              />
            </RadioGroup>
          </FormControl>

          <TextField
            name='key'
            label='Digite sua chave pix'
            margin='normal'
            required
            type={kind === 'email' ? 'email' : 'text'}
            value={key}
            onChange={handleKeyChange}
            onBlur={handleKeyBlur}
            error={keyError}
            helperText={keyError ? pixKeyErrorMessage(kind) : undefined}
            InputLabelProps={{ shrink: true }}
            placeholder={pixKeyPlaceholder(kind)}
            inputProps={
              kind === 'cpf' ? { inputMode: 'numeric', maxLength: 14 } : undefined
            }
          />

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
    </div>
  );
}
