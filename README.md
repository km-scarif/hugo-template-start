

# Hugo Theme Base

This repo is a starting point for building a Hugo theme.

There is content in the following directories:
- content (demo content for the structure)
- layouts (layout files showing structure)

The other directories are empty, since they are not necessary for the 
base of a simple hugo template.

**NOTE:**
Two content directories are in the repo for testing.  Either copy or symlink one of them to `content` and 
the current theme can be tested

## Necessary files for content directory
- `content` directory needs an _index.md file
    - This file may be empty, but is used by Hugo to build and layout
- `content` directory also needs a <name>.md file for system-wide single pages.  i.e. /about 
requires an `about.md` file in the root of the content directory
- All subdirectories that resolve to a route (/repos -> content/repos) need an _index.md file in the 
root of the directory
    - The title of this _index.md file will be used in the page if it exists
- All subdirectories in either kind of repository need an `_index.md` to exist, and if the `title: xyz` 
attribute is set, that is what will be used in the navigation menus

## Necessary files for pulled repositories

For repos to be pulled and integrated into the Hugo build process, there need to 
be a few things in the repository and in the individual files:

- All Repositories need to have a file named `_index.md` in the root of each directory with 
markdown files (typically README.md) so that Hugo can "understand" that the files are part of 
the documentation.  The file only needs to have the following frontmatter content:
```code
---
title: "what will appear in the menu"
--- 
```
- If there are multiple directory levels in the repository, each level with markdown files to 
be included in the documentation needs the above file included.

Example:
```code
# Repository

my-project
  |_index.md (title: My Project)
  |  
  |-- sub-project-one
  |   |-- _index.md (title: Sub Project One)
  |
  |-- sub-project-two
      |-- _index.md (title: Sub Project Two)

```
- All markdown files are required to have a frontmatter header for them to be processed correctly.  The
frontmatter should be in the following format with this minimum of data:

```code
---
title: "what will appear in the menu"
date:  2024-10-05
---
```
- Additional frontmatter can be included in the files as well
- If a repository has image files that are referenced in the markdown files, the markdown file name must be `index.md`
for Hugo to correctly reference the relative image links.


