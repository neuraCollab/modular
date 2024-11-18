import React from 'react';
import { Container } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

import useAuth from '../../hooks/useAuth';
import Card from '../../components/Account/Card';

export const Route = createFileRoute('/_layout/account')({
  component: Account,
});

function Account() {
  const { user: currentUser } = useAuth();

  return (
    <Container maxW="container.lg">
      {[1, 2].map((i) => (
        <Card key={i}/>
      ))}
    </Container>
  );
}
