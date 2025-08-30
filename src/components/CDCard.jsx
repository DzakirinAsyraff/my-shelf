export default function CDCard({ cd, onSelect }) {
  return (
    <div
      onClick={() => onSelect(cd)}
      className="cursor-pointer relative rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-black/20 pointer-events-none" />
      <img
        src={cd.cover}
        alt={cd.title}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="mt-2 text-base font-semibold text-center">{cd.title}</h3>
      <p className="text-sm text-gray-500 text-center">{cd.artist}</p>
    </div>
  );
}
