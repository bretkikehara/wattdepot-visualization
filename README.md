# wattdepot-visualization

Further the development of energy visualization driven by the Wattdepot service. 

## Repository setup

This repository has been subdivided into two portions. One is for the processing mockups and another for the wattdepot-visualizations.

## Processing artifact

The Processing core artifact is not currently present in a Maven repository. Please download it <a href="https://code.google.com/p/processing/downloads/list">here</a>.

In order to install the Processing artifact to the local Maven artifact repository, please use this command on the core.jar file:
<code>
mvn install:install-file -DgroupId=org.processing -DartifactId=core -Dpackaging=jar -DgeneratePom=true -Dfile=core.jar -Dversion=2.0b3
</code>