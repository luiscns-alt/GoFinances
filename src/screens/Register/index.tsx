import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';

import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from './styles';

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório'),
});

export function Register() {
    const [transactionsType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const dataKey = '@gofinances:transactions';

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData) {
        if (!transactionsType)
            return Alert.alert('Selecione o tipo da transação');

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionsType,
            category: category.key,
            date: new Date(),
        };

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormtted = [...currentData, newTransaction];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormtted));

            setTransactionType('');
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível salvar');
        }
    }

    useEffect(() => {
        async function loadData() {
            const data = await AsyncStorage.getItem(dataKey);
            console.log(JSON.parse(data!));
        }
        loadData();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Income"
                                onPress={() =>
                                    handleTransactionTypeSelect('up')
                                }
                                isActive={transactionsType === 'up'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                isActive={transactionsType === 'down'}
                                onPress={() =>
                                    handleTransactionTypeSelect('down')
                                }
                            />
                        </TransactionsTypes>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button
                        onPress={handleSubmit(handleRegister)}
                        title="Enviar"
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectorCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}
