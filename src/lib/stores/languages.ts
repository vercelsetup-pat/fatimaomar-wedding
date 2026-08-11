import { writable } from 'svelte/store';

export type Language = 'en' | 'ar';

export const language = writable<Language>('en');