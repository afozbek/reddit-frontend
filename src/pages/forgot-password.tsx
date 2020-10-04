import { Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withApollo } from '../utils/withApollo';
import {
  ForgotPasswordMutationVariables,
  useForgotPasswordMutation,
} from './../generated/graphql';

const ForgotPassword: React.FC<{}> = () => {
  const [complete, setComplete] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();
  const handleSubmit = async (values: ForgotPasswordMutationVariables) => {
    await forgotPassword({ variables: values });
    setComplete(true);
  };

  return (
    <Wrapper variant='small'>
      <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) =>
          complete ? (
            <div>
              You will get a password reset link if the accosiated account
              exists. Please check your email.
            </div>
          ) : (
            <Form>
              <InputField
                placeholder='Please enter your email'
                name='email'
                label='Email'
                type='email'
              />

              <Button
                mt={4}
                variantColor='teal'
                width='100%'
                isLoading={isSubmitting}
                type='submit'
                cursor='pointer'
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
