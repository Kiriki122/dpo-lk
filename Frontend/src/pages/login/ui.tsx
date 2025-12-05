import { Container } from "@mui/material";

import { LoginFormWidget } from "@/widgets/login-form";

export const LoginPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <LoginFormWidget />
    </Container>
  );
};

export default LoginPage;
