import { Container, Title, Text, Button, Center, Stack } from '@mantine/core';

function WelcomePage() {
  return (
    <Container size="lg" style={{ minHeight: '100vh', position: 'relative', padding: 0 }}>
      <Center style={{ minHeight: '100vh' }}>
        <Stack align="center" gap="sm" p="xl">
          <Title ta="center" order={1} style={{ fontWeight: 700 }}>
            Welcome to the Application!
          </Title>
          <Text ta="center" size="lg" style={{ maxWidth: 500 }}>
            Experience the best tools and features to enhance your productivity. Join us and get started on your journey with us!
          </Text>
          <Button
            size="lg"
            radius="md"
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
            mt="lg"
          >
            Get Started
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}

export default WelcomePage;
