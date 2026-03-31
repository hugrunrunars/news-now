export const LS = {
  G_KEY:  'frettir_gkey',
  AI_KEY: 'frettir_akey',
  TAGS:   'frettir_tags',
  ACTIVE: 'frettir_active',
  CACHE:  'frettir_cache',
  SEEN:   'frettir_seen',
};

export const PRESET_TAGS = [
  { id: 'world',       name: 'Heimur',      color: 'blue',    section: 'world' },
  { id: 'technology',  name: 'Tækni',       color: 'violet',  section: 'technology' },
  { id: 'science',     name: 'Vísindi',     color: 'emerald', section: 'science' },
  { id: 'sport',       name: 'Íþróttir',    color: 'amber',   section: 'sport' },
  { id: 'environment', name: 'Umhverfi',    color: 'teal',    section: 'environment' },
  { id: 'culture',     name: 'Menning',     color: 'rose',    section: 'culture' },
  { id: 'business',    name: 'Viðskipti',   color: 'indigo',  section: 'business' },
];

export const COLOR_POOL = ['blue','violet','emerald','amber','cyan','rose','red','orange','teal','indigo','pink','lime'];

/* Tailwind classes per color — must be full strings so Tailwind picks them up */
export const C = {
  blue:    { chip: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',     active: 'bg-blue-600 text-white shadow-sm'    },
  violet:  { chip: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200', active: 'bg-violet-600 text-white shadow-sm' },
  emerald: { chip: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200', active: 'bg-emerald-600 text-white shadow-sm'},
  amber:   { chip: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',  active: 'bg-amber-500 text-white shadow-sm'  },
  cyan:    { chip: 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200',     active: 'bg-cyan-600 text-white shadow-sm'   },
  rose:    { chip: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',     active: 'bg-rose-600 text-white shadow-sm'   },
  red:     { chip: 'bg-red-50 text-red-700 ring-1 ring-red-200',       active: 'bg-red-600 text-white shadow-sm'    },
  orange:  { chip: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200', active: 'bg-orange-500 text-white shadow-sm'},
  teal:    { chip: 'bg-teal-50 text-teal-700 ring-1 ring-teal-200',    active: 'bg-teal-600 text-white shadow-sm'   },
  indigo:  { chip: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200', active: 'bg-indigo-600 text-white shadow-sm'},
  pink:    { chip: 'bg-pink-50 text-pink-700 ring-1 ring-pink-200',    active: 'bg-pink-600 text-white shadow-sm'   },
  lime:    { chip: 'bg-lime-50 text-lime-700 ring-1 ring-lime-200',    active: 'bg-lime-600 text-white shadow-sm'   },
};
