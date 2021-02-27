Currently the way that object files are handled is very budget. 
It first copies the exact file across using webpack so you have to import the asset at the top of the file.
It then has to get the path right in the import section.

import 'some/relative/path.obj';

load('full/path/of/asset/in/source.obj')

Surely there is a better way of handling it?
e.g. just auto copy across all obj files then only have to get the second bit right
this doesn't allow for any type checking though.