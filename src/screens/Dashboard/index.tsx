import React from 'react';

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
} from './styles';

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/82232848?v=4',
                            }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Name </UserName>
                        </User>
                    </UserInfo>
                </UserWrapper>

                <Icon name="power" />
            </Header>
        </Container>
    );
}
