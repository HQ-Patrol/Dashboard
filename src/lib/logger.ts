import { browser } from '$app/environment';

enum LogEmoji {
	'GATEWAY' = '🔑',
	'DB' = '🍃'
}

export function log(prefix: keyof typeof LogEmoji, message: string) {
	if(browser) console.log(LogEmoji[prefix], prefix, '>', message);
}
