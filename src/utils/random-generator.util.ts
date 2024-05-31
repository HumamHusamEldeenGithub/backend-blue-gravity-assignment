export function generateRandomEmail(
  domain: string = 'example.com',
  length: number = 10,
): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    username += chars[randomIndex];
  }
  return `${username}@${domain}`;
}

export function generateRandomPassword(length: number = 12): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?`~[];\',./';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}
