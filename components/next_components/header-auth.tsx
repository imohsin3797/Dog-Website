import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButton() {
  return (
    <header className="bg-black px-4 py-2 flex justify-between items-center">
      <Button asChild size="sm" variant="outline" className="text-black border-white">
        <Link href="/">Home</Link>
      </Button>
      <Button asChild size="sm" variant="outline" className="text-black border-white">
        <Link href="/breed-search">Breed Search</Link>
      </Button>
      <Button asChild size="sm" variant="outline" className="text-black border-white">
        <Link href="/admin/dogs">Admin Portal</Link>
      </Button>
    </header>
  );
}