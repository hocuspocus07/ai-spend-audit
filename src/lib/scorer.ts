import { CandidateRecommendation } from "./types";

export const rankRecommendations = (
  recommendations: CandidateRecommendation[]
): CandidateRecommendation | null => {
  if (!recommendations.length) {
    return null;
  }

  return recommendations.sort((a, b) => {
    const aScore = a.savings * a.confidence;
    const bScore = b.savings * b.confidence;

    return bScore - aScore;
  })[0];
};