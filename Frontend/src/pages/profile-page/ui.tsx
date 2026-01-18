import { Typography } from "@mui/material";

import { ProfileCard } from "@/widgets/profile-card";

export const ProfilePage = () => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Профиль
      </Typography>
      <ProfileCard />
    </>
  );
};

export default ProfilePage;
