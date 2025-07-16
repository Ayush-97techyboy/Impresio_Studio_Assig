import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export function cn(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(' ');
// }

// export function cn(...classes: (string | false | null | undefined)[]): string {
//   return classes.filter(Boolean).join(' ');
// }

export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs));
}
