export const statusTypes = ["active", "disabled"] as const;
export type StatusType = (typeof statusTypes)[number];
