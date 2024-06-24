import { z } from "zod";

export const LinksTable = z.object({
  id: z.number().int().positive().optional(), // assuming autoId() generates a positive integer
  userId: z.number().int().positive(),
  link: z.string().trim(),
  problem: z.string().trim(),
  problemImprovement: z.string().trim(),
  problemScore: z.number().int().nonnegative(),
  solution: z.string().trim(),
  solutionImprovement: z.string().trim(),
  solutionScore: z.number().int().nonnegative(),
  targetAudience: z.string().trim(),
  targetAudiaanceImprovement: z.string().trim(),
  targetAudienceScore: z.number().int().nonnegative(),
  objections: z.string().trim(),
  objectionsImprovement: z.string().trim(),
  objectionsScore: z.number().int().nonnegative(),
  testimonials: z.string().trim(),
  testimonialsImprovement: z.string().trim(),
  testimonialsScore: z.number().int().nonnegative(),
  riskReversal: z.string().trim(),
  riskReversalImprovement: z.string().trim(),
  riskReversalScore: z.number().int().nonnegative(),
  uniqueness: z.string().trim(),
  uniquenessImprovement: z.string().trim(),
  uniquenessScore: z.number().int().nonnegative(),
});

export type LinksType = z.infer<typeof LinksTable>;
