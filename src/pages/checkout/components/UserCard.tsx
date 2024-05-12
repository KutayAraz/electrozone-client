const UserCard = ({
  firstName,
  lastName,
  email,
  address,
  city,
}: UserCardProps) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md mb-6">
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
