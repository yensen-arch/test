import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Storefront</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for quality products.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:underline">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-muted-foreground hover:underline">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:underline">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:underline">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Storefront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

