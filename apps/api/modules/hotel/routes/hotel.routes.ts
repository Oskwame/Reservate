import { Router } from "express";
import { listHotelHandler } from "../controllers/hotel.controller";

export const hotelRouter = Router();

hotelRouter.get("/", listHotelHandler);
