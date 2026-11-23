import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Nama barang harus berupa teks' })
  @IsNotEmpty({ message: 'Nama barang tidak boleh kosong' })
  @MinLength(3, { message: 'Nama barang minimal 3 karakter' })
  nama: string;

  @IsString()
  @IsIn(['Elektronik', 'Fashion', 'Furnitur', 'Hobi & Koleksi'], {
    message:
      'Kategori harus salah satu dari: Elektronik, Fashion, Furnitur, atau Hobi & Koleksi',
  })
  kategori: string;

  @IsNumber({}, { message: 'Harga harus berupa angka' })
  @Min(1000, { message: 'Harga barang minimal Rp 1.000' })
  harga: number;

  @IsString()
  @IsNotEmpty({ message: 'Kondisi barang wajib diisi' })
  kondisi: string;

  @IsString()
  @MinLength(3, { message: 'Lokasi COD minimal 3 karakter' })
  lokasi: string;

  @IsBoolean({ message: 'Status bisaCod harus bernilai true atau false' })
  bisaCod: boolean;

  @IsOptional()
  @IsString()
  gambar?: string;
}