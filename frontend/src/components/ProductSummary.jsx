export default function ProductSummary({ products }) {
  const totalItems = products.length;
  const totalValue = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-secondary p-4 rounded-xl mb-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-primary font-medium">Total Barang Bekas</p>
        <h2 className="text-2xl font-bold text-primary">{totalItems} Item</h2>
      </div>
      <div className="text-right">
        <p className="text-sm text-primary font-medium">Estimasi Nilai</p>
        <h2 className="text-xl font-bold text-primary">Rp {totalValue.toLocaleString('id-ID')}</h2>
      </div>
    </div>
  );
}