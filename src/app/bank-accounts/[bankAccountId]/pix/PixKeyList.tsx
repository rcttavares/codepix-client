import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { PixKey } from '@/models';
import StarBorder from '@mui/icons-material/StarBorder';

export async function getPixKeys(bankAccountId: string): Promise<PixKey[]> {
  const response = await fetch(
    `http://host.docker.internal:3000/bank-accounts/${bankAccountId}/pix-keys`,
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
          <ListItem disablePadding key={pixKey.id}>
            <ListItemButton>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>

              <ListItemText primary={pixKey.key} secondary={pixKey.kind} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
