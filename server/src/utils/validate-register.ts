import { UserInput } from "../schemas/user-input";

export const validateRegister = (options: UserInput) => {
    // https://stackoverflow.com/questions/46370725/how-to-do-email-validation-using-regular-expression-in-typescript
    const emailRegexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const panNumberRegexp = new RegExp(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
    const GSTNumberRegexp = new RegExp(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    );

    if (!options.email.match(emailRegexp)) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }

    if (!options.PANNumber.match(panNumberRegexp)) {
        return [
            {
                field: "PANNumber",
                message: "invalid PAN number",
            },
        ];
    }

    if (!options.GSTNumber.match(GSTNumberRegexp)) {
        return [
            {
                field: "GSTNumber",
                message: "invalid GST number",
            },
        ];
    }

    if (options.password.length <= 6) {
        return [
            {
                field: "password",
                message: "length must be greater than 6",
            },
        ];
    }
    if (options.PANName.length <= 6) {
        return [
            {
                field: "PANName",
                message: "length must be greater than 6",
            },
        ];
    }

    if (options.number.length < 10) {
        return [
            {
                field: "number",
                message: "length must be greater than 10",
            },
        ];
    }

    if (options.companyName.length <= 6) {
        return [
            {
                field: "companyName",
                message: "length must be greater than 6",
            },
        ];
    }
    if (options.confirmPassword.length <= 6) {
        return [
            {
                field: "confirmPassword",
                message: "length must be greater than 6",
            },
        ];
    }
    if (options.password !== options.confirmPassword) {
        return [
            {
                field: "password",
                message: "passwords must be equal",
            },
            {
                field: "confirmPassword",
                message: "passwords must be equal",
            },
        ];
    }

    if (options.firstName.length <= 2) {
        return [
            {
                field: "firstName",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.lastName.length <= 2) {
        return [
            {
                field: "lastName",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.address.length <= 2) {
        return [
            {
                field: "address",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.country.length <= 2) {
        return [
            {
                field: "country",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.state.length <= 2) {
        return [
            {
                field: "state",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.city.length <= 2) {
        return [
            {
                field: "city",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.pinCode.length != 6) {
        return [
            {
                field: "pinCode",
                message: "length must be equal to 6",
            },
        ];
    }

    return null;
};
