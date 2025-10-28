
export const formatCuil = (cuil) => {
  const cleanedCuil = cuil.replace(/-/g, '');
  if (cleanedCuil.length === 11) {
    return `${cleanedCuil.slice(0, 2)}-${cleanedCuil.slice(2, 10)}-${cleanedCuil.slice(10)}`;
  } else if (cleanedCuil.length === 10) {
    return `${cleanedCuil.slice(0, 2)}-${cleanedCuil.slice(2, 9)}-${cleanedCuil.slice(9)}`;
  }
  return cuil;
};
