/*!
 * jQvalidation-laravel.js
 * Version 0.1.0 - built Sun, Jun 26th 2016, 11:03 am
 * https://github.com/happyDemon/jQvalidation-laravel
 * Maxim Kerstens - <maxim.kerstens@gmail.com>
 * MIT Licensed
 */

// The source code below is generated by babel as
// jQvalidation-laravel is written in ECMAScript 6

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('moment')) : typeof define === 'function' && define.amd ? define(['jquery', 'moment'], factory) : global.LjQv = factory(global.jQuery, global.moment);
})(this, function (jQuery, moment) {
    'use strict';

    /**
     * Helper functions.
     */
    var utils = {
        parseArrayStringParameter: function parseArrayStringParameter(parameter) {
            var m = parameter.match(/^\s*\[(.*)\]\s*$/);

            if (!m) throw 'Requirement is not an array: "' + parameter + '"';

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
        bindChangeToOtherElement: function bindChangeToOtherElement(rule, otherElement, element, jQvalidator, originalNotEmpty) {
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
                    jQvalidator.element('#' + jQuery(element).attr('id'));
                } else if (originalNotEmpty !== true) {
                    console.log(jQuery(element).attr('id'));
                    jQvalidator.element('#' + jQuery(element).attr('id'));
                }
            });
        }
    };

    // The value should consist of letters
    jQuery.validator.addMethod('alpha', function (value, element, param) {
        return RegExp('/^[\pL\pM]+$/u').test(value);
    }, 'The value is in an invalid format.');

    // THe value should consist of letters, dashes and underscores
    jQuery.validator.addMethod('alphaDash', function (value, element, param) {
        return RegExp('/^[\pL\pM\pN_-]+$/u').test(value);
    }, 'This value is not acceptable.');

    // THe value should be alpha numeric
    jQuery.validator.addMethod('alphaNum', function (value, element) {
        return RegExp('/^[\pL\pM\pN]+$/u').test(value);
    }, 'A duplicate value has been selected.');

    // Validate the value against a regex pattern
    jQuery.validator.addMethod('regex', function (value, element, param) {
        return RegExp(param).test(value);
    }, 'The value is in an invalid format.');

    // Check if the value is within a comma-separated list (val1,val2,..)
    jQuery.validator.addMethod('in', function (value, element, param) {
        var possibles = param.split(',');

        return possibles.indexOf(value) > -1;
    }, 'The provided value is not present in the list.');

    // Check if the value is not in a comma-separated list (val1,val2,..)
    jQuery.validator.addMethod('notIn', function (value, element, param) {
        var possibles = param.split(',');

        return possibles.indexOf(value) == -1;
    }, 'The provided value is not present in the list.');

    // Valid date formats
    jQuery.validator.setDefaults({
        dateFormats: ['DD/MM/YY', 'DD/MM/YYYY', 'MM/DD/YY', 'MM/DD/YYYY', 'YY/MM/DD', 'YYYY/MM/DD']
    });

    // Check if the value is a date
    jQuery.validator.addMethod('date', function (value, element, state) {
        return moment(value, formatDatePhpToJs.getDateFormatsOption(this), true).isValid();
    }, 'You should provide a valid date.');

    // Check if the value is a date in a specific format
    jQuery.validator.addMethod('dateFormat', function (value, element, parameter) {
        return moment(value, formatDatePhpToJs.convert(parameter), true).isValid();
    }, 'The date you entered is not in the right format (%s).');

    // Check if the value is a date before the specified date
    jQuery.validator.addMethod('before', function (value, element, parameter) {
        var dateFormats = formatDatePhpToJs.getDateFormatsOption(this);

        var beforeDate = moment(parameter, dateFormats, true);

        // If it's not a valid date, error
        if (beforeDate === false) return false;

        return moment(value, dateFormats) < beforeDate;
    }, 'The date you entered should be before %s.');

    // Check if the value is a date before the specified date (from another input)
    jQuery.validator.addMethod('beforeInput', function (value, element, parameter) {
        var dateFormats = formatDatePhpToJs.getDateFormatsOption(this);
        var beforeInput = jQuery(parameter);

        // If we can't find the input, return true
        if (beforeInput.length == 0) return true;

        var beforeVal = beforeInput.val();

        // If the val is empty, return true
        if (beforeVal == '') return true;

        var beforeDate = moment(beforeVal, dateFormats, true);

        // If the before date isn't valid, error out
        if (beforeDate.isValid() === false) {
            console.warn(parameter + ' input does not contain a valid date');
            return false;
        }

        var thisDate = moment(value, dateFormats, true);

        // If the value's date isn't valid, error out
        if (thisDate.isValid() === false) {
            console.warn('the input being checked does not contain a valid date');
            return false;
        }

        return thisDate < beforeDate;
    }, 'The date you entered should be before %s.');

    // Check if the value is a date before the specified date
    jQuery.validator.addMethod('after', function (value, element, parameter) {
        var dateFormats = formatDatePhpToJs.getDateFormatsOption(this);
        var afterDate = moment(parameter, dateFormats, true);

        // If it's not a valid date, error
        if (afterDate === false) return false;

        return moment(value, dateFormats) > afterDate;
    }, 'The date you entered should be after %s.');

    // Check if the value is a date before the specified date (from another input)
    jQuery.validator.addMethod('afterInput', function (value, element, parameter) {
        var dateFormats = formatDatePhpToJs.getDateFormatsOption(this);
        var afterInput = jQuery(parameter);

        console.log(this, dateFormats);

        // If we can't find the input, return true
        if (afterInput.length == 0) return true;

        var afterVal = afterInput.val();

        // If the val is empty, return true
        if (afterVal == '') return true;

        var afterDate = moment(afterVal, dateFormats, true);

        // If the after date isn't valid, error out
        if (afterDate.isValid() === false) {
            console.warn(parameter + ' input does not contain a valid date');
            return false;
        }

        var thisDate = moment(value, dateFormats, true);

        // If the value's date isn't valid, error out
        if (thisDate.isValid() === false) {
            console.warn('the input being checked does not contain a valid date');
            return false;
        }

        return thisDate > afterDate;
    }, 'The date you entered should be after %s.');

    // convert PHP date format to moment JS date format
    var formatDatePhpToJs = window.formatDatePhpToJs = {
        mapChars: {
            d: 'DD',
            D: 'ddd',
            j: 'D',
            l: 'dddd',
            N: 'E',
            S: function S() {
                return '[' + this.format('Do', true).replace(/\d*/g, '') + ']';
            },
            w: 'd',
            z: function z() {
                return this.format('DDD', true) - 1;
            },
            W: 'W',
            F: 'MMMM',
            m: 'MM',
            M: 'MMM',
            n: 'M',
            t: function t() {
                return this.daysInMonth();
            },
            L: function L() {
                return this.isLeapYear() ? 1 : 0;
            },
            o: 'GGGG',
            Y: 'YYYY',
            y: 'YY',
            a: 'a',
            A: 'A',
            B: function B() {
                var thisUTC = this.clone().utc(),

                // Shamelessly stolen from http://javascript.about.com/library/blswatch.htm
                swatch = (thisUTC.hours() + 1) % 24 + thisUTC.minutes() / 60 + thisUTC.seconds() / 3600;
                return Math.floor(swatch * 1000 / 24);
            },
            g: 'h',
            G: 'H',
            h: 'hh',
            H: 'HH',
            i: 'mm',
            s: 'ss',
            u: '[u]', // not sure if moment has this
            e: '[e]', // moment does not have this
            I: function I() {
                return this.isDST() ? 1 : 0;
            },
            O: 'ZZ',
            P: 'Z',
            T: '[T]', // deprecated in moment
            Z: function Z() {
                return parseInt(this.format('ZZ', true), 10) * 36;
            },
            c: 'YYYY-MM-DD[T]HH:mm:ssZ',
            r: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
            U: 'X'
        },
        formatEx: /[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
        convert: function convert(PHPDateFormat) {
            return PHPDateFormat.replace(this.formatEx, function (phpStr) {
                return typeof formatDatePhpToJs.mapChars[phpStr] === 'function' ? formatDatePhpToJs.mapChars[phpStr].call(moment()) : formatDatePhpToJs.mapChars[phpStr];
            });
        },
        getDateFormatsOption: function getDateFormatsOption(jQvalidation) {
            return jQvalidation.settings.dateFormats;
        }
    };

    // THe value should be different from another input's value
    jQuery.validator.addMethod('different', function (value, element, param) {
        console.log(param, element);
        // Re-run validation if the other element's value changes
        utils.bindChangeToOtherElement('different', param, element, this);

        var otherValue = jQuery(param).val();

        console.log(otherValue, value);

        // If the other elem's empty or not the same return true
        return otherValue == '' || otherValue != value;
    }, 'This value is not acceptable.');

    // THe value should be distinct within its sibling checkboxes
    jQuery.validator.addMethod('distinct', function (value, element) {
        // Only validate checkboxes
        if (jQuery(element).attr('type') != 'checkbox') return true;

        // get checked inputs
        var checkedInputs = $('input[name="' + jQuery(element).attr('name') + '"]:checked');
        var inputValues = [];
        var allUnique = true;

        if (checkedInputs.length > 0) {
            checkedInputs.each(function () {
                if (inputValues.indexOf($(this).val()) > -1) {
                    allUnique = false;
                }
                inputValues.push($(this).val());
            });
        }

        return allUnique;
    }, 'A duplicate value has been selected.');

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

    // The value is required only if another input's value matched one of the defined ones.
    // the parameter should be formatted as data-parsley-required-if="["#elementValueToCheck", "value1,value2,.."]"
    jQuery.validator.addMethod('requiredIf', function (value, element, parameters) {
        // Normalise the parameters
        var values = jQuery.isArray(parameters) ? utils.parseArrayStringParameter(parameters) : parameters;

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
        var values = !jQuery.isArray(parameters) ? utils.parseArrayStringParameter(parameters) : parameters;

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
        var allElements = !jQuery.isArray(parameters) ? utils.parseArrayStringParameter(parameters) : parameters;

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
        var allElements = !jQuery.isArray(parameters) ? utils.parseArrayStringParameter(parameters) : parameters;

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
        var allElements = !jQuery.isArray(parameters) ? utils.parseArrayStringParameter(parameters) : parameters;

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
        var allElements = !jQuery.isArray(parameters) ? utils.parseArrayStringParameter(parameters) : parameters;

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

    var filesSizes = {
        b: 1,
        kb: 1024,
        mb: 1024 * 1024,
        gb: 1024 * 1024 * 1024
    };

    // Make sure all files within the inputs are equal to or smaller than the defined size.
    jQuery.validator.addMethod('fileSizeMax', function (value, element, params) {
        var maxSize = params[0];
        sizeMultiplyer = params[1].toLowerCase();
        var files = element.files;

        // Multiply the max file size
        maxSize = maxSize * filesSizes[sizeMultiplyer.toLowerCase()];

        console.log(maxSize);

        // If a file is present in the input
        if (files.length > 0) {
            // Loop over the files
            for (var i = 0; i < files.length; i++) {
                console.log(files[i].size);
                if (files[i].size > maxSize) {
                    return false;
                }
            }
        }

        return true;
    }, 'Your file(s) are too big.');

    // Make sure all files within the inputs are equal to or bigger than the defined size.
    jQuery.validator.addMethod('fileSizeMin', function (value, element, params) {
        var files = element.files;

        // Multiply the min file size
        var minSize = params[0] * filesSizes[params[1].toLowerCase()];

        // If a file is present in the input
        if (files.length > 0) {
            // Loop over the files
            for (var i = 0; i < files.length; i++) {
                if (files[i].size < minSize) {
                    return false;
                }
            }
        }

        return true;
    }, 'Your file(s) should are too small.');

    // Make sure all files within the inputs are between the defined sizes.
    jQuery.validator.addMethod('fileSizeBetween', function (value, element, params) {
        var files = element.files;

        // Multiply the file sizes
        var minSize = params[0] * filesSizes[params[2].toLowerCase()];
        var maxSize = params[1] * filesSizes[params[2].toLowerCase()];

        // If a file is present in the input
        if (files.length > 0) {
            // Loop over the files
            for (var i = 0; i < files.length; i++) {
                if (files[i].size <= minSize || files[i].size >= maxSize) {
                    return false;
                }
            }
        }

        return true;
    }, 'Your file(s) should be between %s and %s %s.');

    // Make sure all files within the input are an image
    jQuery.validator.addMethod('image', function (value, element, param) {
        var files = element.files;

        // If a file is present in the input
        if (files.length > 0) {
            // Loop over the files
            for (var i = 0; i < files.length; i++) {
                if (!files[i].type.match('image/*')) {
                    return false;
                }
            }
        }

        return true;
    }, 'This is not an image.');

    // Make sure all files within the input have one of the defined mimetypes
    jQuery.validator.addMethod('fileMimetype', function (value, element, mimetypes) {
        var allMimes = utils.parseArrayStringParameter(mimetypes);

        var files = element.files;

        // If a file is present in the input
        if (files.length > 0) {
            // Loop over the files
            for (var i = 0; i < files.length; i++) {
                if (allMimes.indexOf(files[i].type) == -1) {
                    return false;
                }
            }
        }

        return true;
    }, 'This file does not have the correct mimetype "%s".');

    // Make sure all files within the input have one of the defined extensions
    jQuery.validator.addMethod('fileExt', function (value, element, extensions) {
        var allExts = utils.parseArrayStringParameter(extensions);

        var files = element.files;

        // If a file is present in the input
        if (files.length > 0) {
            // Loop over the files
            for (var i = 0; i < files.length; i++) {
                var explodeNames = files[i].name.split('.');

                if (allExts.indexOf(explodeNames[explodeNames.length - 1]) == -1) {
                    return false;
                }
            }
        }

        return true;
    }, 'This file does not have the correct extensions.');

    // Make sure all images within the input have specific dimensions
    jQuery.validator.addMethod('dimensions', function (value, element, param) {
        var files = element.files;

        // @todo redo this?
        var options = jQuery.isJSON(param) ? param : JSON.parse(param);

        // If a file is present in the input
        if (files.length > 0) {
            var defer = jQuery.Deferred();
            var _URL = window.URL || window.webkitURL;

            var image = new Image();

            // Validate once t he image is loaded
            image.onload = function () {
                var width = this.width;
                var height = this.height;

                // Check min width, if defined
                if (typeof options.min_width != 'undefined') {
                    if (width < options.min_width) {
                        defer.reject(image);
                        return true;
                    }
                }

                // Check max width, if defined
                if (typeof options.max_width != 'undefined') {
                    if (width > options.max_width) {
                        defer.reject(image);
                        return true;
                    }
                }

                // Check min height, if defined
                if (typeof options.min_height != 'undefined') {
                    if (height < options.min_height) {
                        defer.reject(image);
                        return true;
                    }
                }

                // Check max height, if defined
                if (typeof options.max_height != 'undefined') {
                    if (height > options.max_height) {
                        defer.reject(image);
                        return true;
                    }
                }

                // Check width, if defined
                if (typeof options.width != 'undefined') {
                    if (width != options.width) {
                        defer.reject(image);
                        return true;
                    }
                }

                // Check height, if defined
                if (typeof options.height != 'undefined') {
                    if (height != options.height) {
                        defer.reject(image);
                        return true;
                    }
                }

                // Check ratio, if defined
                if (typeof options.ratio != 'undefined') {
                    var splitRatio = options.ratio.split(':');
                    if (splitRatio[0] / splitRatio[1] != width / height) {
                        defer.reject(image);
                        return true;
                    }
                }

                defer.resolve(image);
            };

            // On error, reject the promise
            image.onerror = function () {
                console.warn('image load error');
                defer.reject();
            };

            image.src = _URL.createObjectURL(files[0]);

            return defer.promise().then(function (image) {
                // Clean up
                image = null;

                return true;
            }, function (image) {
                // Clean up
                image = null;

                return false;
            });
        }

        return true;
    });

    /**
     * Overwrite core Parsley methods.
     *
     * @type {{_isRequired: Window.ParsleyExtend._isRequired}}
     */
    window.ParsleyExtend = jQuery.extend({}, window.ParsleyExtend, {
        // Normally this was intended Internal only.
        // Field is required if have required constraint without `false` value
        _isRequired: function _isRequired() {

            var requiredRules = [
            // This one comes out of the box with parsley
            'required',

            // These ones were added with this library
            'requiredIf', 'requiredUnless', 'requiredWith', 'requiredWithAll', 'requiredWithout', 'requiredWithoutAll'];

            var requiredRulesFound = [];

            // Loop over the list to check if they're defined on the field.
            requiredRules.forEach(function (rule) {
                if ('undefined' !== typeof this.constraintsByName[rule]) {
                    requiredRulesFound.push(rule);
                }
            }, this);

            // If there's not one required rule, return false
            if (requiredRulesFound.length == 0) return false;

            // If parsley's on required rule was found
            if (requiredRulesFound.indexOf('required') >= 0) {
                // Check if the flag is set to true
                return false !== this.constraintsByName.required.requirements;
            }

            return true;
        }
    });

    var main = utils;

    return main;
});
//# sourceMappingURL=laravel-jQvalidation.js.map
