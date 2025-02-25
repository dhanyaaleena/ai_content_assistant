import { Box, Container } from "@chakra-ui/react";
import ContentForm from "../components/ContentForm";
import Header from "../components/Header";

export default function Home() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, gray.900, gray.800)" // Gradient background
    >
      <Header />
      <Container maxW="container.md" mt={8} pb={8}>
        <ContentForm />
      </Container>
    </Box>
  );
}