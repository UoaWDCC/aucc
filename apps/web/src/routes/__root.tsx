import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-500 text-white py-4">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up / Fees</Link></li>
          <li><Link to="/trips-events">Trips & Events</Link></li>
          <li><Link to="/trip-reports">Trip Reports</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/merchandise">Merchandise</Link></li>
          <li><Link to="/gear-hire">Gear Hire</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/resources">Resources</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        AUCC © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
