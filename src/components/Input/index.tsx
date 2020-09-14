import React, {
  InputHTMLAttributes,
  ComponentType,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { Wrapper, InputContainer, Label, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  label?: string;
  icon?: ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  containerStyle = {},
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(!!inputRef.current?.value);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Wrapper hasLabel={!!label}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputContainer
        style={containerStyle}
        isInvalid={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        {Icon && <Icon size={20} />}

        <input
          id={name}
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle size={20} />
          </Error>
        )}
      </InputContainer>
    </Wrapper>
  );
};

export default Input;
