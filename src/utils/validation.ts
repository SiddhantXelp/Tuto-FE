import { toast } from 'react-toastify';



export interface ValidationRule {
    field: string;
    message: string;
    validate: (value: any) => boolean;
}

export const validateFormFinal = (
    formData: Record<string, any>,
    rules: ValidationRule[]
): boolean => {
    const validationErrors: string[] = [];

    rules.forEach(rule => {
        if (!rule.validate(formData[rule.field])) {
            validationErrors.push(rule.message);
        }
    });

    validationErrors.forEach(error => toast.error(error));

    return validationErrors.length === 0;
};
