import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransition,
} from './styles';

interface Props {
    title: string;
    amount: string;
    lastTransition: string;
    type: 'up' | 'down' | 'total';
}

const icon = {
    up: 'arrow-up-cicle',
    down: 'arrow-down-cicle',
    total: 'doll-sing',
};

export function HighlightCard({ type, title, amount, lastTransition }: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransition type={type}> {lastTransition}</LastTransition>
            </Footer>
        </Container>
    );
}
