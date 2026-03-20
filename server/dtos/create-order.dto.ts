import { z } from "zod";

const orderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  tableToken: z.string(),
  comment: z.string().nullable().optional(),
  items: z.array(orderItemSchema).min(1),
});

export type CreateOrderItemDTO = z.infer<typeof orderItemSchema>;
export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
