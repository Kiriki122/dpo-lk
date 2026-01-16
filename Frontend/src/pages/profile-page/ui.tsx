import PersonIcon from "@mui/icons-material/Person";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardHeader,
} from "@mui/material";

import { useUserProfile } from "@/features/profile";

export const ProfilePage = () => {
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
          <Typography variant="h3" component="h1" gutterBottom>
            Профиль
          </Typography>
          <Card raised>
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
              <List sx={{ p: 0 }}>
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
          </Card>
        </>
      )}
    </>
  );
};

export default ProfilePage;
