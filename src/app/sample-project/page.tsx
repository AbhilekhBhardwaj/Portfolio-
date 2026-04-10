import Link from "next/link";

export default function SampleProjectPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
      <p className="text-foreground/80">Sample project placeholder.</p>
      <Link href="/" className="underline">
        Back home
      </Link>
    </div>
  );
}
