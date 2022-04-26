﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SwrsServer.Components.DataAccess.Domain;
using SwrsServer.Components.DataAccess.Services;
using SwrsServer.Components.DataAccess.Tools;
using SwrsServer.Components.Domain;
using SwrsServer.Components.Domain.Constants;

namespace SwrsServer.Components.DataAccess
{
	public class SummonerRepository : ISummonerRepository, IRepositoryTimestampProvider
	{
		private readonly string mFilePath;
		private readonly IAsyncGetAllService<Summoner> mAsyncGetAllService;
		private readonly RepositoryCache<Summoner> mCache;

		public SummonerRepository() : this(FileConstants.CURRENT_PROFILE_PATH) { }

		public SummonerRepository(string filePath)
		{
			mFilePath = filePath;
			mAsyncGetAllService = new AsyncGetAllService<Summoner>(GetAll);
			mCache = new RepositoryCache<Summoner>(this);
		}

		public async Task<Summoner> GetAsync()
		{
			return (await GetAllAsync()).SingleOrDefault();
		}

		private async Task<List<Summoner>> GetAllAsync()
		{
			return await mAsyncGetAllService.GetTask();
		}

		private List<Summoner> GetAll()
		{
			if (!File.Exists(mFilePath))
			{
				return new List<Summoner>();
			}

			if (!mCache.CachedAllIsValid())
			{
				string json = File.ReadAllText(mFilePath);
				JObject profile = JObject.Parse(json);

				Summoner summoner = JsonConvert.DeserializeObject<Summoner>(JsonConvert.SerializeObject(profile["wizard_info"]));

				mCache.CacheAll(new List<Summoner> { summoner });
			}

			return mCache.CachedAll;
		}

		public DateTime GetResourceLastWriteTime()
		{
			return File.GetLastWriteTime(mFilePath);
		}
	}
}
