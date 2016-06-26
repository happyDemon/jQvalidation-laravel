import jQuery from 'jquery';
import utils from '../utils.js';

// The value should consist of letters
jQuery.validator.addMethod(
    'alpha',
    function (value, element, param) {
        return /^[a-z]+$/i.test(value);
    },
    'The value is in an invalid format.'
);

// THe value should consist of letters, dashes and underscores
jQuery.validator.addMethod(
    'alphaDash',
    function (value, element, param) {
        return /^[A-Za-z\-_\s]+$/.test(value);
    },
    'This value is not acceptable.'
);

// THe value should be alpha numeric
jQuery.validator.addMethod(
    'alphaNum',
    function (value, element) {
        return /^\w+$/i.test(value);
    },
    'This value is not acceptable.'
);

// Validate the value against a regex pattern
jQuery.validator.addMethod(
    'regex',
    function (value, element, param) {
        return new RegExp(param).test(value);
    },
    'The value is in an invalid format.'
);