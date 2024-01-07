export default function logger(errorName:string, error:any) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    console.log(`[${errorName}]`, error);
  } else {
    throw new Error(`[${errorName}] ${error}`);
  }
}