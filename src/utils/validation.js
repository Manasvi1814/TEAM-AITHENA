// Validation utility functions
export const validation = {
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  isNotEmpty: (value) => {
    return value && value.trim().length > 0;
  },

  validateForm: (formData, rules) => {
    const errors = {};

    Object.keys(rules).forEach(field => {
      const value = formData[field];
      const fieldRules = rules[field];

      if (fieldRules.required && !validation.isNotEmpty(value)) {
        errors[field] = `${field} is required`;
      }

      if (value && fieldRules.email && !validation.isValidEmail(value)) {
        errors[field] = 'Invalid email format';
      }

      if (value && fieldRules.password && !validation.isValidPassword(value)) {
        errors[field] = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }

      if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
      }
    });

    return errors;
  }
};