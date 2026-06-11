import { Box } from '@mui/material';
import { WithdrawForm } from './WithdrawForm';

export default async function WithdrawPage({
  params,
}: {
  params: Promise<{ bankAccountId: string }>;
}) {
  const { bankAccountId } = await params;
  return (
    <Box>
      <WithdrawForm bankAccountId={bankAccountId} />
    </Box>
  );
}
