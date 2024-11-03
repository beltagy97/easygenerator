import { TextInput, PasswordInput, Button, Container, Title, Paper, Text, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSignUp } from './api/signup';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { AuthResponseType } from '../../shared/types';

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate({ from: '/auth/sign-up' });
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: signUp, isPending } = useSignUp();

  const form = useForm<SignUpForm>({
    initialValues: { name: '', email: '', password: '' },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Name is required'),
      email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email format'),
      password: (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters long';
        if (!/[a-zA-Z]/.test(value)) return 'Password must contain at least one letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one special character';
        return null;
      },
    },
  });
  
  const handleSubmit = async (values: SignUpForm) => {
    try {
      setError(null);
      const validationResult = form.validate();
      if(validationResult.hasErrors) {
        return;
      }
      const result = await signUp(values);
      localStorage.setItem('authToken', result.access_token);
      localStorage.setItem('email', result.user.email);
      localStorage.setItem('username', result.user.username);

      navigate({ to: '/home' });
    } catch (error: unknown) {
      const axiosError: AuthResponseType = (error as AxiosError).response?.data as AuthResponseType;
      setError(`${axiosError.message}`);
    }
  };

  return (
    <Container size={800} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '14vh' }}>
      <Title ta="center" c="brand">Get Started</Title>
      <Text c="dimmed" size="sm" ta="center" mt="sm">Create your account to start using the app</Text>
      <Paper withBorder shadow="md" p={40} mt={30} radius="md" style={{ width: '100%', maxWidth: 400 }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Ahmad"
              {...form.getInputProps('name')}
              error={form.errors.name}
              required
            />
            <TextInput
              label="Email"
              placeholder="you@easygenerator.com"
              {...form.getInputProps('email')}
              error={form.errors.email}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
              error={form.errors.password}
              required
            />
            {error && <Text c="red">{error}</Text>}
          </Stack>
          <Button type="submit" fullWidth mt="xl" radius="md" disabled={isPending}>
            {isPending ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignUp;
