using SwrsServer.Components.Domain;

namespace SwrsServer.Components.DataAccess
{
	public interface ISummonerRepository
	{
		Task<Summoner> GetAsync();
	}
}
