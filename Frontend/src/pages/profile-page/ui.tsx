import { Box, Typography } from "@mui/material";

import { ProfileCard } from "@/widgets/profile-card";
import { UserProfileAccordion } from "@/widgets/profile-update-docs";
import { UploadUserDocsAccordion } from "@/widgets/profile-upload-docs";

export const ProfilePage = () => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Профиль
      </Typography>
      <Box display="flex" flexDirection="column" gap={4}>
        <ProfileCard />
        <UserProfileAccordion />
        <UploadUserDocsAccordion />
      </Box>
    </>
  );
};

export default ProfilePage;
