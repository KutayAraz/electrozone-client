import { PageHelmet } from "@/components/seo/PageHelmet";
import { ProfileForm } from "@/features/user/components/ProfileForm";
import { useUpdateProfile } from "@/features/user/hooks/useUpdateProfile";

export const UserProfilePage = () => {
  const { userInfo, submitProfile, isProfileLoading } = useUpdateProfile();

  return (
    <>
      <PageHelmet
        title="Profile | Electrozone"
        description="Update your personal information and contact details to keep your Electrozone profile up-to-date."
      />
      <div className="page-spacing">
        <ProfileForm
          onUpdateProfile={submitProfile}
          userInfo={userInfo}
          isUpdating={isProfileLoading}
        />
      </div>
    </>
  );
};
