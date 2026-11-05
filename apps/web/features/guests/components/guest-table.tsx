import { formatDate } from "@htms/shared";
import type { Guest } from "@htms/types";

export function GuestTable({ guests }: Readonly<{ guests: Guest[] }>) {
  return (
    <div className="table-scroll">
      <table className="table">
        <thead>
          <tr>
            <th>Guest</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Added</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className="table-primary">
                {guest.firstName} {guest.lastName}
              </td>
              <td>{guest.email}</td>
              <td>{guest.phone ?? "—"}</td>
              <td>{guest.country ?? "—"}</td>
              <td>{formatDate(guest.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
