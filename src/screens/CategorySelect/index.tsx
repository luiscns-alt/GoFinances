import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Form/Button';
import { categories } from '../../util/categories';
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from './styles';

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: string;
    setCategory: (category: Category) => void;
    closeSelectorCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectorCategory,
}: Props) {
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecinar" />
            </Footer>
        </Container>
    );
}
