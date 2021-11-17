import { createAction, props } from "@ngrx/store";

export const getDeals = createAction("GetDeals", props<{ maxSalePrice: number }>())