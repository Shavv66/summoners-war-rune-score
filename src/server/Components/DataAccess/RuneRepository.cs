using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SwrsServer.Components.DataAccess.Domain;
using SwrsServer.Components.DataAccess.Services;
using SwrsServer.Components.DataAccess.Tools;
using SwrsServer.Components.Domain;
using SwrsServer.Components.Domain.Constants;

namespace SwrsServer.Components.DataAccess
{
	public class RuneRepository : IRuneRepository, IRepositoryTimestampProvider
	{
		private readonly string mFilePath;
		private readonly IAsyncGetAllService<Rune> mAsyncGetAllService;
		private readonly RepositoryCache<Rune> mCache;

		public RuneRepository() : this(FileConstants.CURRENT_PROFILE_PATH, null)
		{
			mAsyncGetAllService = new AsyncGetAllService<Rune>(GetAll);
		}

		public RuneRepository(string filePath, IAsyncGetAllService<Rune> asyncGetAllService)
		{
			mFilePath = filePath;
			mAsyncGetAllService = asyncGetAllService;
			mCache = new RepositoryCache<Rune>(this);
		}

		public async Task<List<Rune>> GetAllAsync()
		{
			return await mAsyncGetAllService.GetTask();
		}

		public List<Rune> GetAll()
		{
			if (!File.Exists(mFilePath))
			{
				return new List<Rune>();
			}

			if (!mCache.CachedAllIsValid())
			{
				string json = File.ReadAllText(mFilePath);
				JObject profile = JObject.Parse(json);

				List<Rune> runes = ParseRunesJson(profile["runes"]);
				foreach (JObject monster in profile["unit_list"])
				{
					runes.AddRange(ParseRunesJson(monster["runes"]));
				}

				mCache.CacheAll(runes);
			}

			return mCache.CachedAll;
		}

		public DateTime GetResourceLastWriteTime()
		{
			return File.GetLastWriteTime(mFilePath);
		}

		private static List<Rune> ParseRunesJson(JToken jsonToken)
		{
			return jsonToken.Select(rune => JsonConvert.DeserializeObject<Rune>(JsonConvert.SerializeObject(rune))).ToList();
		}
	}
}
