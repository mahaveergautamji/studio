export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card shadow-sm py-6 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {currentYear} Maths Bridge. All rights reserved.</p>
      </div>
    </footer>
  );
}
