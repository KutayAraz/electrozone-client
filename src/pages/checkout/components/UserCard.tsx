const UserCard = ({
  firstName,
  lastName,
  email,
  address,
  city,
}: UserCardProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6 max-w-screen-lg text-gray-700">
      <p className="text-xl font-semibold">
        {firstName} {lastName}
      </p>
      <p>{email}</p>
      <p>{address}</p>
      <p>{city}</p>
    </div>
  );
};

export default UserCard;
