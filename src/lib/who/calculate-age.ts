export function calculateAgeInMonth(
  birthDate: Date,
  checkDate: Date
) {
  const years =
    checkDate.getFullYear() -
    birthDate.getFullYear();

  const months =
    checkDate.getMonth() -
    birthDate.getMonth();

  return years * 12 + months;
}