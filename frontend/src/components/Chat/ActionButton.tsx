import React from 'react';
import { Button } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface ActionButtonProps {
  className?: string;
  disabled?: boolean;
  icon: IconType;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  className = '',
  disabled = false,
  icon: Icon,
  onClick,
}) => {
  return (
    <Button
      className={className}
      isDisabled={disabled}
      onClick={onClick}
      size="lg"
      colorScheme="blue"
      borderRadius="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Icon size="20px" />
    </Button>
  );
};

export default ActionButton;
