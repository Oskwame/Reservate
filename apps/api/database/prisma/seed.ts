import { disconnectPrisma, getPrismaClient } from "../client";
import { seedReservations, seedRooms } from "../seed";

const seededAt = new Date("2026-01-01T00:00:00.000Z");

async function main(): Promise<void> {
  const prisma = getPrismaClient();

  for (const room of seedRooms) {
    const data = {
      number: room.number,
      name: room.name,
      type: room.type,
      status: room.status,
      floor: room.floor,
      capacity: room.capacity,
      nightlyRate: room.nightlyRate,
      currency: room.currency,
      createdAt: new Date(room.createdAt),
      updatedAt: new Date(room.updatedAt),
    };

    await prisma.room.upsert({
      where: { id: room.id },
      create: {
        id: room.id,
        ...data,
        amenities: {
          create: room.amenities.map((name) => ({ name })),
        },
      },
      update: {
        ...data,
        amenities: {
          deleteMany: {},
          create: room.amenities.map((name) => ({ name })),
        },
      },
    });
  }

  for (const reservation of seedReservations) {
    await prisma.guest.upsert({
      where: { id: reservation.guest.id },
      create: {
        id: reservation.guest.id,
        firstName: reservation.guest.firstName,
        lastName: reservation.guest.lastName,
        email: reservation.guest.email,
        phone: reservation.guest.phone,
        country: reservation.guest.country,
        createdAt: new Date(reservation.guest.createdAt),
        updatedAt: new Date(reservation.guest.updatedAt),
      },
      update: {
        firstName: reservation.guest.firstName,
        lastName: reservation.guest.lastName,
        email: reservation.guest.email,
        phone: reservation.guest.phone,
        country: reservation.guest.country,
        updatedAt: new Date(reservation.guest.updatedAt),
      },
    });

    await prisma.reservation.upsert({
      where: { id: reservation.id },
      create: {
        id: reservation.id,
        code: reservation.code,
        guestId: reservation.guest.id,
        roomId: reservation.roomId,
        checkIn: new Date(reservation.checkIn),
        checkOut: new Date(reservation.checkOut),
        guests: reservation.guests,
        status: reservation.status,
        totalAmount: reservation.totalAmount,
        currency: reservation.currency,
        notes: reservation.notes,
        createdAt: new Date(reservation.createdAt),
        updatedAt: new Date(reservation.updatedAt),
      },
      update: {
        code: reservation.code,
        guestId: reservation.guest.id,
        roomId: reservation.roomId,
        checkIn: new Date(reservation.checkIn),
        checkOut: new Date(reservation.checkOut),
        guests: reservation.guests,
        status: reservation.status,
        totalAmount: reservation.totalAmount,
        currency: reservation.currency,
        notes: reservation.notes,
        updatedAt: new Date(reservation.updatedAt),
      },
    });
  }

  const sampleReservation = seedReservations[0];

  if (sampleReservation) {
    await prisma.invoice.upsert({
      where: { id: "invoice-1001" },
      create: {
        id: "invoice-1001",
        number: "INV-1001",
        reservationId: sampleReservation.id,
        status: "paid",
        amount: sampleReservation.totalAmount,
        currency: sampleReservation.currency,
        issuedAt: seededAt,
        paidAt: seededAt,
        createdAt: seededAt,
        updatedAt: seededAt,
      },
      update: {
        reservationId: sampleReservation.id,
        status: "paid",
        amount: sampleReservation.totalAmount,
        currency: sampleReservation.currency,
        issuedAt: seededAt,
        paidAt: seededAt,
        updatedAt: seededAt,
      },
    });

    await prisma.payment.upsert({
      where: { id: "payment-1001" },
      create: {
        id: "payment-1001",
        invoiceId: "invoice-1001",
        provider: "manual",
        providerReference: "PAY-1001",
        amount: sampleReservation.totalAmount,
        currency: sampleReservation.currency,
        status: "succeeded",
        paidAt: seededAt,
        createdAt: seededAt,
        updatedAt: seededAt,
      },
      update: {
        invoiceId: "invoice-1001",
        amount: sampleReservation.totalAmount,
        currency: sampleReservation.currency,
        status: "succeeded",
        paidAt: seededAt,
        updatedAt: seededAt,
      },
    });
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(disconnectPrisma);
