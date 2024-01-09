import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { FbIcon, GoogleIcon, TwitterIcon } from './ProviderIcons'

const providers = [
  { name: 'Google', icon: <GoogleIcon /> },
  { name: 'Twitter', icon: <TwitterIcon /> },
  { name: 'Facebook', icon: <FbIcon /> },
]

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="secondary" spacing="4">
    {providers.map(({ name, icon }) => (
      <Button key={name} flexGrow={1}>
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
)