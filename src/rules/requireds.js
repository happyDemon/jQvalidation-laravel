import jQuery from 'jquery';
import utils from '../utils.js';

// The value is required only if another input's value matched one of the defined ones.
// the parameter should be formatted as data-parsley-required-if="["#elementValueToCheck", "value1,value2,.."]"
jQuery.validator.addMethod('requiredIf', function (value, element, parameters) {
    // Normalise the parameters
    var values = (jQuery.isArray(parameters)) ? utils.parseArrayStringParameter(parameters) : parameters;

    // Get the other input's selector
    var field = values[0];

    // Get the values it should contain to mark this one as required
    parameters = values.slice(1);

    // make sure that the other element get's a change event
    utils.bindChangeToOtherElement('requiredIf', field, element, this);

    // Only required to check if the value is empty
    if (value.length == 0) {
        var fieldValue = jQuery(field).val();

        return parameters.indexOf(fieldValue) == -1;
    }

    return true;
}, 'This field is required.');


// The value is required if other field does not contain any of the specified values
// the parameter should be formatted as data-parsley-required-unless="["#elementValueToCheck", "value1,value2,.."]"
jQuery.validator.addMethod('requiredUnless', function (value, element, parameters) {
    // Normalise the parameters
    var values = (!jQuery.isArray(parameters)) ? utils.parseArrayStringParameter(parameters) : parameters;

    // Get the other input's selector
    var field = values[0];

    // Get the values it should contain to mark this one as required
    parameters = values.slice(1);

    // make sure that the other element get's a change event
    utils.bindChangeToOtherElement('requiredUnless', field, element, this);

    // Only required to check if the value is empty
    if (value.length == 0) {

        var fieldValue = jQuery(field).val();

        // It's not required if the input has one of the values
        return parameters.indexOf(fieldValue) > -1;
    }

    return true;
}, 'This field is required.');


// The value is required if  any of the inputs are present in the dom
// the parameter should be formatted as data-parsley-required-with="#elementValueToCheck,#elementValueToCheck,.."
jQuery.validator.addMethod('requiredWith', function (value, element, parameters) {
    // Normalise the parameters
    var allElements = (!jQuery.isArray(parameters)) ? utils.parseArrayStringParameter(parameters) : parameters;

    // Only validate if the char count is 0
    if (value.length == 0) {
        var AnyPresent = false;

        allElements.forEach(function (id) {
            var $elem = jQuery(id);

            // Check for changes on this other input
            utils.bindChangeToOtherElement('requiredWith', id, element, this);

            // If the element is in the dom and has a value
            if ($elem.length > 0 && $elem.val() != '') {
                AnyPresent = true;
            }
        });

        return !AnyPresent;
    }

    return true;
}, 'This field is required.');


// The value is required if all other inputs are present in the dom
// the parameter should be formatted as data-parsley-required-with-all="#elementValueToCheck,#elementValueToCheck,.."
jQuery.validator.addMethod('requiredWithAll', function (value, element, parameters) {
    // Normalise the parameters
    var allElements = (!jQuery.isArray(parameters)) ? utils.parseArrayStringParameter(parameters) : parameters;

    // Only validate if the char count is 0
    if (value.length == 0) {
        var AllPresent = true;

        allElements.forEach(function (id) {
            var $elem = jQuery(id);

            // Check for changes on this other input
            utils.bindChangeToOtherElement('requiredWithAll', id, element, this);

            // If the value isn't in the dom or is empty
            if ($elem.length == 0 || $elem.val() == '') {
                AllPresent = false;
            }
        });

        return !AllPresent;
    }

    return true;
}, 'This field is required.');


// The value is required if any of the inputs are not present in the dom
// the parameter should be formatted as data-parsley-required-with="#elementValueToCheck,#elementValueToCheck,.."

jQuery.validator.addMethod('requiredWithout', function (value, element, parameters) {
    // Normalise the parameters
    var allElements = (!jQuery.isArray(parameters)) ? utils.parseArrayStringParameter(parameters) : parameters;

    // Only validate if the char count is 0
    if (value.length == 0) {
        var AnyPresent = false;

        allElements.forEach(function (id) {
            var $elem = jQuery(id);

            // Check for changes on this other input
            utils.bindChangeToOtherElement('requiredWithAll', id, element, this);

            if ($elem.length == 0 || $elem.val() == '') {
                AnyPresent = true;
            }
        });

        return AnyPresent;
    }

    return true;
}, 'This field is required.');


// The value is required if all other inputs are not present in the dom
// the parameter should be formatted as data-parsley-required-with-all="#elementValueToCheck,#elementValueToCheck,.."
jQuery.validator.addMethod('requiredWithoutAll', function (value, element, parameters) {
    // Normalise the parameters
    var allElements = (!jQuery.isArray(parameters)) ? utils.parseArrayStringParameter(parameters) : parameters;

    // Only validate if the char count is 0
    if (value.length == 0) {
        var AllEmpty = true;

        allElements.forEach(function (id) {
            var $elem = jQuery(id);

            // Check for changes on this other input
            utils.bindChangeToOtherElement('requiredWithAll', id, element, this);

            if ($elem.length == 1 && $elem.val() != '') {
                AllEmpty = false;
            }
        });

        return AllEmpty;
    }

    return true;
}, 'This field is required.');