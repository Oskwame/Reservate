import type { RequestHandler } from "express";
import { listHotel } from "../services/hotel.service";

export const listHotelHandler: RequestHandler = () => {
  listHotel();
};
