import LoginForm from "../../app/components/LoginForm";
import { Box, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Box
      sx={{

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0, // Asegura que no haya márgenes
        padding: 0, // Sin padding extra
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize:40,color: "#black", marginBottom: "10px" }}>
          Login
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}
