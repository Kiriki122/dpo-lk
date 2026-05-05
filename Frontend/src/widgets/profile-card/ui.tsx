import PersonIcon from "@mui/icons-material/Person";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { LogoutButton } from "@/features/auth";
import { useUserProfile } from "@/features/profile/get-user-profile";
import { ChangePasswordButton } from "@/features/user/change-password";

export const ProfileCard = () => {
  const { data: user, isLoading, isError, error } = useUserProfile();
  const fullName = [user?.lastName, user?.firstName, user?.middleName].filter(Boolean).join(" ");
  return (
    <>
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      )}
      {isError && <Alert severity="error">{error.message}</Alert>}
      {!isLoading && !isError && (
        <>
          <Card>
            <CardHeader
              avatar={<PersonIcon fontSize="large" />}
              title="Профиль слушателя"
              slotProps={{
                titleTypography: {
                  variant: "h6",
                  color: "primary",
                },
              }}
              subheader="Персональные данные из учетной системы"
            />
            <CardContent>
              {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Информация представлена в ознакомительных целях. Редактирование данных недоступно.
              </Typography> */}
              <List disablePadding>
                <ListItem>
                  <ListItemText primary="ФИО" secondary={fullName || "Данные отсутствуют"} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="Электронная почта" secondary={user!.email || "Данные отсутствуют"} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary="Контактный телефон" secondary={user!.phone || "Данные отсутствуют"} />
                </ListItem>
              </List>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
              <ChangePasswordButton />
              <LogoutButton />
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
};
