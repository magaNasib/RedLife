import {
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
  } from '@chakra-ui/react'
  import { forwardRef, useRef } from 'react'
  import { HiEye, HiEyeOff } from 'react-icons/hi'
  
  interface IProps{
    label:string
    name:string
    value:string
  }
  export const PasswordField = forwardRef<HTMLInputElement, IProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)
    
    const mergeRef = useMergeRefs(inputRef, ref)

    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }
  
    
    return (
      <>
        <FormLabel htmlFor="password">{props.label}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            {...props}
            id={props.name}
            ref={mergeRef}
            value={props.value}
            name={props.name}
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
          />
        </InputGroup>
      </>
    )
  })
  
  PasswordField.displayName = 'PasswordField'