using SwrsServer.Components.Domain;

namespace SwrsServer.Components.RuneScoring
{
	public interface IScoreRankingService
	{
		List<ScoreRankingResult> CalculateRanks(List<RuneScoringResult> scores);
	}
}
