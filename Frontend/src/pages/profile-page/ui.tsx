import { Box, Typography } from "@mui/material";

import { ProfileCard } from "@/widgets/profile-card";
import { UserProfileAccordion } from "@/widgets/profile-update-docs";

export const ProfilePage = () => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Профиль
      </Typography>
      <Box display="flex" flexDirection="column" gap={4}>
        <ProfileCard />
        <UserProfileAccordion />
      </Box>
    </>
  );
};

export default ProfilePage;
