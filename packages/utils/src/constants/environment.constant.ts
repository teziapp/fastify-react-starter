export const environments = ["dev", "prod", "staging", "test"] as const;
export type Environment = (typeof environments)[number];
