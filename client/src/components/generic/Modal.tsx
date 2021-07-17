import {
  Heading,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

export interface IModalProps {
  title: string
  onClose: () => void
  isOpen: boolean
}

export const Modal: React.FC<IModalProps> = ({
  children,
  onClose,
  isOpen,
  title,
}) => {
  return (
    <ChakraModal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        padding={12}
        maxWidth="fit-content"
        backgroundColor="background.900"
        position="relative"
      >
        <ModalHeader>
          <Heading color="text.600" textAlign="center">
            {title}
          </Heading>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
