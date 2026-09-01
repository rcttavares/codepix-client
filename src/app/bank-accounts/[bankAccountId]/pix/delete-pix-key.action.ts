'use server';

import { revalidateTag } from 'next/cache';

export async function deletePixKeyAction(
  bankAccountId: string,
  pixKeyId: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/bank-accounts/${bankAccountId}/pix-keys/${pixKeyId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }

  revalidateTag(`pix-keys-${bankAccountId}`, {});
}
