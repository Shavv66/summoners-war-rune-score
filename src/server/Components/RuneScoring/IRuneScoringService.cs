using SwrsServer.Components.Domain;

namespace SwrsServer.Components.RuneScoring
{
	public interface IRuneScoringService
	{
		List<RuneScoringResult> CalculateScores(List<Rune> runes, List<MonsterRole> monsterRoles);
	}
}
