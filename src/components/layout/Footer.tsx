export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-6 mt-12">
      <p>© {new Date().getFullYear()} CitiNexus. All rights reserved.</p>
      <p className="mt-1 text-sm">Empowering transparent urban governance.</p>
    </footer>
  );
}
