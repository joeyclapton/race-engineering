import { Stack, Text } from "@chakra-ui/react";

const Card = ({
  heading,
  detail,
  label,
}: {
  heading: string;
  detail: string;
  label: string | number;
}) => {
  return (
    <Stack
      direction="column"
      bg="white"
      p={3}
      rounded="lg"
      spacing={1}
      width="100%"
      h="max-content"
    >
      <Text
        margin="10px"
        padding="10px"
        fontSize="12px"
        textAlign="center"
        fontWeight="semibold"
        ml={2}
        textTransform="uppercase"
        color="black.100"
      >
        {heading}
      </Text>
      <Text fontSize="sm" color="gray.500" lineHeight={1.3} noOfLines={2}>
        {detail}
      </Text>
      <Text fontSize="30" textAlign="center" color="black">
        {label || 0}
      </Text>
    </Stack>
  );
};

export default Card;
