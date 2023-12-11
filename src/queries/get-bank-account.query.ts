import { BankAccount } from '@/models';

export async function getBankAccount(
  bankAccountId: string
): Promise<BankAccount> {
  const response = await fetch(
    `http://host.docker.internal:3000/bank-accounts/${bankAccountId}`,
    {
      next: {
        revalidate: 20,
        tags: [`bank-accounts/${bankAccountId}`],
      },
    }
  );

  return response.json();
}
