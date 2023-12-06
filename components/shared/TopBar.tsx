import { appTitle } from "@/constants";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/icon-512x512.png" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden hover:text-cyan-300 transition-all">
          {appTitle}
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          {/* will show if logged In */}
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer rounded p-3 hover:bg-cyan-400 transition-all">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        {/* organization switcher = create organization from clerk */}
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}
