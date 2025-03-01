// Header.js
import { Box, Heading, Flex, Icon } from "@chakra-ui/react";
import { FaFeatherAlt } from "react-icons/fa"; // New writing-related icon
import { keyframes } from '@emotion/react';

const glow = keyframes`
  0% { filter: drop-shadow(0 0 2px rgba(96, 165, 250, 0.7)); }
  50% { filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.9)); }
  100% { filter: drop-shadow(0 0 2px rgba(96, 165, 250, 0.7)); }
`;

const Header = () => {
  return (
    <Box
      bg="gray.800"
      py={4}
      borderBottom="1px solid"
      borderColor="gray.700"
      boxShadow="sm"
    >
      <Flex
        maxW="container.md"
        mx="auto"
        align="center"
        px={4}
      >
        <Icon
          as={FaFeatherAlt} // Replaced with Feather (pen) icon
          w={7}
          h={7}
          color="cyan.400"
          mr={3}
          animation={`${glow} 3s infinite`}
        />
        <Heading
          size="lg"
          fontWeight="semibold"
          color="cyan.50"
          letterSpacing="tighter"
          animation={`${glow} 3s infinite`}
        >
          ContentGen AI
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
