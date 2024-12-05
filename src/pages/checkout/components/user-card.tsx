interface UserCardProps {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
}

export const UserCard = ({ firstName, lastName, email, address, city }: UserCardProps) => {
  return (
    <div className="mb-6 rounded-md bg-white px-4 py-2 shadow-md">
      <p className="text-xl font-semibold">
        {firstName} {lastName}
      </p>
      <p>{email}</p>
      <p>{address}</p>
      <p>{city}</p>
    </div>
  );
};
