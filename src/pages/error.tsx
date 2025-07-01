import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine error status and message
  let errorStatus = "404";
  let errorMessage = "Page Not Found";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status.toString();
    errorMessage = error.statusText || "Something went wrong";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 4 : 6,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)"
              : "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: isMobile ? 80 : 120,
              color: theme.palette.error.main,
              opacity: 0.8,
              mb: 2,
            }}
          />

          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            {errorStatus}
          </Typography>

          <Typography variant={isMobile ? "h5" : "h4"} component="h2" sx={{ mb: 3 }}>
            {errorMessage}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "80%" }}>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
            removed, renamed, or is temporarily unavailable.
          </Typography>

          <Divider sx={{ width: "100%", mb: 4 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ minWidth: 150 }}
            >
              Go Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={{ minWidth: 150 }}
            >
              Home Page
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
