import jQuery from 'jquery';
import utils from '../utils.js';

// THe value should be different from another input's value
jQuery.validator.addMethod(
    'different',
    function (value, element, param) {
        // Re-run validation if the other element's value changes
        utils.bindChangeToOtherElement('different', param, element, this);

        var otherValue = jQuery(param).val();

        // If the other elem's empty or not the same return true
        return otherValue == '' || otherValue != value;
    },
    'This value is not acceptable.'
);

// THe value should be distinct within its sibling checkboxes
jQuery.validator.addMethod(
    'distinct',
    function (value, element) {
        // Only validate checkboxes
        if (jQuery(element).attr('type') != 'checkbox')
            return true;

        // get checked inputs
        var checkedInputs = $('input[name="' + jQuery(element).attr('name') + '"]:checked');
        var inputValues = [];
        var allUnique = true;

        if (checkedInputs.length > 0) {
            checkedInputs.each(function () {
                if (inputValues.indexOf($(this).val()) > -1) {
                    allUnique = false;
                }
                inputValues.push($(this).val())
            });
        }

        return allUnique;
    },
    'A duplicate value has been selected.'
);

// The value should be located in one of the checkbox's checked values
jQuery.validator.addMethod('inArray', function (value, element, otherFieldName) {
    var thisElement = jQuery(element);

    var values = [];

    // Check if we're dealing with a text field
    if (otherFieldName.substring(0, 1) == '#') {
        // Bind a change event
        utils.bindChangeToOtherElement('inArray', otherFieldName, element, this, true);

        // If it's a text field we're assuming that it's a list of comma separated values
        return jQuery(otherFieldName).val().split(',').indexOf(value) > -1;
    }

    var self = this;
    // Bind a change handler to the checkboxes
    jQuery('input:checkbox[name="' + otherFieldName + '"]').each(function () {
        utils.bindChangeToOtherElement('inArray', this, element, self, true);
    });

    // Get the selected values of a checkbox by it's name
    jQuery('input:checkbox[name="' + otherFieldName + '"]:checked').each(function () {
        values.push(jQuery(this).val());
    });

    // Check if the value is in there
    return values.indexOf(value) > -1;
}, 'This value is incorrect.');