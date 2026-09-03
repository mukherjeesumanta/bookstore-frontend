import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1C2215] text-[#9A9A85]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Shop */}
          <div>
            <h3 className="text-[#FAF9F5] font-semibold text-sm mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalogue" className="hover:text-[#FAF9F5] transition-colors">All Books</Link></li>
              <li><Link to="/catalogue?cat=Fiction" className="hover:text-[#FAF9F5] transition-colors">Fiction</Link></li>
              <li><Link to="/catalogue?cat=Non-Fiction" className="hover:text-[#FAF9F5] transition-colors">Non-Fiction</Link></li>
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-[#FAF9F5] font-semibold text-sm mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-[#FAF9F5] font-semibold text-sm mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Book Club</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-[#FAF9F5] font-semibold text-sm mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-[#FAF9F5] transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <h3 className="text-[#FAF9F5] font-bold text-lg mb-2">Leaf &amp; Letter</h3>
            <p className="text-sm leading-relaxed">
              133 Sussin Street,<br />
              Boosers, GA 37203
            </p>
          </div>
        </div>

        <div className="border-t border-[#2E3620] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span>Copyright © 2024 Leaf &amp; Letter. All rights reserved.</span>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {["f", "in", "t", "li"].map((s) => (
              <a key={s} href="#" className="hover:text-[#FAF9F5] transition-colors text-xs font-medium uppercase">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
