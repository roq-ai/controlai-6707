import * as yup from 'yup';

export const modelValidationSchema = yup.object().shape({
  name: yup.string().required(),
  format: yup.string().required(),
  user_id: yup.string().nullable(),
});
