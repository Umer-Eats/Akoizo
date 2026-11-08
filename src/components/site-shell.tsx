'use client';
import { LandingNav, LandingFooter } from './landing-shell';

// Every page, public or signed in, shares the study-vault navigation and footer.
export function Header() {
  return <LandingNav />;
}
export function Footer() {
  return <LandingFooter />;
}
