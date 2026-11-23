export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="bg-white border border-bdr rounded-lg overflow-hidden transition hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="relative bg-lightbg h-[250px] overflow-hidden">
        <img
          src={product.gambar}
          alt={product.nama}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-dark text-xs font-medium px-2.5 py-1 rounded shadow-sm">
          {product.kategori}
        </span>
        <div className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A4B8C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-medium text-dark truncate mb-1">{product.nama}</h3>
        <p className="text-xs text-graytxt mb-2">{product.kondisi}</p>
        <p className="text-lg font-bold text-primary mb-3">
          Rp {Number(product.harga).toLocaleString('id-ID')}
        </p>

        <div className="flex justify-between items-center text-xs text-graytxt mb-4 mt-auto">
          {product.bisaCod ? (
            <span className="bg-secondary text-primary px-2 py-1 rounded font-semibold">
              Bisa COD
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded font-semibold">
              Kirim Kurir
            </span>
          )}
          <span className="truncate max-w-[130px]">{product.lokasi}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-bdr">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="py-1.5 px-3 text-xs font-semibold text-primary border border-primary rounded hover:bg-secondary transition"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(product.id)}
            className="py-1.5 px-3 text-xs font-semibold text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}