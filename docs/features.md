This is a component that use [d3](http://d3js.org/) library and generate a JQuery UI widget, to control colors and thredsholds in a colored gradient background.
Based on [Linear Gauge](http://docs.fusioncharts.com/flex/charts/) Flex components, such as Fusion Charts or [this](http://www.ardisialabs.com/flex-components/linearGauges), this component birth like a personal needs, and I decided to share it.
Once initialized, you can drag thresholds and see changes of color gradients.
Also, you can register an event change ("lineargaugechange") and send result to another component, such as graphic chart.

This simple component allows you to configure next properties:
* Draggable thredsholds and changes initial values
* Configurable colors
* Configurable threadsholds
* Width: Default is 200px, but you can chage it.
* Height: Default is 40px, but you can change it.
* Change Event: Each time that you drag threadsholds, the change event is dispatched
* Ticks scale, that divides the gauge 
* Minor ticks scale optional
* Overlaping control