// index.js
import { Box, Container } from "@chakra-ui/react";
import ContentForm from "../components/ContentForm";
import Header from "../components/Header";

export default function Home() {
  return (
    <Box
      minH="100vh"
      bg="gray.900"
    >
      <Header />
      <Container maxW="container.md" mt={8} pb={8}>
        <ContentForm />
      </Container>
    </Box>
  );
}