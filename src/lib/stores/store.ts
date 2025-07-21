import { writable } from "svelte/store";

export const alert = writable<string>('Welcome to todo app!');
