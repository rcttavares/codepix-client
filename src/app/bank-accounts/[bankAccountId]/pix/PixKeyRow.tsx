'use client';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import StarBorder from '@mui/icons-material/StarBorder';

import { PixKey } from '@/models';
import { deletePixKeyAction } from './delete-pix-key.action';
import { useState } from 'react';

export function PixKeyRow({
  bankAccountId,
  pixKey,
  onDeleted,
}: {
  bankAccountId: string;
  pixKey: PixKey;
  onDeleted?: () => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(false);

  async function handleDelete() {
    setDeleting(true);

    try {
      await deletePixKeyAction(bankAccountId, pixKey.id);
      setConfirmOpen(false);
      onDeleted?.();
    } catch {
      setError(true);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge='end'
            aria-label='Excluir chave pix'
            onClick={() => setConfirmOpen(true)}
          >
            <DeleteOutline />
          </IconButton>
        }
      >
        <ListItemButton sx={{ pr: 6 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>

          <ListItemText primary={pixKey.key} secondary={pixKey.kind} />
        </ListItemButton>
      </ListItem>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Excluir chave pix</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir a chave pix &quot;{pixKey.key}
            &quot;? Essa ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={deleting}>
            Cancelar
          </Button>

          <Button
            onClick={handleDelete}
            color='error'
            variant='contained'
            disabled={deleting}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setError(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          Erro ao excluir chave pix. Tente novamente.
        </Alert>
      </Snackbar>
    </>
  );
}
