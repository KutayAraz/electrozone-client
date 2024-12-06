export function truncateString(string: string, truncateFrom: number, take: number) {
  return string.length > truncateFrom ? `${string.substring(0, take)}...` : string;
}
