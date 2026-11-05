export { paginate } from "@htms/shared";

export function getPaginationOffset(page: number, pageSize: number): number {
  return (page - 1) * pageSize;
}

export function hasNextPage(page: number, pageSize: number, total: number): boolean {
  return page * pageSize < total;
}

export function getTotalPages(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize);
}
