# jQvalidation-laravel
Extra validation rule for jQueryValidation that translate well to laravel

Documentation can be found [here](http://jqvalidation.happydemon.xyz/)

## Progress

While all the ruels that are present do work, I still need to add image dimensions rule and propper array validation support.

Until then I'll keep this repo's releases under 1.0

## Rules

Here's an overview of all the Laravel rules and how they can be implemented.

All the linked rules can be used through this library, the textual rules are in jQuery validation by default.


| Laravel | Parsley |
| ------- | ------- |
| accepted |  |
| active_url |  |
| after:date | [DateAfter](http://jqvalidation.happydemon.xyz/rules/date) |
| alpha | [Alpha](http://jqvalidation.happydemon.xyz/rules/string) |
| alpha_dash | [AlphaDash](http://jqvalidation.happydemon.xyz/rules/string) |
| alpha_num | [AlphaNum](http://jqvalidation.happydemon.xyz/rules/string) |
| array |  |
| before:date | [DateBefore](http://jqvalidation.happydemon.xyz/rules/date) |
| between:min,max | [FileSizeBetween](http://jqvalidation.happydemon.xyz/rules/file) |
|  | range (number) |
|  | rangelength (string) |
| boolean |  |
| confirmed | equalTo |
| date |  [Date](http://jqvalidation.happydemon.xyz/rules/date)|
| date_format:format | [DateFormat](http://jqvalidation.happydemon.xyz/rules/date) |
| different:field | [Different](http://jqvalidation.happydemon.xyz/rules/misc) |
| digits:value |  |
| digits_between:min,max | range |
| dimensions |  |
| distinct | [Distinct](http://jqvalidation.happydemon.xyz/rules/misc) |
| email | email |
| exists:table,column | remote |
| file |  |
| filled | required |
| image | [Image](http://jqvalidation.happydemon.xyz/rules/file) |
| in:foo,bar,... | [In](http://jqvalidation.happydemon.xyz/rules/in) |
| in_array:anotherfield | [InArray](http://jqvalidation.happydemon.xyz/rules/in) |
| integer | integer |
| ip |  |
| json |  |
| max:value | [fileSizeMax](http://jqvalidation.happydemon.xyz/rules/file) |
|  | max(number) |
|  | maxlength(string) |
| mimetypes:text/plain,... | [Mimetypes](http://jqvalidation.happydemon.xyz/rules/file) |
| mimes:foo,bar,... | [FileExt](http://jqvalidation.happydemon.xyz/rules/file) |
| min:value | [fileSizeMin](http://jqvalidation.happydemon.xyz/rules/file) |
|  | min (number) |
|  | minlength (string) |
| not_in:foo,bar,... | [NotIn](http://jqvalidation.happydemon.xyz/rules/in) |
| numeric | digit |
| present |  |
| regex:pattern | [regex](http://jqvalidation.happydemon.xyz/rules/string) |
| required | required |
| required_if:anotherfield,value,... | [RequiredIf](http://jqvalidation.happydemon.xyz/rules/required) |
| required_unless:anotherfield,value,... | [RequiredUnless](http://jqvalidation.happydemon.xyz/rules/required) |
| required_with:foo,bar,... | [RequiredWith](http://jqvalidation.happydemon.xyz/rules/required) |
| required_with_all:foo,bar,... | [RequiredWithAll](http://jqvalidation.happydemon.xyz/rules/required) |
| required_without:foo,bar,... | [RequiredWithout](http://jqvalidation.happydemon.xyz/rules/required) |
| required_without_all:foo,bar,... | [RequiredWithoutAll](http://jqvalidation.happydemon.xyz/rules/required) |
| same:field | equalTo |
| size:value | [fileSize](http://jqvalidation.happydemon.xyz/rules/file) |
| string |  |
| timezone |  |
| unique:table,column,except,idColumn | remote |
| url | url |
