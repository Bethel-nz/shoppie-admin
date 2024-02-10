export default function logger(label: string, error: any) {
	const isDevelopment = process.env.NODE_ENV === 'development';

	if (isDevelopment) {
		logger(`${label} -::- ${error}`);
	} else {
		throw new Error(`${label} -::- ${error}`);
	}
}
