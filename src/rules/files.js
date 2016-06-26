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
        },'This file does not have the correct mimetype "%s".');


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
        },'This file does not have the correct extensions.');

// Make sure all images within the input have specific dimensions
jQuery.validator.addMethod('dimensions', function (value, element, param) {
            var files = element.files;

            // @todo redo this?
            var options = (jQuery.isJSON(param)) ? param : JSON.parse(param);

            // If a file is present in the input
            if (files.length > 0) {
                var defer = jQuery.Deferred();
                var _URL = window.URL || window.webkitURL;

                var image = new Image;

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
                }

                image.src = _URL.createObjectURL(files[0]);

                return defer.promise().then(function(image){
                    // Clean up
                    image = null;

                    return true;
                }, function(image){
                    // Clean up
                    image = null;

                    return false;
                });
            }

            return true;
        });