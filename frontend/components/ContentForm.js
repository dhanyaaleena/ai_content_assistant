import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  StackDivider,
  useBreakpointValue,
  extendTheme,
  ChakraProvider
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "../utils/api";

// Custom Chakra UI theme with dark mode
const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Set dark mode as default
    useSystemColorMode: false,
  },
  colors: {
    background: "#1A202C", // Dark background
    text: "#E2E8F0", // Light text
    inputBg: "#2D3748", // Input background for contrast
    inputFocusBg: "#4A5568", // Input focus background
    buttonBg: "#2B6CB0", // Button background
    buttonHoverBg: "#2C5282", // Button hover background
  },
});

const ContentForm = () => {
  const [formData, setFormData] = useState({
    contentType: "email",          // Default to email
    tone: "professional",         // Default tone
    length: 300,                  // Default length
    emailType: "Sales",           // Default email type
    socialMediaType: "Instagram", // Default social media platform
    keywords: "",                 // Default keywords
    mentions: "",                 // Default mentions for social media
    style: "formal",              // Default style
  });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/generate_content", {
        content_type: formData.contentType,
        tone: formData.tone,
        length: formData.length,
        additional_data: {
          email_type: formData.contentType === "email" ? formData.emailType : undefined,
          social_media_type: formData.contentType === "social_media" ? formData.socialMediaType : undefined,
          keywords: formData.keywords.split(",").map((keyword) => keyword.trim()),
          mentions: formData.contentType === "social_media" ? formData.mentions.split(",").map((mention) => mention.trim()) : undefined,
          style: formData.style,
        },
      });
      setResult(response.data.generated_text);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        bg="background"
        p={6}
        rounded="md"
        shadow="md"
        // maxW="1200px"
        width="100%"
        mx="auto"
        mt={10}
        color="text"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} divider={<StackDivider borderColor="gray.200" />}>
            {/* Content Type Selector */}
            <FormControl isRequired>
              <FormLabel>Content Type</FormLabel>
              <Select
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                required
                bg="inputBg"
                color="text"
                _focus={{ bg: "inputFocusBg" }}
              >
                <option value="email">Email</option>
                <option value="social_media">Social Media</option>
              </Select>
            </FormControl>

            {/* Conditional Email Type */}
            {formData.contentType === "email" && (
              <FormControl isRequired>
                <FormLabel>Email Type</FormLabel>
                <Select
                  name="emailType"
                  value={formData.emailType}
                  onChange={handleChange}
                  required
                  bg="inputBg"
                  color="text"
                  _focus={{ bg: "inputFocusBg" }}
                >
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Personal">Personal</option>
                  <option value="Job Application">Job Application</option>
                  <option value="Follow-up">Follow-up</option>
                </Select>
              </FormControl>
            )}

            {/* Conditional Social Media Platform */}
            {formData.contentType === "social_media" && (
              <FormControl isRequired>
                <FormLabel>Social Media Platform</FormLabel>
                <Select
                  name="socialMediaType"
                  value={formData.socialMediaType}
                  onChange={handleChange}
                  required
                  bg="inputBg"
                  color="text"
                  _focus={{ bg: "inputFocusBg" }}
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="TikTok">TikTok</option>
                </Select>
              </FormControl>
            )}

            {/* Tone Selector */}
            <FormControl isRequired>
              <FormLabel>Tone</FormLabel>
              <Select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                required
                bg="inputBg"
                color="text"
                _focus={{ bg: "inputFocusBg" }}
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="informative">Informative</option>
                <option value="urgent">Urgent</option>
                <option value="casual">Casual</option>
                <option value="persuasive">Persuasive</option>
              </Select>
            </FormControl>

            {/* Style Selector */}
            <FormControl isRequired>
              <FormLabel>Style</FormLabel>
              <Select
                name="style"
                value={formData.style}
                onChange={handleChange}
                required
                bg="inputBg"
                color="text"
                _focus={{ bg: "inputFocusBg" }}
              >
                <option value="formal">Formal</option>
                <option value="conversational">Conversational</option>
                <option value="humorous">Humorous</option>
                <option value="inspirational">Inspirational</option>
              </Select>
            </FormControl>

            {/* Length Input */}
            <FormControl isRequired>
              <FormLabel>Length (in characters)</FormLabel>
              <Input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                placeholder="e.g., 300"
                required
                bg="inputBg"
                color="text"
                _focus={{ bg: "inputFocusBg" }}
              />
            </FormControl>

            {/* Keywords */}
            <FormControl isRequired>
              <FormLabel>Keywords</FormLabel>
              <Textarea
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="Enter keywords, separated by commas"
                required
                bg="inputBg"
                color="text"
                _focus={{ bg: "inputFocusBg" }}
              />
            </FormControl>

            {/* Mentions for Social Media */}
            {formData.contentType === "social_media" && (
              <FormControl>
                <FormLabel>Mentions</FormLabel>
                <Textarea
                  name="mentions"
                  value={formData.mentions}
                  onChange={handleChange}
                  placeholder="Enter mentions, separated by commas"
                  bg="inputBg"
                  color="text"
                  _focus={{ bg: "inputFocusBg" }}
                />
              </FormControl>
            )}

            {/* Submit Button */}
            <Button
              colorScheme="blue"
              type="submit"
              bg="buttonBg"
              _hover={{ bg: "buttonHoverBg" }}
            >
              Generate Content
            </Button>
          </VStack>
        </form>

        {/* Display Generated Result */}
        {result && (
          <Box mt={6} p={4} bg="background" shadow="md" rounded="md">
            <strong>Generated Content:</strong>
            <Box mt={2} color="text">{result}</Box>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default ContentForm;
