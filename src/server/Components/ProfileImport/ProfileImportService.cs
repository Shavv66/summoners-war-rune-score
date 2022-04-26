using SwrsServer.Components.Domain.Constants;

namespace SwrsServer.Components.ProfileImport
{
	public class ProfileImportService : IProfileImportService
    {
        public void ImportFile(string filePath)
        {
			File.Copy(filePath, FileConstants.CURRENT_PROFILE_PATH, true);
        }
    }
}
