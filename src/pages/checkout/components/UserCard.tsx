const UserCard = ({ firstName, lastName, address, city }: UserCardProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6">
      <p className="text-xl font-semibold">
        {firstName} {lastName}
      </p>
      <p className="text-gray-500">{address}</p>
      <p className="text-gray-500">{city}</p>
    </div>
  );
};

export default UserCard;
