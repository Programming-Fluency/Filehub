export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-2">
          <p className="text-gray-900">
            © {currentYear} FileHub. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">File Sharing Made Simple</p>
        </div>
      </div>
    </footer>
  );
}
