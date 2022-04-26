using SwrsServer.Components.Domain;

namespace SwrsServer.Components.Filtering
{
	public interface IRuneFilteringService
    {
		List<Rune> FilterRunes(List<Rune> runes, Filter filter);
    }
}
