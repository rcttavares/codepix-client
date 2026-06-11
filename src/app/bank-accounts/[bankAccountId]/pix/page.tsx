import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { PixKeyList } from './PixKeyList';
import { RegisterPixKeyForm } from './RegisterPixKeyForm';

export async function MyPixDashboardPage({
  params,
}: {
  params: Promise<{ bankAccountId: string }>;
}) {
  const { bankAccountId } = await params;
  return (
    <Box>
      <Grid2 container spacing={8}>
        <Grid2 xs={12} sm={6}>
          <RegisterPixKeyForm bankAccountId={bankAccountId} />
        </Grid2>

        <Grid2 xs={12} sm={6}>
          <div>
            <PixKeyList bankAccountId={bankAccountId} />
          </div>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default MyPixDashboardPage;
