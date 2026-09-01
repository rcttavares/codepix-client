'use client';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { Card } from '@/components/Card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createTransactionAction } from './create-transaction.action';
import {
  PixKeyKind,
  formatCpf,
  isValidPixKey,
  pixKeyErrorMessage,
  pixKeyPlaceholder,
} from '@/utils/pixKey';

function formatAmount(digits: string) {
  const cleanDigits = digits.replace(/\D/g, '').slice(0, 12);

  if (!cleanDigits) {
    return { display: '', numeric: '' };
  }

  const numeric = (Number(cleanDigits) / 100).toFixed(2);
  const [integerPart, decimalPart] = numeric.split('.');
  const display = `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimalPart}`;

  return { display, numeric };
}

export function WithdrawForm({ bankAccountId }: { bankAccountId: string }) {
  const router = useRouter();
  const [pixKeyKind, setPixKeyKind] = useState<PixKeyKind>('cpf');
  const [pixKey, setPixKey] = useState('');
  const [pixKeyError, setPixKeyError] = useState(false);
  const [amountDisplay, setAmountDisplay] = useState('');
  const [amountValue, setAmountValue] = useState('');

  const createTransactionActionWithBankAccountId = createTransactionAction.bind(
    null,
    bankAccountId
  );

  function handlePixKeyKindChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPixKeyKind(event.target.value as PixKeyKind);
    setPixKey('');
    setPixKeyError(false);
  }

  function handlePixKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPixKey(
      pixKeyKind === 'cpf'
        ? formatCpf(event.target.value)
        : event.target.value
    );
    setPixKeyError(false);
  }

  function handlePixKeyBlur() {
    if (!pixKey) {
      return;
    }

    setPixKeyError(!isValidPixKey(pixKeyKind, pixKey));
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { display, numeric } = formatAmount(event.target.value);
    setAmountDisplay(display);
    setAmountValue(numeric);
  }

  async function onSubmit(formData: FormData) {
    try {
      await createTransactionActionWithBankAccountId(formData);
      toast.success('Transferência realizada com sucesso!');
      router.push(`/bank-accounts/${bankAccountId}/dashboard`);
      router.refresh();
    } catch {
      toast.error('Erro ao realizar transferência. Tente novamente.');
    }
  }

  return (
    <div>
      <Typography variant='h5'>Realizar transferência</Typography>

      <Card>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          action={onSubmit}
        >
          <FormControl sx={{ mt: 2 }} required>
            <FormLabel>Escolha um tipo de chave</FormLabel>

            <RadioGroup
              name='pix_key_kind'
              value={pixKeyKind}
              onChange={handlePixKeyKindChange}
            >
              <FormControlLabel value='cpf' control={<Radio />} label='CPF' />

              <FormControlLabel
                value='email'
                control={<Radio />}
                label='E-mail'
              />
            </RadioGroup>
          </FormControl>

          <TextField
            name='pix_key_key'
            label='Chave Pix'
            margin='normal'
            required
            type={pixKeyKind === 'email' ? 'email' : 'text'}
            value={pixKey}
            onChange={handlePixKeyChange}
            InputLabelProps={{ shrink: true }}
            placeholder={pixKeyPlaceholder(pixKeyKind)}
            onBlur={handlePixKeyBlur}
            error={pixKeyError}
            helperText={pixKeyError ? pixKeyErrorMessage(pixKeyKind) : undefined}
            inputProps={
              pixKeyKind === 'cpf'
                ? { inputMode: 'numeric', maxLength: 14 }
                : undefined
            }
          />

          <TextField
            label='Valor'
            margin='normal'
            required
            value={amountDisplay}
            onChange={handleAmountChange}
            placeholder='0,00'
            inputProps={{ inputMode: 'numeric' }}
            InputProps={{
              startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
            }}
          />

          <input type='hidden' name='amount' value={amountValue} />

          <TextField name='description' label='Descrição' margin='normal' />

          <Box display={'flex'} gap={1} mt={2}>
            <Button type='submit' variant='contained'>
              Concluir
            </Button>

            <Button
              type='button'
              variant='contained'
              color='secondary'
              onClick={() =>
                router.push(`/bank-accounts/${bankAccountId}/dashboard`)
              }
            >
              Voltar
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
}
