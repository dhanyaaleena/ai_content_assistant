// pages/index.js
import { Box, Container } from "@chakra-ui/react";
import ContentForm from "../components/ContentForm";
import Header from "../components/Header";

export default function Home() {
  return (
    <Box>
      <Header />
      <Container maxW="container.md" mt={8}>
        <ContentForm />
      </Container>
    </Box>
  );
}
