import React from 'react';
import { Text } from '@chakra-ui/react';

export interface IErrorTextProps {
    error: string;
}

const ErrorText: React.FunctionComponent<IErrorTextProps> = (props) => {
    const { error } = props;

    if (error === '') return null;

    return (
        <Text color="red" fontSize="sm">
            {error}
        </Text>
    );
};

export default ErrorText;
