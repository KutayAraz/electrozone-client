interface ProductDescriptionTabProps {
  productDescription: string[];
}

export const ProductDescriptionTab = ({ productDescription }: ProductDescriptionTabProps) => {
  return (
    <ul>
      {productDescription.map((bulletPoint: string) => (
        <li className="mb-2" key={bulletPoint}>
          - {bulletPoint}
        </li>
      ))}
    </ul>
  );
};
