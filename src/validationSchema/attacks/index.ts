import * as yup from 'yup';

export const attackValidationSchema = yup.object().shape({
  type: yup.string().required(),
  model_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
