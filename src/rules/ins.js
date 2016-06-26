// Check if the value is within a comma-separated list (val1,val2,..)
jQuery.validator.addMethod(
    'in',
    function(value, element, param){
        var possibles = param.split(',');

        return possibles.indexOf(value) > -1;
    },
    'The provided value is not present in the list.'
);

// Check if the value is not in a comma-separated list (val1,val2,..)
jQuery.validator.addMethod(
    'notIn',
    function(value, element, param){
        var possibles = param.split(',');

        return possibles.indexOf(value) == -1;
    },
    'The provided value is not present in the list.'
);