export const getDisplayName = (v: { id: number; label?: string; name?: string }) =>
  'label' in v ? v.label : v.name;
