const UserCard = ({ firstName, lastName, address, city }: UserCardProps) => {
  return (
    <div>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{address}</p>
      <p>{city}</p>
    </div>
  );
};

export default UserCard;