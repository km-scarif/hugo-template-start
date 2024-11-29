---
title:  "dd-studio-ext DataDroid Studio VSCode Extenstion"
date:   2024-10-15
---

# DataDroid Studio

## Features

While developing YAML files...
- Execute YAML files
- Execute SQL files

## Requirements

None

## Extension Settings

This extension contributes the following settings:

* `dataDroidStudio.service`: URL to DataDroid service api
* `dataDroidStudio.browser`: The browser to open when running reports
* `dataDroidStudio.provider`: The provider to run the yamls

## Deployment
Change package.json version
Run: vsce package

## Known Issues

None

## Release Notes

### 1.0.0

Initial release of DataDroid Studio

### 1.1.0

Support for report service using multiple yaml providers

### 1.1.4

Fix bug with Grid View of dataservice.  Datadroid post process rows are rendered correctly.

### 1.2.0

Add support for pivoter and selector widgets
