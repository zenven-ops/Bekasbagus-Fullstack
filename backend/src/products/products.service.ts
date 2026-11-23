import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      nama: 'Lensa Kamera Canon 50mm',
      kategori: 'Elektronik',
      harga: 1500000,
      kondisi: 'Mulus (Like New)',
      lokasi: 'Jakarta Selatan',
      bisaCod: true,
      gambar:
        'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600',
    },
    {
      id: 2,
      nama: 'Cangkir Keramik Estetik',
      kategori: 'Furnitur',
      harga: 45000,
      kondisi: 'Bekas Baik',
      lokasi: 'Bandung',
      bisaCod: true,
      gambar:
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600',
    },
    {
      id: 3,
      nama: 'Kursi Kerja Minimalis',
      kategori: 'Furnitur',
      harga: 350000,
      kondisi: 'Mulus (Like New)',
      lokasi: 'Surabaya',
      bisaCod: true,
      gambar:
        'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600',
    },
    {
      id: 4,
      nama: 'Mesin Tik Antik',
      kategori: 'Hobi & Koleksi',
      harga: 850000,
      kondisi: 'Terawat',
      lokasi: 'Yogyakarta',
      bisaCod: true,
      gambar:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    },
  ];

  private nextId = 5;

  create(createProductDto: CreateProductDto): Product {
    const isDuplicate = this.products.some(
      (item) =>
        item.nama.toLowerCase() === createProductDto.nama.toLowerCase() &&
        item.lokasi.toLowerCase() === createProductDto.lokasi.toLowerCase(),
    );
    if (isDuplicate) {
      throw new ConflictException(
        `Barang "${createProductDto.nama}" di lokasi ${createProductDto.lokasi} sudah terpasang di katalog.`,
      );
    }

    const lokasiLower = createProductDto.lokasi.trim().toLowerCase();
    if (
      createProductDto.bisaCod &&
      (lokasiLower === 'bebas' || lokasiLower === 'dimana saja')
    ) {
      throw new BadRequestException(
        'Lokasi COD tidak boleh diisi "bebas" atau "dimana saja". Tentukan titik temu publik yang jelas demi keamanan.',
      );
    }

    const newProduct: Product = {
      id: this.nextId++,
      ...createProductDto,
      gambar:
        createProductDto.gambar ||
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Barang dengan ID ${id} tidak ditemukan.`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Gagal memperbarui: barang dengan ID ${id} tidak ditemukan.`,
      );
    }

    this.products[index] = {
      ...this.products[index],
      ...updateProductDto,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Gagal menghapus: barang dengan ID ${id} tidak ditemukan.`,
      );
    }

    const deletedProduct = this.products.splice(index, 1)[0];
    return {
      message: `Barang "${deletedProduct.nama}" berhasil dihapus`,
      data: deletedProduct,
    };
  }
}