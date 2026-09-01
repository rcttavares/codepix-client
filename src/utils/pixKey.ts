export type PixKeyKind = 'cpf' | 'email';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function formatCpf(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function isValidPixKey(kind: PixKeyKind, value: string): boolean {
  if (kind === 'email') {
    return EMAIL_REGEX.test(value);
  }

  return value.replace(/\D/g, '').length === 11;
}

export function pixKeyPlaceholder(kind: PixKeyKind): string {
  return kind === 'cpf' ? '000.000.000-00' : 'seuemail@exemplo.com';
}

export function pixKeyErrorMessage(kind: PixKeyKind): string {
  return kind === 'cpf' ? 'Informe um CPF válido' : 'Informe um e-mail válido';
}
