const API_URL = 'http://localhost:3000/products';

export async function getAllProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Gagal mengambil data katalog barang');
  }
  return response.json();
}

export async function createProduct(productData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message;
    throw new Error(message || 'Gagal menambahkan barang');
  }
  return data;
}

export async function updateProduct(id, updatedData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message;
    throw new Error(message || 'Gagal memperbarui barang');
  }
  return data;
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Gagal menghapus barang');
  }
  return data;
}