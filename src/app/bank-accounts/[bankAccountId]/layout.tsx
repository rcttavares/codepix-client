import { Header } from '@/components/Header';
import { PageContainer } from '@/components/PageContainer';
import { getBankAccount } from '@/queries/get-bank-account.query';

export default async function BankAccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ bankAccountId: string }>;
}) {
  const { bankAccountId } = await params;
  const bankAccount = await getBankAccount(bankAccountId);

  return (
    <>
      <Header accountName={bankAccount.owner_name} />

      <PageContainer>{children}</PageContainer>
    </>
  );
}
