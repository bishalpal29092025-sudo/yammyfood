
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  UtensilsCrossed,
} from "lucide-react";

import { Show, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Explore", href: "#explore" },
  { label: "Restaurants", href: "#restaurants" },
  { label: "About", href: "#about" },
];

type Theme = "light" | "dark";

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";

    return localStorage.getItem("yammyfood-theme") === "dark"
      ? "dark"
      : "light";
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("yammyfood-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-19 w-full max-w-360 items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">

        {/* Brand */}
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="YammyFood home"
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            <UtensilsCrossed size={21} strokeWidth={2.3} />
          </motion.div>

          <span className="text-[23px] font-extrabold tracking-tight text-foreground">
            Yammy<span className="text-primary">Food.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Search */}
          <div className="relative w-47.5 xl:w-57.5">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              type="search"
              placeholder="Search food..."
              aria-label="Search food and restaurants"
              className="h-10 rounded-full border-border bg-muted/60 pl-9 text-sm focus-visible:bg-background"
            />
          </div>

          {/* Cart */}
          <a
            href="#cart"
            aria-label="Shopping cart, 0 items"
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-primary"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            <span className="absolute -right-0.5 -top-0.5 flex size-4.25 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </a>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-pressed={theme === "dark"}
            className="size-10 shrink-0 rounded-full"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
            </motion.span>
          </Button>

          {/* Signed-out Desktop Actions */}
          <Show when="signed-out">
            <Link
              to="/sign-in"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
            >
              Sign In
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/sign-up"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-primary px-5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Get Started
            </Link>
          </Show>

          {/* Signed-in Desktop Profile */}
          <Show when="signed-in">
            <div className="flex shrink-0 items-center">
              <UserButton />
            </div>
          </Show>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 lg:hidden">

          {/* Mobile User Profile */}
          <Show when="signed-in">
            <UserButton />
          </Show>

          {/* Mobile Cart */}
          <a
            href="#cart"
            aria-label="Shopping cart, 0 items"
            className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <ShoppingBag size={20} />

            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              0
            </span>
          </a>

          {/* Mobile Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-pressed={theme === "dark"}
            className="size-10 rounded-full"
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="size-10 rounded-full"
                >
                  <Menu size={22} />
                </Button>
              }
            />

            <SheetContent
              side="right"
              className="w-[min(88vw,380px)] border-l border-border bg-background p-0"
            >
              {/* Mobile Header */}
              <SheetHeader className="border-b border-border p-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <UtensilsCrossed size={20} />
                  </div>

                  <SheetTitle className="text-xl font-extrabold">
                    Yammy<span className="text-primary">Food.</span>
                  </SheetTitle>
                </div>

                <SheetDescription>
                  Discover delicious food around you.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-6 p-5">

                {/* Mobile Search */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <Input
                    type="search"
                    placeholder="Search food..."
                    aria-label="Search food and restaurants"
                    className="h-11 rounded-xl pl-9"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-2"
                >
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {link.label}
                      <ArrowRight size={16} className="opacity-50" />
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Theme */}
                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-semibold">Appearance</p>
                    <p className="text-xs text-muted-foreground">
                      {theme === "light" ? "Light mode" : "Dark mode"}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="rounded-full"
                  >
                    {theme === "light" ? (
                      <Moon size={18} />
                    ) : (
                      <Sun size={18} />
                    )}
                  </Button>
                </div>

                {/* Mobile Signed-out Actions */}
                <Show when="signed-out">
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
                  >
                    Sign In
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    to="/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-12 items-center justify-center rounded-xl border border-primary font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Get Started
                  </Link>
                </Show>

                {/* Mobile Signed-in Profile */}
                <Show when="signed-in">
                  <div className="flex items-center gap-3 rounded-xl border border-border p-4">
                    <UserButton />
                    <span className="text-sm font-medium">
                      Your Account
                    </span>
                  </div>
                </Show>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
