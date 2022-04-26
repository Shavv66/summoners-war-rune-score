using SwrsServer.Components.Domain;

namespace SwrsServer.Components.DataAccess
{
	public interface IRuneRepository
	{
		Task<List<Rune>> GetAllAsync();
	}
}
