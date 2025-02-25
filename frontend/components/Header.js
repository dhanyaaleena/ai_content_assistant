import { Box, Heading } from "@chakra-ui/react";
import { keyframes } from '@emotion/react' 

const glow = keyframes`
  0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.7); }
  50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.9); }
  100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.7); }
`;

const Header = () => {
  return (
    <Box
      bg="gray.800"
      color="white"
      py={4}
      px={6}
      borderBottom="2px solid"
      borderColor="gray.600"
      display="flex"
      justifyContent="center"
      alignItems="center"
      boxShadow="lg"
    >
      <Heading
        size="md"
        fontWeight="semibold"
        animation={`${glow} 3s infinite ease-in-out`}
      >
        AI-Powered Content Generator
      </Heading>
    </Box>
  );
};

export default Header;