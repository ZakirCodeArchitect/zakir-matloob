import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange">404</p>
      <h1 className="mt-4 font-condensed text-7xl md:text-9xl">Lost the path</h1>
      <p className="mt-4 max-w-md text-sm text-white/65">
        This route does not exist. The work, writing, and contact surfaces are still here.
      </p>
      <Link href="/" className="mt-8 rounded-full bg-orange px-6 py-3 text-sm font-medium">
        Back home
      </Link>
    </main>
  );
}
