// ContentForm.js
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  HStack,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "../utils/api";
import {
  FiType,
  FiMail,
  FiHash,
  FiUsers,
  FiFileText,
  FiArrowRight,
  FiSmile,
  FiCopy,
  FiAtSign
} from "react-icons/fi";

const ContentForm = () => {
  const [formData, setFormData] = useState({
    contentType: "social_media",
    tone: "casual",
    length: 300,
    emailType: "personal",
    socialMediaType: "Instagram",
    keywords: "",
    mentions: "",
    style: "humorous",
  });
  const [result, setResult] = useState("");
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/generate_content", {
        // ... existing submit logic
      });
      setResult(response.data.generated_text);
    } catch (error) {
      console.error("Error generating text:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg="gray.800"
      p={8}
      rounded="xl"
      shadow="xl"
      width="100%"
      mx="auto"
      mt={6}
      color="white"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          {/* Content Type */}
          <FormControl isRequired>
            <HStack mb={2}>
              <Icon as={FiType} w={5} h={5} color="cyan.300" />
              <FormLabel m={0}>Content Type</FormLabel>
            </HStack>
            <Select
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: "cyan.500" }}
              _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
            >
              <option value="email">Email</option>
              <option value="social_media">Social Media</option>
            </Select>
          </FormControl>

          {/* Conditional Email Type */}
          {formData.contentType === "email" && (
            <FormControl isRequired>
              <HStack mb={2}>
                <Icon as={FiMail} w={5} h={5} color="cyan.300" />
                <FormLabel m={0}>Email Type</FormLabel>
              </HStack>
              <Select
                name="emailType"
                value={formData.emailType}
                onChange={handleChange}
                bg="gray.700"
                borderColor="gray.600"
                _hover={{ borderColor: "cyan.500" }}
                _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
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
              <HStack mb={2}>
                <Icon as={FiUsers} w={5} h={5} color="cyan.300" />
                <FormLabel m={0}>Social Media Platform</FormLabel>
              </HStack>
              <Select
                name="socialMediaType"
                value={formData.socialMediaType}
                onChange={handleChange}
                bg="gray.700"
                borderColor="gray.600"
                _hover={{ borderColor: "cyan.500" }}
                _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
              >
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="TikTok">TikTok</option>
              </Select>
            </FormControl>
          )}

          {/* Tone and Style */}
          <HStack w="100%" spacing={6}>
            <FormControl isRequired>
              <HStack mb={2}>
                <Icon as={FiSmile} w={5} h={5} color="cyan.300" />
                <FormLabel m={0}>Tone</FormLabel>
              </HStack>
              <Select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                bg="gray.700"
                borderColor="gray.600"
                _hover={{ borderColor: "cyan.500" }}
                _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="informative">Informative</option>
                <option value="urgent">Urgent</option>
                <option value="casual">Casual</option>
                <option value="persuasive">Persuasive</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <HStack mb={2}>
                <Icon as={FiFileText} w={5} h={5} color="cyan.300" />
                <FormLabel m={0}>Style</FormLabel>
              </HStack>
              <Select
                name="style"
                value={formData.style}
                onChange={handleChange}
                bg="gray.700"
                borderColor="gray.600"
                _hover={{ borderColor: "cyan.500" }}
                _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
              >
                <option value="formal">Formal</option>
                <option value="conversational">Conversational</option>
                <option value="humorous">Humorous</option>
                <option value="inspirational">Inspirational</option>
              </Select>
            </FormControl>
          </HStack>

          {/* Length Input */}
          <FormControl isRequired>
            <HStack mb={2}>
              <Icon as={FiArrowRight} w={5} h={5} color="cyan.300" />
              <FormLabel m={0}>Length (characters)</FormLabel>
            </HStack>
            <Input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: "cyan.500" }}
              _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
            />
          </FormControl>

          {/* Keywords */}
          <FormControl isRequired>
            <HStack mb={2}>
              <Icon as={FiHash} w={5} h={5} color="cyan.300" />
              <FormLabel m={0}>Keywords</FormLabel>
            </HStack>
            <Textarea
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="Separate keywords with commas"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: "cyan.500" }}
              _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
            />
          </FormControl>
          {/* Mentions for Social Media */}
{formData.contentType === "social_media" && (
  <FormControl>
    <HStack mb={2}>
      <Icon as={FiAtSign} w={5} h={5} color="cyan.300" />
      <FormLabel m={0}>Mentions</FormLabel>
    </HStack>
    <Textarea
      name="mentions"
      value={formData.mentions}
      onChange={handleChange}
      placeholder="Add @mentions, separated by commas"
      bg="gray.700"
      borderColor="gray.600"
      _hover={{ borderColor: "cyan.500" }}
      _focus={{ borderColor: "cyan.500", boxShadow: "none" }}
    />
  </FormControl>
)}

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="cyan"
            size="lg"
            width="100%"
            mt={6}
            rightIcon={<FiArrowRight />}
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            Generate Content
          </Button>
        </VStack>
      </form>

      {/* Result Display */}
      {result && (
        <Box
          mt={8}
          p={6}
          bg="gray.700"
          rounded="xl"
          border="1px solid"
          borderColor="gray.600"
          position="relative"
        >
          <HStack mb={4} spacing={2}>
            <Icon as={FiFileText} w={5} h={5} color="cyan.300" />
            <Text fontWeight="600">Generated Content</Text>
            <Button
              size="sm"
              ml="auto"
              leftIcon={<FiCopy />}
              onClick={copyToClipboard}
              variant="outline"
              _hover={{ bg: "gray.600" }}
            >
              Copy
            </Button>
          </HStack>
          <Box
            color="gray.100"
            whiteSpace="pre-wrap"
            fontSize="md"
            lineHeight="tall"
          >
            {result}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ContentForm;