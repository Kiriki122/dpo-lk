import { Button, Container, Typography, useTheme } from "@mui/material";
import { Link } from "react-router";

export const NotFoundPage = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        py: 2,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        К сожалению, мы не смогли найти страницу, которую вы ищете. Возможно, она была перемещена или удалена.
      </Typography>
      <Button variant="contained" component={Link} to="/" size="large" replace>
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default NotFoundPage;
