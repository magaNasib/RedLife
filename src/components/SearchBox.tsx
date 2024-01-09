
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useState } from 'react'

export const SearchBox = () => {

    const [value, setValue] = useState('')
    return (
        <InputGroup>
            <InputLeftElement >
                <SearchIcon />
            </InputLeftElement>
            <Input value={value} onChange={(e)=>setValue(e.target.value)}/>
        </InputGroup>
    )

}