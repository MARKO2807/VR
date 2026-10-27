// Site-wide settings that are edited by hand.

export const CONTACT_EMAIL = 'info@horvatinnovativelabs.com';

// Legal entity shown in the footer, Privacy Policy and Terms of Use.
// `address` is optional – once filled in it appears in the footer automatically.
export const COMPANY = {
  name: 'HORVAT TURIZAM d.o.o.',
  oib: '26227941488',
  address: 'Kutinska 4, 10000 Zagreb',
};

// YouTube videos shown inside each project card (section "Projekti").
// Add as many as you like – paste full YouTube links (watch?v=…, youtu.be/…, shorts/…) or just the ID.
// Each video appears as a 16:9 player inside its project card (loads only when someone presses play).
// While a list is empty, the card shows a "VR video uskoro" placeholder instead.
// Example: leboat: ['https://youtu.be/XXXXXXXXXXX', 'https://www.youtube.com/watch?v=YYYYYYYYYYY'],
export const PROJECT_VIDEOS = {
  kampus: [],       // Nautički kampus – obuka u jedrenju, simulator, učionica
  skipper4you: [],  // Skipper4You – VR scenariji za skipere
  leboat: [],       // Le Boat – 360° produkcija
  wrc: [],          // WRC 2025 / Vatrogasna zajednica
};

export function getYouTubeId(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/);
  return match ? match[1] : null;
}
