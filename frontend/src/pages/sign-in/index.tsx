import { TextInput, PasswordInput, Button, Container, Title, Paper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSignIn } from './api/signin';
import { useState } from 'react';

export type SignInForm = {
    email: string;
    password: string;
}

function SignIn() {
    const navigate = useNavigate({ from: '/' })
    const [error, setError] = useState<string | null>(null);
    const { mutateAsync: signIn, isPending } = useSignIn();

    const form = useForm<SignInForm>({
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 8 ? null : 'Password must be at least 8 characters'),
        },
    });

    const handleSubmit = async (values: SignInForm, event: React.FormEvent<HTMLFormElement> | undefined) => {
        try {
        event?.preventDefault();
        const result = await signIn(values);
        localStorage.setItem('authToken', result.access_token);
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('username', result.user.username);

        navigate({to: '/home'})
        }catch(error: unknown){
            setError('Failed to Sign in');
        }
    
    };

    return (
        <Container size={500} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
            <Title ta="center" >Welcome Back</Title>
            <Text c="dimmed" size="sm" ta="center" mt="sm">Sign in to continue</Text>
            <Paper withBorder shadow="md" p={40} mt={30} radius="md" style={{ width: '100%', maxWidth: 400 }}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput label="Email" placeholder="you@example.com" {...form.getInputProps('email')} required />
                    <PasswordInput label="Password" placeholder="Your password" {...form.getInputProps('password')} required mt="md" />
                    {error && <Text color="red">{error}</Text>}
                    <Button type="submit" fullWidth mt="xl" radius="md" disabled={isPending}>
                        {isPending ? 'Logging in' :'Sign In'}
                        </Button>
                </form>
                <Text ta="center" mt="md">
                    Don’t have an account?{' '}
                    <Link to='/auth/sign-up'>
                        Sign up here
                    </Link>
                </Text>
            </Paper>
        </Container>
    );
}

export default SignIn;
