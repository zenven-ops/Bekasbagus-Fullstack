import { useEffect, useState } from 'react';

const INITIAL_FORM = {
  nama: '',
  kategori: 'Elektronik',
  harga: '',
  kondisi: 'Mulus (Like New)',
  lokasi: '',
  bisaCod: true,
  gambar: '',
};

export default function ProductForm({ onSaveProduct, editingProduct, onCancelEdit }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        nama: editingProduct.nama || '',
        kategori: editingProduct.kategori || 'Elektronik',
        harga: editingProduct.harga || '',
        kondisi: editingProduct.kondisi || 'Mulus (Like New)',
        lokasi: editingProduct.lokasi || '',
        bisaCod: editingProduct.bisaCod ?? true,
        gambar: editingProduct.gambar || '',
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setErrorMsg('');
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const payload = {
      nama: formData.nama.trim(),
      kategori: formData.kategori,
      harga: Number(formData.harga),
      kondisi: formData.kondisi,
      lokasi: formData.lokasi.trim(),
      bisaCod: Boolean(formData.bisaCod),
      gambar:
        formData.gambar.trim() ||
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    };

    try {
      setSubmitting(true);
      await onSaveProduct(payload);
      setFormData(INITIAL_FORM);
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat menyimpan data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="mb-6">
        <label className="block font-medium text-sm mb-2">URL Foto Barang (Opsional)</label>
        <input
          type="text"
          name="gambar"
          value={formData.gambar}
          onChange={handleChange}
          placeholder="https://contoh.com/foto-barang.jpg (kosongkan untuk foto default)"
          className="w-full p-3 border border-bdr rounded-lg focus:outline-none focus:border-primary text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium text-sm mb-2">Nama Barang</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Contoh: Lensa Canon 50mm"
            className="w-full p-3 border border-bdr rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-sm mb-2">Kategori</label>
          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="w-full p-3 border border-bdr rounded-lg bg-white focus:outline-none focus:border-primary"
          >
            <option value="Elektronik">Elektronik</option>
            <option value="Fashion">Fashion</option>
            <option value="Furnitur">Furnitur</option>
            <option value="Hobi & Koleksi">Hobi & Koleksi</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-sm mb-2">Harga (Rp)</label>
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            placeholder="Contoh: 1500000"
            className="w-full p-3 border border-bdr rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-sm mb-2">Kondisi Barang</label>
          <select
            name="kondisi"
            value={formData.kondisi}
            onChange={handleChange}
            className="w-full p-3 border border-bdr rounded-lg bg-white focus:outline-none focus:border-primary"
          >
            <option value="Mulus (Like New)">Mulus (Like New)</option>
            <option value="Bekas Baik">Bekas Baik</option>
            <option value="Minus">Minus</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-sm mb-2">Lokasi COD (Meet-up)</label>
        <input
          type="text"
          name="lokasi"
          value={formData.lokasi}
          onChange={handleChange}
          placeholder="Contoh: Jakarta Selatan, Kebayoran Baru"
          className="w-full p-3 border border-bdr rounded-lg focus:outline-none focus:border-primary"
          required
        />
      </div>

      <div className="bg-secondary p-4 rounded-lg flex items-center gap-3 mb-6">
        <input
          id="bisaCod"
          type="checkbox"
          name="bisaCod"
          checked={formData.bisaCod}
          onChange={handleChange}
          className="w-5 h-5 accent-primary cursor-pointer"
        />
        <label htmlFor="bisaCod" className="text-primary font-medium text-sm cursor-pointer">
          Aktifkan COD (Pembeli bisa ketemuan langsung)
        </label>
      </div>

      <div className="flex gap-3">
        {editingProduct && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="w-1/3 border border-bdr text-graytxt py-3 rounded-lg font-bold hover:bg-gray-50 transition"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition disabled:opacity-50"
        >
          {submitting
            ? 'Menyimpan...'
            : editingProduct
              ? 'Simpan Perubahan'
              : 'Posting Barang'}
        </button>
      </div>
    </form>
  );
}