import { VariantType, useSnackbar } from 'notistack';

export const useSnack = () : any => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnack = (message: string, variant?: VariantType) : void => {
    enqueueSnackbar(message, { variant });
  };

  return {
    showSnack,
  };
};
