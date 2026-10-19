// Site-wide settings that are edited by hand.

export const CONTACT_EMAIL = 'info@horvatinnovativelabs.com';

// Legal entity shown in the footer, Privacy Policy and Terms of Use.
// `address` is optional – once filled in it appears in the footer automatically.
export const COMPANY = {
  name: 'HORVAT TURIZAM d.o.o.',
  oib: '26227941488',
  address: 'Kutinska 4, 10000 Zagreb',
};

// Paste a full YouTube link (watch?v=…, youtu.be/…, shorts/…) or just the video ID.
// While `youtube` is empty, the card shows "Video coming soon".
// Order matches `videos.items` in src/i18n/hr.js and en.js.
export const VIDEOS = [
  { youtube: '', poster: '/references/nautical-crew.jpg' },     // Skipper4You
  { youtube: '', poster: '/SailingBoat.jpg' },                  // Le Boat
  { youtube: '', poster: '/references/wrc-rescue.jpg' },        // WRC 2025 / Vatrogasna zajednica
];

export function getYouTubeId(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/);
  return match ? match[1] : null;
}
