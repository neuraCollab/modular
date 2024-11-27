import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  Select,
  SimpleGrid,
  Textarea,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

const Form1: React.FC<{ control: any }> = ({ control }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
        Заполните небольшую анкету
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="firstName" fontWeight="normal">
           Имя 
          </FormLabel>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} id="firstName" placeholder="First Name" />}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName" fontWeight="normal">
            Фамилия
          </FormLabel>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} id="lastName" placeholder="Last Name" />}
          />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight="normal">
          Почта
        </FormLabel>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} id="email" type="email" />}
        />
        <FormHelperText>Мы никогда не разглашаем вашу почту.</FormHelperText>
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="password" fontWeight="normal">
          Пароль
        </FormLabel>
        <InputGroup size="md">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
              />
            )}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Спрятать' : 'Показать'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const Form2: React.FC<{ control: any }> = ({ control }) => {
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
        Детали
      </Heading>
      <FormControl>
        <FormLabel htmlFor="country" fontWeight="md">
          Страна / регион
        </FormLabel>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} id="country" placeholder="Выберите страну">
              <option value="RU">Россия</option>
              <option value="KZ">Казахстан</option>
              <option value="BL">Белорусь</option>
            </Select>
          )}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="streetAddress" fontWeight="md">
          Адрес улица
        </FormLabel>
        <Controller
          name="streetAddress"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} id="streetAddress" placeholder="Street Address" />}
        />
      </FormControl>
      <SimpleGrid columns={2} spacing={4} mt="2%">
        <FormControl>
          <FormLabel htmlFor="city" fontWeight="md">
            Город
          </FormLabel>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} id="city" placeholder="City" />}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="state" fontWeight="md">
            Деревня
          </FormLabel>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} id="state" placeholder="State" />}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="postalCode" fontWeight="md">
            Почтовый код
          </FormLabel>
          <Controller
            name="postalCode"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} id="postalCode" placeholder="ZIP Code" />}
          />
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const Form3: React.FC<{ control: any }> = ({ control }) => {
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
        Социальная информация
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl>
          <FormLabel htmlFor="website" fontWeight="md">
            Website
          </FormLabel>
          <InputGroup>
            <InputLeftAddon>http://</InputLeftAddon>
            <Controller
              name="website"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} id="website" placeholder="www.example.com" />}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="about" fontWeight="md">
            О себе
          </FormLabel>
          <Controller
            name="about"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea {...field} id="about" placeholder="Короткая информация о себе..." />
            )}
          />
          <FormHelperText>URLs это гиперссылки.</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const MultistepForm: React.FC = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    toast({
      title: 'Form Submitted',
      description: JSON.stringify(data, null, 2),
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      m="10px auto"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
      {step === 1 && <Form1 control={control} />}
      {step === 2 && <Form2 control={control} />}
      {step === 3 && <Form3 control={control} />}
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Button
            onClick={() => {
              setStep(step - 1);
              setProgress(progress - 33.33);
            }}
            isDisabled={step === 1}
            colorScheme="teal"
          >
            Назад
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => {
                setStep(step + 1);
                setProgress(progress + 33.33);
              }}
              colorScheme="teal"
            >
              Вперед
            </Button>
          ) : (
            <Button type="submit" colorScheme="green">
              Отправить
            </Button>
          )}
        </Flex>
      </ButtonGroup>
    </Box>
  );
};

export default MultistepForm;
