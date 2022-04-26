using SwrsServer.Components.Domain;
using SwrsServer.Components.Domain.Enumerations;

namespace SwrsServer.Components.RuneScoring
{
	public interface IScoreRankCache
	{
		ScoreRankingResult GetRank(int roleId, long runeId, ScoreType type);
		void SetRanks(List<ScoreRankingResult> ranks);
		void AddOrUpdateRanks(List<ScoreRankingResult> ranks);
	}
}
