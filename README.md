Steam-HiDPI
=============

This is collection of skins which enlarge the Steam UI for better compatibility
with high resolution monitors.

By default, a scale factor of 1.5x is applied.

It is also possible to specify arbitrary scale factors, e.g. 0.5x, 1.5x, 2x,
etc. To do so, please first follow the [Installation](#installation)
instructions and then refer to the [Customization](#customization) section
below.

Installation
------------

1. Determine the location of your Steam skins directory.<br><br>
   You can try using this command to find it:<br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`find $HOME -name 'skins_readme.txt' -type f -printf '%h\n' 2>/dev/null`<br><br>
   Possible locations may include:<br>
   - `~/.local/share/Steam/skins/`
   - `~/.steam/skins`
   - `~/.steam/steam/skins`

2. Clone this repository to your Steam `skins` directory determined in step 1:

    ```bash
    cd ~/.steam/steam/skins # Path from step 1
    git clone https://github.com/b0o/Steam-HiDPI.git
    ```

3. Open/restart Steam, go to Settings -> Interface and choose the new skin `Steam-HiDPI`.

Screenshots
-----------

Here are some screenshots with before/after comparisons:

<!-- TODO: update screenshots -->
![Screenshot #1](docs/screenshots/screenshot1.png)
![Screenshot #2](docs/screenshots/screenshot2.png)
![Screenshot #3](docs/screenshots/screenshot3.png)
![Screenshot #4](docs/screenshots/screenshot4.png)

Customization
------------

TODO
