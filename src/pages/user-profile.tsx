import { ProfileForm } from "@/features/user/components/profile-form";
import { useUpdateProfile } from "@/features/user/hooks/use-update-profile";

export const UserProfilePage = () => {
  const { userInfo, submitProfile, isProfileLoading } = useUpdateProfile();

  return (
    <div className="page-spacing">
      <ProfileForm
        onUpdateProfile={submitProfile}
        userInfo={userInfo}
        isUpdating={isProfileLoading}
      />
    </div>
  );
};
