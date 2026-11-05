# API

Base URL: `http://localhost:4000/api/v1`

All responses are JSON. Validation errors return `422` with Zod issues in `details`.

## Error shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": []
  }
}
```

Common codes: `VALIDATION_ERROR`, `NOT_FOUND`, `ROOM_NOT_FOUND`, `RESERVATION_NOT_FOUND`,
`ROOM_UNAVAILABLE`, `CAPACITY_EXCEEDED`, `INVALID_STAY`, `NOT_IMPLEMENTED`, `INTERNAL_ERROR`.

## Planned modules

The following module roots are mounted and their `GET /` endpoint returns `501 NOT_IMPLEMENTED`
until the corresponding business logic is implemented:

`auth`, `users`, `roles`, `hotel`, `guests`, `stays`, `housekeeping`, `pos`, `inventory`,
`procurement`, `folios`, `payments`, `invoices`, `accounting`, `reports`, `notifications`.

## Health

### `GET /health`

```json
{
  "status": "ok",
  "service": "hotel-management-api",
  "version": "0.1.0",
  "uptimeSeconds": 12,
  "timestamp": "2026-11-01T10:00:00.000Z",
  "dependencies": {
    "database": { "driver": "memory", "status": "up" }
  }
}
```

## Rooms

### `GET /rooms`

Query: `page`, `pageSize`, `status`, `type`.

```json
{
  "items": [
    {
      "id": "room-101",
      "number": "101",
      "name": "Garden Double",
      "type": "double",
      "status": "available",
      "floor": 1,
      "capacity": 2,
      "nightlyRate": 189,
      "currency": "USD",
      "amenities": ["Garden view", "Wi-Fi", "Breakfast"],
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 6,
  "totalPages": 1
}
```

### `GET /rooms/:id`

Returns a single room or `404`.

### `POST /rooms`

```json
{
  "number": "610",
  "name": "Attic Studio",
  "type": "single",
  "floor": 6,
  "capacity": 1,
  "nightlyRate": 140,
  "currency": "USD",
  "amenities": ["Wi-Fi"]
}
```

`currency` defaults to `USD`; `amenities` defaults to `[]`. New rooms start as `available`.

### `PATCH /rooms/:id`

Accepts any subset of the create payload. `id`, `status`, and timestamps are not writable
through this endpoint.

### `DELETE /rooms/:id`

Returns `204` on success.

## Reservations

### `GET /reservations`

Query: `page`, `pageSize`, `status`, `roomId`.

### `POST /reservations`

```json
{
  "roomId": "room-101",
  "guest": {
    "firstName": "Jonas",
    "lastName": "Weber",
    "email": "jonas.weber@example.com",
    "phone": "+49-30-555-0199",
    "country": "DE"
  },
  "checkIn": "2026-12-12",
  "checkOut": "2026-12-15",
  "guests": 2,
  "notes": "Late arrival"
}
```

Rules:

- `checkIn` and `checkOut` are ISO dates (`YYYY-MM-DD`); checkout must be after check-in.
- The stay must span at least one night.
- `guests` may not exceed the room capacity.
- Active reservations (`pending`, `confirmed`, `checked_in`) with overlapping dates block the room.
- Totals are calculated as nights × nightly rate and rounded to two decimals.

### `PATCH /reservations/:id/status`

```json
{ "status": "checked_out" }
```

Valid statuses: `pending`, `confirmed`, `checked_in`, `checked_out`, `cancelled`, `no_show`.
