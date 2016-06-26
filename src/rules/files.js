import jQuery from 'jquery';
import utils from '../utils.js';

var filesSizes = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
};

// Make sure all files within the inputs are equal to or smaller than the defined size.
jQuery.validator.addMethod('fileSizeMax', function (value, element, params) {
    params = (jQuery.isArray(params)) ? params : utils.parseArrayStringParameter(params);
    var maxSize = params[0];
    var sizeMultiplyer = params[1].toLowerCase().trim();
    var files = element.files;

    // Multiply the max file size
    maxSize = maxSize * filesSizes[sizeMultiplyer.toLowerCase()];

    // If a file is present in the input
    if (files.length > 0) {
        // Loop over the files
        for (var i = 0; i < files.length; i++) {
            if (files[i].size > maxSize) {
                return false;
            }
        }
    }

    return true;
}, 'Your file(s) are too big.');


// Make sure all files within the inputs are equal to or bigger than the defined size.
jQuery.validator.addMethod('fileSizeMin', function (value, element, params) {
    params = (jQuery.isArray(params)) ? params : utils.parseArrayStringParameter(params);
    var files = element.files;

    // Multiply the min file size
    var minSize = params[0] * filesSizes[params[1].toLowerCase().trim()];

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
    params = (jQuery.isArray(params)) ? params : utils.parseArrayStringParameter(params);
    var files = element.files;

    // Multiply the file sizes
    var minSize = params[0] * filesSizes[params[2].toLowerCase().trim()];
    var maxSize = params[1] * filesSizes[params[2].toLowerCase().trim()];

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
    var allMimes = (jQuery.isArray(mimetypes)) ? mimetypes : utils.parseArrayStringParameter(mimetypes);

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
    var allExts = (jQuery.isArray(extensions)) ? extensions : utils.parseArrayStringParameter(extensions);

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

/**
 * jQuery validation needs support for promises in order for this to work.
 *
// Make sure all images within the input have specific dimensions
jQuery.validator.addMethod('dimensions', function (value, element, param) {
    var files = element.files;
    var validator = this;
    var options = (typeof param == 'object') ? param : JSON.parse(param);
    var method = 'dimensions';

    var previous = this.previousValue(element, method),
        validator, data, optionDataString;


    // If a file is present in the input
    if (files.length > 0) {

        var defer = jQuery.Deferred();
        var _URL = window.URL || window.webkitURL;

        if (!this.settings.messages[element.name]) {
            this.settings.messages[element.name] = {};
        }

        previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method];

        this.settings.messages[element.name][method] = previous.message;

        if (previous.old === _URL) {
            return previous.valid;
        }

        this.startRequest(element);

        var image = new Image;

        // Validate once t he image is loaded
        image.onload = function () {
            var width = this.width;
            var height = this.height;

            // Check min width, if defined
            if (typeof options.min_width != 'undefined') {
                if (width < Number(options.min_width)) {
                    defer.reject(image, validator, element);
                    return false;
                }
            }

            // Check max width, if defined
            if (typeof options.max_width != 'undefined') {
                if (width > Number(options.max_width)) {
                    defer.reject(image, validator, element);
                    return true;
                }
            }

            // Check min height, if defined
            if (typeof options.min_height != 'undefined') {
                if (height < Number(options.min_height)) {
                    defer.reject(image, validator, element);
                    return true;
                }
            }

            // Check max height, if defined
            if (typeof options.max_height != 'undefined') {
                if (height > Number(options.max_height)) {
                    defer.reject(image, validator, element);
                    return true;
                }
            }

            // Check width, if defined
            if (typeof options.width != 'undefined') {
                if (width != Number(options.width)) {
                    defer.reject(image, validator, element);
                    return true;
                }
            }

            // Check height, if defined
            if (typeof options.height != 'undefined') {
                if (height != Number(options.height)) {
                    defer.reject(image, validator, element);
                    return true;
                }
            }

            // Check ratio, if defined
            if (typeof options.ratio != 'undefined') {
                var splitRatio = options.ratio.split(':');
                if (splitRatio[0] / splitRatio[1] != width / height) {
                    defer.reject(image, validator, element);
                    return true;
                }
            }

            defer.resolve(image, validator, element);
        };

        // On error, reject the promise
        image.onerror = function () {
            console.warn('image load error');
            defer.reject();
        }

        image.src = _URL.createObjectURL(files[0]);

        defer.promise().then(function (image, validator, element) {
            // Clean up
            image = null;
            var response = true;
            var valid = true,
                errors, message, submitted;

            validator.settings.messages[ element.name ][ method ] = previous.originalMessage;

            console.log('success');
            submitted = validator.formSubmitted;
            validator.resetInternals();
            validator.toHide = validator.errorsFor( element );
            validator.formSubmitted = submitted;
            validator.successList.push( element );
            validator.invalid[ element.name ] = false;
            validator.showErrors();
            previous.valid = valid;
            validator.stopRequest( element, valid );
        }, function (image, validator, element) {
            // Clean up
            image = null;

            var response = false;
            var valid = response,
                errors, message, submitted;

            validator.settings.messages[ element.name ][ method ] = previous.originalMessage;

            console.log('error');
            errors = {};
            message = response || validator.defaultMessage( element, { method: method, parameters: value } );
            errors[ element.name ] = previous.message = message;
            validator.invalid[ element.name ] = true;
            validator.showErrors( errors );
            previous.valid = valid;
            validator.stopRequest( element, valid );
        });

        console.log('pending');
        return "pending";
    }

    return true;
});*/