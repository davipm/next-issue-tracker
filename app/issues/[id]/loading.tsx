import Skeleton from "@/components/skeleton";
import { Box, Card, Flex } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton height="5rem" />
        <Skeleton height="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}
