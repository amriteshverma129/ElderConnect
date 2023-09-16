export type signUpFormType = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    selected: string;
    TermCondition: string;
    countryCode: string;
    otp: string;
    password: string;
    partnerCode: string;
    role: string;
    nameOfBusiness: string;
};

export type ErrorType = {
    firstNameErrorMessage?: string;
    lastNameErrorMessage?: string;
    emailErrorMessage?: string;
    phoneErrorMessage?: string;
    otpErrorMessage?: string;
    passwordErrorMessage?: string;
    nameErrorMessage?: string;
    cardNoErrorMessage?: string;
    expiryMonthErrorMessage?: string;
    expiryYearErrorMessage?: string;
    cardTypeErrorMessage?: string;
    partnerErrorMessage?: string;
    nameOfBusinessErrorMessage?: string;
};
