export const bmi_space = (bmi: number) => {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Healthy";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else if (bmi >= 30 && bmi < 34.9) {
    return "Obese";
  } else if (bmi >= 35 && bmi < 39.9) {
    return "Severely Obese";
  } else {
    return "Morbidly Obese";
  }
};
