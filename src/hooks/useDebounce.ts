import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delayMs: number = 500) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delayMs);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delayMs]);

	return debouncedValue;
};
