import { ProfileForm } from "@/features/user/components/profile-form";
import { useUpdateProfile } from "@/features/user/hooks/use-update-profile";

export const UserProfilePage = () => {
  const { userInfo, updateUserProfile, isProfileLoading } = useUpdateProfile();

  return (
    <div className="page-spacing">
      <ProfileForm
        onUpdateProfile={updateUserProfile}
        userInfo={userInfo}
        isUpdating={isProfileLoading}
      />
    </div>
  );
};
