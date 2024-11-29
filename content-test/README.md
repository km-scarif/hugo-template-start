
# Hugo Content Testing

This repo is to test Hugo themes and how the content will be rendered with a Hugo theme

- The theme to be tested should be in a directory under `themes/`
- The theme should be referenced in `hugo.toml` in the root of this project

The structure of the content is as follows:

- content

    - docs
        - _index.md
        - document1.md
        - document2.md
        - subfolder1
            - README.md
            - subfolder1-document1.md
            - subfolder1-document2.md
        - subfolder2
            - _index.md
            - subfolder2-document1.md
            - subfolder2-document2.md

Notes on the docs directory:
- Because there is not an `_index.md` in the root of subfolder1, all of the docs are at the 
same navigation level as `document1.md` and `document2.md` in the root directory.  This makes
them act as a "leaf bundle" and they will not be in a hierarchy as you would expect

- The inclusion of an `_index.md` in the subfolder2 directory changes that directory into a 
"branch bundle" and the navigation menu acts as expected.
    - Note that the title in the navigation menu for subfolder2 comes from the `_index.md` `title:` frontmatter

- Normally, you will want an `_index.md` file in the root of all directories that contain other subdirectories for 
proper positioning on the navigation menu


    - repos
        - _index.md
        - repo1
            - subproject1
                - README-with-image.md
                - image1.png
            - subproject2
                - README1.md
                - README2-with-image.md
                - image2.png
        - repo2
            - index.md
            - image3.png

Notes on the repos directory:
- This example shows how images are handled in the Hugo build.  For images to show in the built documentation, 
one of the following must be done:
    - The image must be copied into the `static/` root dir AND the image tag MUST start with `/imagename.ext`
    - The image may reside in the current directory of the markdown file, but the filename of the markdown file 
    MUST be `index.md`

Unless one of the above is used, images will not show in the resulting Hugo built site.

- All repository directories must have an `_index.md` file in the root of the repository, or the pages will not appear
in the menu correctly.