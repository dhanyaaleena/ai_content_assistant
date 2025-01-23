// components/Header.js
import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      bg="gray.800"  // Dark background
      color="white" // Light text color
      py={4}
      px={6}
      borderBottom="2px solid"  // Subtle border at the bottom
      borderColor="gray.600"    // Dark border to fit the theme
      display="flex"
      justifyContent="center"   // Centering the content horizontally
      alignItems="center"       // Vertically center content
    >
      <Heading size="md" fontWeight="semibold">
        AI-Powered Content Generator
      </Heading>
    </Box>
  );
};

export default Header;
