import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-slate-900">Storefront</h3>
            <p className="text-sm text-slate-700">
              Your one-stop shop for quality products.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-slate-700 hover:underline hover:text-slate-900">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-700 hover:underline hover:text-slate-900">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-slate-700 hover:underline hover:text-slate-900">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-700 hover:underline hover:text-slate-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-700 hover:underline hover:text-slate-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-700 hover:underline hover:text-slate-900">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="text-slate-700 hover:underline hover:text-slate-900">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-slate-700 hover:underline hover:text-slate-900">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-700 hover:underline hover:text-slate-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-slate-700">
          <p>&copy; 2024 Storefront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

