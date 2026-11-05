import { CURRENCIES } from "@htms/types";
import { z } from "zod";

export const idSchema = z.string().trim().min(1).max(100);

export const emailSchema = z.string().trim().toLowerCase().pipe(z.email().max(254));

export const nameSchema = z.string().trim().min(1).max(80);

export const phoneSchema = z.string().trim().min(3).max(30);

export const countryCodeSchema = z.string().trim().length(2).toUpperCase();

export const passwordSchema = z.string().min(8).max(128);

export const currencySchema = z.enum(CURRENCIES);
