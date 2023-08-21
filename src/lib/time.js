export function timeAgo(timestamp) {
	const now = new Date();
	const past = new Date(timestamp);
	const secondsDifference = Math.floor((now - past) / 1000);

	const MINUTE = 60;
	const HOUR = 60 * MINUTE;
	const DAY = 24 * HOUR;
	const YEAR = 365.25 * DAY;

	let remainingSeconds = secondsDifference;

	const years = Math.floor(remainingSeconds / YEAR);
	remainingSeconds %= YEAR;

	const days = Math.floor(remainingSeconds / DAY);
	remainingSeconds %= DAY;

	const hours = Math.floor(remainingSeconds / HOUR);
	remainingSeconds %= HOUR;

	const minutes = Math.floor(remainingSeconds / MINUTE);

	let result = [];

	if (years > 0) {
		result.push(`${years} year${years > 1 ? 's' : ''}`);
	}

	if (days > 0) {
		result.push(`${days} day${days > 1 ? 's' : ''}`);
	}

	if (hours > 0 && years === 0) {
		result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
	}

	if (minutes > 0 && years === 0 && days === 0) {
		result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
	}

	if (result.length === 0) {
		return "just now";
	}

	return result.join(' ') + ' ago';
}