import { Image, Container, Title, Text, Button, SimpleGrid, rem } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';

export function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <Container styles={{
            root: {
                paddingTop: rem('80px'),
                paddingBottom: rem('80px')
            }
        }}>
            <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
                <Image src={'https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg'} />
                <div>
                    <Title fw={900} fs={rem('34px')}>Something is not right...</Title>
                    <Text c="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Button variant="outline" size="md" mt="xl" w='100%' onClick={() => navigate({to: '/'})}>
                        Get back to home page
                    </Button>
                </div>
                <Image src={'https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg'} display={'none'} />
            </SimpleGrid>
        </Container>
    );
}