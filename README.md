## Automatune ##

Grid-based procedural music editor. For more info, please visit the landing page at:

http://www.automatune.com/

### Building ###

To build Automatune, you need to have `npm` and `grunt-cli` installed. Once installed, `cd` into the Automatune folder and run the following:

    npm install
    grunt dist # (or just "grunt" to get concatenated but not minified output, without building the docs)

Those commands will compile Automatune and place it into a newly created `dist` directory. The JSDocs will be compiled into a newly created `docs` directory.

Automatune is a client-side web application, and requires a static web server to run.

### License ###

Automatune is licensed under GNU GPL. Please see the included `LICENSE` file for the full text of the GNU GPL license.

> This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

> This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

> You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
