import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CaraCOD from './components/CaraCOD';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './services/productApi';

function App() {
  const [halamanAktif, setHalamanAktif] = useState('beranda');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat data dari server backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNavigasi = (halaman) => {
    if (halaman !== 'jual') {
      setEditingProduct(null);
    }
    setHalamanAktif(halaman);
  };

  const handleSaveProduct = async (payload) => {
    if (editingProduct) {
      const updated = await updateProduct(editingProduct.id, payload);
      setProducts((prev) =>
        prev.map((item) => (item.id === editingProduct.id ? updated : item))
      );
      setEditingProduct(null);
    } else {
      const created = await createProduct(payload);
      setProducts((prev) => [...prev, created]);
    }
    setHalamanAktif('beranda');
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setHalamanAktif('jual');
  };

  const handleDeleteProduct = async (id) => {
    const konfirmasi = window.confirm('Yakin ingin menghapus barang ini dari katalog?');
    if (!konfirmasi) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message || 'Gagal menghapus barang.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header setHalamanAktif={handleNavigasi} halamanAktif={halamanAktif} />

      <main className="flex-1">
        {halamanAktif === 'beranda' && (
          <>
            <Hero />
            <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 py-12">
              <Categories />
              <div className="flex justify-between items-center mb-6 mt-4">
                <h2 className="font-logo text-2xl text-dark tracking-wide">KATALOG BARANG</h2>
                <span className="text-sm text-graytxt">{products.length} barang tersedia</span>
              </div>

              {loading && (
                <p className="text-center text-graytxt py-10">Memuat katalog dari server...</p>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              {!loading && !error && (
                <ProductList
                  products={products}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteProduct}
                />
              )}
            </div>
          </>
        )}

        {halamanAktif === 'jual' && (
          <div className="max-w-3xl mx-auto px-5 py-12">
            <div className="text-center mb-10">
              <h1 className="font-logo text-3xl md:text-4xl text-primary mb-2">
                {editingProduct ? 'Edit Data Barang' : 'Jual Barang Bekasmu'}
              </h1>
              <p className="text-graytxt">
                {editingProduct
                  ? 'Perbarui informasi barang lalu simpan perubahan.'
                  : 'Isi formulir di bawah ini untuk memulai. Gratis, dan bisa COD!'}
              </p>
            </div>
            <div className="bg-white border border-bdr rounded-xl p-8 shadow-sm">
              <ProductForm
                onSaveProduct={handleSaveProduct}
                editingProduct={editingProduct}
                onCancelEdit={() => {
                  setEditingProduct(null);
                  setHalamanAktif('beranda');
                }}
              />
            </div>
          </div>
        )}

        {halamanAktif === 'cara-cod' && (
          <CaraCOD setHalamanAktif={handleNavigasi} />
        )}
      </main>

      <footer className="text-center p-10 border-t border-bdr text-graytxt text-sm mt-auto">
        <p>&copy; 2026 Bekasbagus. Jual beli barang second lebih mudah dan aman dengan COD.</p>
      </footer>
    </div>
  );
}

export default App;