import ProductCard from "./ProductCard";

const ProductList = ({ products }: any) => {
  return (
    <>
      {products.map((product: any) => (
        <ProductCard
          id={product.id}
          productName={product.productName}
          thumbnail={product.thumbnail}
          subcategory={product.subcategory}
          category={product.category}
        />
      ))}
    </>
  );
};

export default ProductList;
    