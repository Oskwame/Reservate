export interface Store<T extends { id: string }> {
  all(): T[];
  findById(id: string): T | undefined;
  insert(entity: T): T;
  update(id: string, updater: (entity: T) => T): T | undefined;
  remove(id: string): boolean;
}

export function createMemoryStore<T extends { id: string }>(seed: readonly T[] = []): Store<T> {
  const items = new Map<string, T>(seed.map((item) => [item.id, item]));

  return {
    all: () => Array.from(items.values()),
    findById: (id) => items.get(id),
    insert: (entity) => {
      items.set(entity.id, entity);
      return entity;
    },
    update: (id, updater) => {
      const current = items.get(id);
      if (!current) {
        return undefined;
      }

      const updated = updater(current);
      items.set(id, updated);
      return updated;
    },
    remove: (id) => items.delete(id),
  };
}
