import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: "This field is required",
        min: "This field should contain at least 0:{min} characters",
        max: "This field should contain less than 0:{max} characters",
        email: "Email is not valid",
        match: "Passwords don't match",
        lowercase:
          "This field should contain lowercase English letters and numbers",
      },
    },
    ka: {
      ...ka,
      messages: {
        required: "ეს ველი სავალდებულოა",
        min: "ეს ველი უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან",
        max: "ეს ველი უნდა შედგებოდეს მაქსიმუმ 0:{max} სიმბოლოსგან",
        email: "თქვენ მიერ შეყვანილი მეილი არასწორია",
        match: "პაროლები არ ემთხვევა",
        lowercase:
          "ეს ველი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს",
      },
    },
  }),
});
