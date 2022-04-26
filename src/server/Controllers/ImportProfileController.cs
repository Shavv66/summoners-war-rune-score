using Microsoft.AspNetCore.Mvc;
using SwrsServer.Components.ProfileImport;

namespace SwrsServer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ImportProfileController
	{
		private readonly IProfileImportService _profileImportService;

		public ImportProfileController(IProfileImportService profileImportService)
		{
			_profileImportService = profileImportService;
		}

		[HttpPut("{filePath}")]
		public void ImportProfile(string filePath)
		{
			_profileImportService.ImportFile(filePath);
		}
	}
}
