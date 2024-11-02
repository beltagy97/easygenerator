import { AppShell, Avatar, Container, Group, Title, useMantineTheme, Text } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';

function Layout() {
  const theme = useMantineTheme();
  
  return (
    <AppShell
      padding="md"
      header={{ height: 80 }}
      styles={{
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      }}
    >
      <AppShell.Header 
        h={80} 
        styles={{
          header: {
            backgroundColor: theme.colors.gray[2],
            color: 'white',
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <Group h="100%" px="md" gap="sm">
          <Avatar 
            src="https://www.easygenerator.com/wp-content/uploads/2019/12/eg-logo.jpg" 
            alt="App Logo" 
            radius="xl" 
            size="lg" 
          />
          <Title order={3} style={{ fontWeight: 400, fontSize: '1.5rem', color: 'black' }}>
            EASY GENERATOR
          </Title>
        </Group>
      </AppShell.Header>

      <AppShell.Main style={{ padding: '20px 40px' }}>
        <Container size="md">
          <Outlet />
        </Container>
      </AppShell.Main>

      <AppShell.Footer h={60} p="md" styles={{
          footer: {
            backgroundColor: theme.colors.gray[1],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.dark[6],
            fontSize: '0.9rem',
          },
        }}
      >
        <Text>© 2024 EASYGENERATOR, All rights reserved.</Text>
      </AppShell.Footer>
    </AppShell>
  );
}

export default Layout;
