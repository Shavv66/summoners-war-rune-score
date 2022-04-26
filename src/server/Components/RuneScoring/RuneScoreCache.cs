﻿using SwrsServer.Components.Domain;

namespace SwrsServer.Components.RuneScoring
{
	public class RuneScoreCache : IRuneScoreCache
	{
		// Scores are stored in nested dictionaries to allow for fast cache lookups
		private Dictionary<int, Dictionary<long, RuneScoringResult>> mRuneScores;

		public RuneScoringResult GetScore(int roleId, long runeId)
		{
			return mRuneScores[roleId][runeId];
		}

		public void SetScores(List<RuneScoringResult> runeScores)
		{
			mRuneScores = new Dictionary<int, Dictionary<long, RuneScoringResult>>();
			AddOrUpdateScores(runeScores);
		}

		public void AddOrUpdateScores(List<RuneScoringResult> runeScores)
		{
			foreach (RuneScoringResult runeScore in runeScores)
			{
				if (!mRuneScores.ContainsKey(runeScore.RoleId))
				{
					mRuneScores.Add(runeScore.RoleId, new Dictionary<long, RuneScoringResult>());
				}
				Dictionary<long, RuneScoringResult> scoresForRole = mRuneScores[runeScore.RoleId];

				if (!scoresForRole.ContainsKey(runeScore.RuneId))
				{
					scoresForRole.Add(runeScore.RuneId, runeScore);
				}
				else
				{
					scoresForRole[runeScore.RuneId] = runeScore;
				}
			}
		}
	}
}
