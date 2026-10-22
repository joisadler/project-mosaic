export function groupSelection(selected: readonly string[], children: readonly string[]) {
  const count = children.filter(id => selected.includes(id)).length;
  return { checked: children.length > 0 && count === children.length, mixed: count > 0 && count < children.length };
}

export function toggleSectionGroup(selected: readonly string[], children: readonly string[], checked: boolean) {
  const next = new Set(selected);
  for (const id of children) {
    if (checked) next.add(id);
    else next.delete(id);
  }
  return [...next];
}
