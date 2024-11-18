import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const DEBUG_FORMS = false;

export const FIVE_MINUTES_IN_SECONDS = 5 * 60;
export const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60;
export const FIFTHEEN_DAYS_IN_SECONDS = 1000 * 60 * 60 * 24 * 15;
export const THIRTHY_DAYS_IN_SECONDS = 1000 * 60 * 60 * 24 * 30;

export const PASSWORD_HASH_OPTIONS = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
};
