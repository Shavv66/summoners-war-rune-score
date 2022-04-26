namespace SwrsServer.Components.DataAccess.Services
{
	public interface IAsyncGetAllService<T>
	{
		Task<List<T>> GetTask();
	}
}
