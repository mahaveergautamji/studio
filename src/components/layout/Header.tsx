import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-semibold text-primary hover:text-primary/80 transition-colors">
          <Brain className="h-8 w-8" />
          <span>LearnFlow AI</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/account">My Account</Link>
          </Button>
          {/* Placeholder for Login/Signup buttons - actual auth not implemented */}
          {/* <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button> */}
        </nav>
      </div>
    </header>
  );
}
