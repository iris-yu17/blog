'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 p-10 font-rbtm">
      <h1 className="text-9xl font-bold text-secondary">500</h1>
      <p className="text-xl">Something went wrong!</p>
      <p className="break-all text-center text-sm">{error.stack}</p>
    </div>
  );
}
