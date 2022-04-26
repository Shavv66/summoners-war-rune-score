using SwrsServer.Components.Domain;
using SwrsServer.Components.Domain.Enumerations;

namespace SwrsServer.Components.DataAccess
{
	public interface IMonsterRoleRepository
	{
		Task<List<MonsterRole>> GetAllAsync();
		Task<List<MonsterRole>> GetByRuneSetAsync(RuneSet runeSet);
		Task<MonsterRole> AddAsync(MonsterRole monsterRole);
		Task<MonsterRole> UpdateAsync(MonsterRole monsterRole);
		void Delete(int id);
	}
}
