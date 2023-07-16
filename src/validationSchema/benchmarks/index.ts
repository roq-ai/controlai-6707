import * as yup from 'yup';

export const benchmarkValidationSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
