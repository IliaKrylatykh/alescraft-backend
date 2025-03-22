export class ProductResponse {
  id: number;

  createdAt: string;

  updatedAt: string;

  name: string;

  slug: string;

  description: string;

  price: number;

  images: string[];

  categoryId: number;

  userId: number | null;
}

// export class FullestProductResponse extends ProductResponse {
//   @ApiProperty({ type: GetCategoryResponse, description: 'Product category' })
//   category: GetCategoryResponse;
// }

// export class GetProductsResponse {
//   @ApiProperty({ type: [ProductResponse], description: 'string' })
//   products: ProductResponse[];

//   @ApiProperty({ example: 1 })
//   length: number;
// }
