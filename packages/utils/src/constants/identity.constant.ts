export const identityTypes = ["person", "organisation"] as const;
export type IdentityType = (typeof identityTypes)[number];
