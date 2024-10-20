export function generateReferralCode(base: string): string {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a random alphanumeric string
  return `${base}-${randomPart}`;
}
