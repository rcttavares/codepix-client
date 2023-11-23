import { BankAccount } from '@/models';

export async function getBankAccounts(): Promise<BankAccount[]> {
  const response = await fetch(
    'http://host.docker.internal:3000/bank-accounts'
  );

  return response.json();
}

export async function HomePage() {
  const bankAccounts = await getBankAccounts();

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {bankAccounts.map((bankAccount) => (
          <li key={bankAccount.id}>
            {bankAccount.owner_name} - {bankAccount.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
