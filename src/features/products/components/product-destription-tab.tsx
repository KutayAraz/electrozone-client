interface ProductDescriptionTabProps {
  productDescription: string[];
}

export const ProductDescriptionTab = ({ productDescription }: ProductDescriptionTabProps) => {
  console.log("product desc", productDescription);
  return (
    <ul>
      {productDescription.map((bulletPoint: string, index: number) => (
        <li className="mb-2" key={index}>
          - {bulletPoint}
        </li>
      ))}
    </ul>
  );
};
