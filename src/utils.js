import jQuery from 'jquery';

/**
 * Helper functions.
 */
export default {
    parseArrayStringParameter: function (parameter) {
        var m = parameter.match(/^\s*\[(.*)\]\s*$/);

        if (!m)
            throw 'Requirement is not an array: "' + parameter + '"';

        return m[1].replace(/\'+/g, '').split(',');
    },
    /**
     * This is used by various validation rules that rely on another input for validation.
     *
     * This function adds a 'change' event listener which forces the original to be validated again.
     *
     * @param rule              Name of the rule this change handler is for
     * @param otherElement      Which element to bind this to
     * @param element           The element which this bind request is coming from
     * @param jQvalidator       The validator instance
     * @param originalNotEmpty  Should the original element not be empty? (optional, default false)
     */
    bindChangeToOtherElement: function (rule, otherElement, element, jQvalidator, originalNotEmpty) {
        var $elem = jQuery(otherElement);
        var elData = $elem.data('larajqv-rules');

        // None were added yet, initialise
        if (elData === undefined) {
            elData = [rule];
            $elem.data('larajqv-rules', elData);
        }
        // Initialised, but not present
        else if (elData.indexOf(rule) == -1) {
            elData.push(rule);
            $elem.data('larajqv-rules', elData);
        }
        // Already bound
        else {
            return;
        }

        // If not yet bound
        $elem.on('change', function () {
            if (originalNotEmpty === true && $elem.val() != '') {
                jQvalidator.element(jQuery(element).attr('id'));
            }
            else if (originalNotEmpty !== true) {
                jQvalidator.element(jQuery(element).attr('id'));
            }
        });
    }
};