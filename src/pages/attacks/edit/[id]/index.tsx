import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAttackById, updateAttackById } from 'apiSdk/attacks';
import { Error } from 'components/error';
import { attackValidationSchema } from 'validationSchema/attacks';
import { AttackInterface } from 'interfaces/attack';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ModelInterface } from 'interfaces/model';
import { UserInterface } from 'interfaces/user';
import { getModels } from 'apiSdk/models';
import { getUsers } from 'apiSdk/users';

function AttackEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AttackInterface>(
    () => (id ? `/attacks/${id}` : null),
    () => getAttackById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AttackInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAttackById(id, values);
      mutate(updated);
      resetForm();
      router.push('/attacks');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AttackInterface>({
    initialValues: data,
    validationSchema: attackValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Attack
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="type" mb="4" isInvalid={!!formik.errors?.type}>
              <FormLabel>Type</FormLabel>
              <Input type="text" name="type" value={formik.values?.type} onChange={formik.handleChange} />
              {formik.errors.type && <FormErrorMessage>{formik.errors?.type}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<ModelInterface>
              formik={formik}
              name={'model_id'}
              label={'Select Model'}
              placeholder={'Select Model'}
              fetcher={getModels}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'attack',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AttackEditPage);
