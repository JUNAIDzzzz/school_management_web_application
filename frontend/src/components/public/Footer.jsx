import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { SCHOOL, NAV_LINKS } from '../../data/schoolContent';

const SOCIALS = [
  { icon: FiFacebook, href: SCHOOL.social.facebook },
  { icon: FiInstagram, href: SCHOOL.social.instagram },
  { icon: FiTwitter, href: SCHOOL.social.twitter },
  { icon: FiYoutube, href: SCHOOL.social.youtube },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-900 text-slate-300">
      <div className="section-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 font-display text-lg font-bold text-white">
              B
            </span>
            <span className="font-display text-lg font-semibold text-white">{SCHOOL.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{SCHOOL.tagline}</p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-slate-400 transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li>{SCHOOL.address}</li>
            <li>{SCHOOL.phone}</li>
            <li>{SCHOOL.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Follow Us</h4>
          <div className="mt-4 flex gap-3">
            {SOCIALS.map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-500"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.
      </div>
    </footer>
  );
}
