import { PageHelmet } from "@/components/seo/page-helmet";
import { ProfileForm } from "@/features/user/components/profile-form";
import { useUpdateProfile } from "@/features/user/hooks/use-update-profile";

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
