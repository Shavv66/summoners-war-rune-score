using SwrsServer.Components.Domain;

namespace SwrsServer.Components.RuneScoring
{
	public interface IRuneScoreCache
	{
		RuneScoringResult GetScore(int roleId, long runeId);
		void SetScores(List<RuneScoringResult> runeScores);
		void AddOrUpdateScores(List<RuneScoringResult> runeScores);
	}
}
