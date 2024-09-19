import {
  VStack,
  ButtonGroup,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Heading,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

export default function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props}></Input>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
