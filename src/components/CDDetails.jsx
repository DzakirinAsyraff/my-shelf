export default function CDDetails({ cd, onClose }) {
  if (!cd) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
        <button onClick={onClose} className="float-right text-gray-400 hover:text-black">✕</button>
        <img src={cd.cover} alt={cd.title} className="rounded-xl w-full h-56 object-cover mb-4" />
        <h2 className="text-xl font-bold">{cd.title}</h2>
        <p className="text-gray-500">{cd.artist} • {cd.year}</p>
        <ul className="mt-4 space-y-1">
          {cd.tracks.map((track, idx) => (
            <li key={idx} className="text-sm">{idx+1}. {track}</li>
          ))}
        </ul>
        <a
          href={cd.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className="block mt-4 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
        >
          Open in Spotify
        </a>
      </div>
    </div>
  );
}
