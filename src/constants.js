export const LS = {
  G_KEY:  'frettir_gkey',
  AI_KEY: 'frettir_akey',
  TAGS:   'frettir_tags',
  ACTIVE: 'frettir_active',
  CACHE:  'frettir_cache',
  SEEN:   'frettir_seen',
};

export const PRESET_TAGS = [
  { id: 'world',       name: 'Heimur',      color: 'forest',  section: 'world' },
  { id: 'technology',  name: 'Tækni',       color: 'lime',    section: 'technology' },
  { id: 'science',     name: 'Vísindi',     color: 'forest',  section: 'science' },
  { id: 'sport',       name: 'Íþróttir',    color: 'lime',    section: 'sport' },
  { id: 'environment', name: 'Umhverfi',    color: 'forest',  section: 'environment' },
  { id: 'culture',     name: 'Menning',     color: 'pink',    section: 'culture' },
  { id: 'business',    name: 'Viðskipti',   color: 'forest',  section: 'business' },
];

export const COLOR_POOL = ['forest','lime','pink','forest','lime','pink','forest','lime','pink','forest','lime','pink'];

/* Tailwind classes per color — must be full strings so Tailwind picks them up */
export const C = {
  forest: {
    chip:   'bg-[rgba(58,86,21,0.08)] text-[#3A5615] ring-1 ring-[rgba(58,86,21,0.15)]',
    active: 'bg-[#3A5615] text-[#FAF3EC] shadow-sm',
    tag:    'text-[#3A5615]',
  },
  lime: {
    chip:   'bg-[rgba(172,198,83,0.15)] text-[#5a7a1a] ring-1 ring-[rgba(172,198,83,0.3)]',
    active: 'bg-[#ACC653] text-[#3A5615] shadow-sm',
    tag:    'text-[#5a7a1a]',
  },
  pink: {
    chip:   'bg-[rgba(237,166,191,0.15)] text-[#b05080] ring-1 ring-[rgba(237,166,191,0.3)]',
    active: 'bg-[#EDA6BF] text-[#3A5615] shadow-sm',
    tag:    'text-[#b05080]',
  },
};
