import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View``;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;
`;

export const Title = styled.Text``;
