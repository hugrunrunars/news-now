import { LS } from './constants';

export const stripHtml = html => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent || el.innerText || '').replace(/\s+/g, ' ').trim();
};

export const ago = d => {
  const h = Math.floor((Date.now() - new Date(d)) / 3.6e6);
  if (h < 1)  return 'Rétt núna';
  if (h < 24) return `${h} klst síðan`;
  return `${Math.floor(h / 24)} dögum síðan`;
};

export const getCache = () => {
  try { return JSON.parse(localStorage.getItem(LS.CACHE) || '{}'); }
  catch { return {}; }
};

export const getSeen = () => {
  try { return JSON.parse(localStorage.getItem(LS.SEEN) || '{}'); }
  catch { return {}; }
};

export const markSeen = (tagId, articleIds) => {
  const seen = getSeen();
  seen[tagId] = articleIds;
  localStorage.setItem(LS.SEEN, JSON.stringify(seen));
};

export const putCache = (id, val) => {
  const c = getCache();
  c[id] = val;
  const keys = Object.keys(c);
  if (keys.length > 400) keys.slice(0, keys.length - 400).forEach(k => delete c[k]);
  localStorage.setItem(LS.CACHE, JSON.stringify(c));
};
