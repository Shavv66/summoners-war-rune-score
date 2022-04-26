namespace SwrsServer.Components.DataAccess.Domain
{
	public interface IRepositoryTimestampProvider
	{
		DateTime GetResourceLastWriteTime();
	}
}
