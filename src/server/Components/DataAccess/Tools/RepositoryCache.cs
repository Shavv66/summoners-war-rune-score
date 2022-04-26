using SwrsServer.Components.DataAccess.Domain;

namespace SwrsServer.Components.DataAccess.Tools
{
	public class RepositoryCache<T>
	{
		private IRepositoryTimestampProvider mRepositoryTimestampProvider;
		private DateTime mLastCachedAllTimestamp;

		public List<T> CachedAll { get; private set; }

		public RepositoryCache(IRepositoryTimestampProvider repositoryTimestampProvider)
		{
			mRepositoryTimestampProvider = repositoryTimestampProvider;
		}

		public void CacheAll(List<T> all)
		{
			mLastCachedAllTimestamp = mRepositoryTimestampProvider.GetResourceLastWriteTime();
			CachedAll = all;
		}

		public bool CachedAllIsValid()
		{
			return CachedAll != null && DateTime.Compare(mLastCachedAllTimestamp, mRepositoryTimestampProvider.GetResourceLastWriteTime()) == 0;
		}
	}
}
