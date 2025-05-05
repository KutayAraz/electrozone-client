import { Email, LocationOn, Person } from "@mui/icons-material";

interface UserCardProps {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
}

export const UserCard = ({ firstName, lastName, email, address, city }: UserCardProps) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-md">
      <div className="mb-4 flex items-center border-b border-gray-100 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Person className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h3>
          <p className="text-sm text-gray-500">Shipping Information</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <div className="mr-3 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center text-blue-600">
            <Email fontSize="small" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-3 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center text-blue-600">
            <LocationOn fontSize="small" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Shipping Address</p>
            <p className="text-gray-700">{address}</p>
            <p className="text-gray-700">{city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
