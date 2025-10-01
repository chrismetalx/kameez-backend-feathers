export const fullName = () => async (context) => {
  const { result } = context;

  if (result && result.firstName) {
    const fullName = `${result.firstName || ''} ${result.lastName || ''}`.trim();

    result.fullName = fullName;
  }

  return context;
};