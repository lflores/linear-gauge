/**
Este widget fue desarrollado para la lista de analisis
*/
    $.widget("custom.linearGauge", {
        options: {
            points: [0, 25, 50, 75, 100],
            colors: ["#ff0000", "#ffa300", "#ffe100", "#fffa00", "#1f6f02"],
            orient: "bottom",
            width: 170,
            margin: {
                left: 5,
                right: 5,
                top: 8,
                bottom: 12
            },
            height: 40,
            thredsholds: true,
            minorTicks: false,
            ticks: 10,
            //propiedades "ocultas"
            _thresholdPadding: 4
        },

        _create: function () {
            var that = this;
			this.element.addClass("linear-gauge");
            this.svg = d3.select($(this.element).get(0)).append("svg");
            this._drawBackground();
            this._drawGradient();
            this._drawScale();
            this._drawThresholds();

            this.svg
                .attr("width", this.options.width + this.options.margin.left + this.options.margin.right)
                .attr("height", this.options.height + this.options.margin.top + this.options.margin.bottom);
            this.refresh();
            this._updateThresholds();
        },

        _drawBackground: function () {
            this.svg
                .selectAll(".gauge-body")
                .data([0])
                .enter()
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", this.options.width)
                .attr("height", this.options.height)
                .classed("gauge-body", true);
        },

        _drawGradient: function () {
            var that = this;
            this.svg
                .selectAll(".gradient")
                .data([0])
                .enter()
                .append("rect")
                .attr("x", this.options.margin.left)
                .attr("y", this.options.margin.top)
                .attr("width", this.options.width - (this.options.margin.left + this.options.margin.right))
                .attr("height", this.options.height - (this.options.margin.top + this.options.margin.bottom))
                .attr("fill", "url(#" + $(this.element).attr("id") + "-gradient)");

            this.gradient = this.svg.append("g")
                .append("linearGradient")
                .attr("y1", this.options.margin.top)
                .attr("y2", this.options.height - this.options.margin.top - this.options.margin.bottom)
                .attr("x1", this.options.margin.left)
                .attr("x2", this.options.width - this.options.margin.left - this.options.margin.right)
                .attr("id", $(this.element).attr("id") + "-gradient")
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("stroke", "#fcfcfc");

            var _thresholds = d3.scale.linear()
                .domain([d3.min(this.options.points), d3.max(this.options.points)])
                .range([0, 1])

            this.gradient
                .selectAll("stop")
                .data(this.options.points)
                .enter()
                .append("stop")
                .attr("offset", function (d) {
                    return _thresholds(d);
                })
                .attr("stop-color", function (d, i) {
                    return that.options.colors[i]
                });

        },

        _drawScale: function () {
            var _data = d3.range(20);
            var that = this;
            var widthScale = d3.scale.linear()
                .domain([d3.min(this.options.points), d3.max(this.options.points)])
                .range([0, this.options.width - (this.options.margin.left + this.options.margin.right) - 1]);

            this.axis = this.svg
                .append("g");

            this.axis
                .attr("transform", "translate(" + this.options.margin.left + "," + this.options.margin.top + ")")
                .attr("class", "axis")
                .call(d3.svg.axis()
                    .scale(widthScale)
                    .orient(this.options.orient)
                    .ticks(this.options.ticks)
                    .tickSize(that.options.height - that.options.margin.top - that.options.margin.bottom)
                );

            if (this.options.minorTicks) {
                this.subAxis = this.svg.append("g");
                this.subAxis
                    .attr("transform", "translate(" + this.options.margin.left + "," + this.options.margin.top + ")")
                    .attr("class", "axis")
                    .classed("minor", true)
                    .call(
                        d3.svg.axis()
                        .scale(widthScale)
                        .orient(this.options.orient)
                        .ticks(this.options.ticks * 10)
                        .tickSize((that.options.height - that.options.margin.top - that.options.margin.bottom) / 2)
                    );
            }
        },

        _drawThresholds: function () {
            //var that = this;
            //var widthScale = d3.scale.linear()
            //    .domain([d3.min(this.options.points), d3.max(this.options.points)])
            //    .range([this.options.margin.left, this.options.width - (this.options.margin.left + this.options.margin.right)]);
            //var lineHeight = that.options.height - that.options.margin.top;
        },

        refresh: function () {
            //var that = this;
            //var widthScale = d3.scale.linear()
            //    .domain([d3.min(this.options.points), d3.max(this.options.points)])
            //    .range([0, this.options.width - (this.options.margin.left + this.options.margin.right) - 1]);

            //this.axis.call(
            //    d3.svg.axis()
            //    .scale(widthScale)
            //    .orient(this.options.orient)
            //    .ticks(this.options.ticks)
            //    .tickSize(that.options.height - that.options.margin.top - that.options.margin.bottom)
            //)

            //if (this.subAxis === undefined && this.options.minorTicks) {
            //    this.subAxis = this.svg.append("g");
            //    this.subAxis
            //        .attr("transform", "translate(" + this.options.margin.left + "," + this.options.margin.top + ")")
            //        .attr("class", "axis")
            //        .classed("minor", true)
            //        .call(
            //            d3.svg.axis()
            //            .scale(widthScale)
            //            .orient(this.options.orient)
            //            .ticks(this.options.ticks * 10)
            //            .tickSize((that.options.height - that.options.margin.top - that.options.margin.bottom) / 2)
            //        );
            //}

            //if (this.options.minorTicks) {
            //    this.subAxis
            //        .call(d3.svg.axis()
            //            .scale(widthScale)
            //            .orient(this.options.orient)
            //            .ticks(this.options.ticks * 10)
            //            .tickSize((that.options.height - that.options.margin.top - that.options.margin.bottom) / 2)
            //        )
            //}
        },

        _dispatchEvent: function () {
            this._trigger("change", null, { points: this.options.points, colors: this.options.colors });
        },

        _updateScale: function(){
            var that = this;
            var widthScale = d3.scale.linear()
                .domain([d3.min(this.options.points), d3.max(this.options.points)])
                .range([0, this.options.width - (this.options.margin.left + this.options.margin.right) - 1]);

            this.axis.call(
                d3.svg.axis()
                .scale(widthScale)
                .orient(this.options.orient)
                .ticks(this.options.ticks)
                .tickSize(that.options.height - that.options.margin.top - that.options.margin.bottom)
            )

            if (this.subAxis === undefined && this.options.minorTicks) {
                this.subAxis = this.svg.append("g");
                this.subAxis
                    .attr("transform", "translate(" + this.options.margin.left + "," + this.options.margin.top + ")")
                    .attr("class", "axis")
                    .classed("minor", true)
                    .call(
                        d3.svg.axis()
                        .scale(widthScale)
                        .orient(this.options.orient)
                        .ticks(this.options.ticks * 10)
                        .tickSize((that.options.height - that.options.margin.top - that.options.margin.bottom) / 2)
                    );
            }

            if (this.options.minorTicks) {
                this.subAxis
                    .call(d3.svg.axis()
                        .scale(widthScale)
                        .orient(this.options.orient)
                        .ticks(this.options.ticks * 10)
                        .tickSize((that.options.height - that.options.margin.top - that.options.margin.bottom) / 2)
                    )
            }
        },

        _updateGradient: function (points) {
            if (points === undefined) {
                points = this.options.points;
            }
            var that = this;
            var _thresholds = d3.scale.linear()
                    .domain([d3.min(points), d3.max(points)])
                    .range([0, 1])

            var update_gradients = this.gradient
                .selectAll("stop").data(points)

            update_gradients
                .enter()
                .append("stop")
                .transition().duration(1000).ease("bounce")
                .attr("offset", function (d, i) {
                    return _thresholds(d);
                })
                .attr("stop-color", function (d, i) {
                    if (that.options.colors[i] === undefined) {
                        return that.options.colors[that.options.colors.length - 1];
                    }
                    return that.options.colors[i]
                })



            update_gradients
                .transition().duration(1000).ease("bounce")
                .attr("offset", function (d, i) {
                    return _thresholds(d);
                })
                .attr("stop-color", function (d, i) {
                    if (that.options.colors[i] === undefined) {
                        return that.options.colors[that.options.colors.length - 1];
                    }
                    return that.options.colors[i]
                });

            update_gradients.exit().remove();
        },

        /**
        Actualiza los thredsholds a partir del dato pasado como parámetro
        */
        _updateThresholds: function (points) {
            if (points === undefined) {
                points = this.options.points;
            }

            var _thresholds = this.svg
                .selectAll(".threshold")
                .data(points);

            var pointsScale = d3.scale.linear()
                .domain([d3.min(points), d3.max(points)])
                .range([0, this.options.width - (this.options.margin.left + this.options.margin.right) - 1]);

            //Enter
            var group = _thresholds.enter().append("g");

            var _formatter = d3.format(",.2f");

            var _draggedNode = null;

            /**
            Metodos para arrastrar el grupo de flecha y linea
            */
            var drag = d3.behavior.drag()
                //.origin(function (d) { return d; })
                .on("dragstart", function (d) {
                    d3.select(this).attr('pointer-events', 'none');
                })
                .on("drag", function (d, i) {
                    _draggedNode = d3.event.x;
                    //var _coords = d3.mouse(that.svg);
                    d3.select(this).attr("transform", "translate(" + d3.event.x + ",3)");
                    var _current = d3.event.x - that.options.margin.left + that.options._thresholdPadding;
                    d3.select(this)
                        .selectAll("title")
                        .classed("tooltip", true)
                        .text(_formatter(pointsScale.invert((_current))));
                    //En teoría los arrastrables no pueden ser el ultimo ni el primero
                    //por lo que no habría problemas con los límites
                    var _nextNode = pointsScale(that.options.points[i + 1]);
                    //var _currNode = pointsScale(that.options.points[i]);
                    var _prevNode = pointsScale(that.options.points[i - 1]);

                    _draggedNode = _current;
                    if (_current > _nextNode) {
                        d3.event.sourceEvent.stopPropagation();
                        _current = _nextNode - 5;
                        d3.select(this)
                            .transition().ease("elastic")
                            .attr("transform", "translate(" + _current + ",3)");
                        d3.select(this)
                        .selectAll("title")
                        .classed("tooltip", true)
                        .text(_formatter(pointsScale.invert((_current))));
                        _draggedNode = _current;
                        this.dispatchEvent(new Event('mouseup'));
                        return;
                    }

                    if (_current < _prevNode) {
                        d3.event.sourceEvent.stopPropagation();
                        _current = _prevNode + 5;
                        d3.select(this)
                            .transition().ease("elastic")
                            .attr("transform", "translate(" + _current + ",3)");
                        d3.select(this)
                        .selectAll("title")
                        .classed("tooltip", true)
                        .text(_formatter(pointsScale.invert((_current))));
                        _draggedNode = _current;
                        this.dispatchEvent(new Event('mouseup'));
                    }
                })
                .on("dragend", function (d, i) {
                    var _perc = pointsScale.invert(_draggedNode);
                    that.options.points[i] = _perc;
                    that.points(that.options.points);
                    that._dispatchEvent();
                    d3.select(this).classed("dragging", false);
                    _dragCanceled = null;
                    d3.select(this).attr('pointer-events', '');
                });

            var lineHeight = this.options.height - this.options.margin.top;
            var that = this;
            group
                .attr("class", "threshold")
                .attr("transform", function (d) {
                    return "translate(" + pointsScale(d) + ",3)";
                })
                .classed("draggable", function (d) {
                    if (d === d3.min(points)
                        || d === d3.max(points)) {
                        return false;
                    }
                    return true;
                })
                .call(drag)
                .append("line")
                .attr("x1", 4)
                .attr("x2", 4)
                .attr("y1", 3)
                .attr("y2", lineHeight - 4)

            group
                .append("path")
                .attr("d", function (d) {
                    if (d === d3.max(points)) {
                        return "M 0 0 L 4 0 L 4 9 L 0 0";
                    } else if (d === d3.min(points)) {
                        return "M 4 0 L 9 0 L 4 9 L 4 0";
                    }
                    return "M 0 0 L 9 0 L 4 9 L 0 0";
                })
                .attr("x", 0)
                .attr("y", 0);

            group
                .append("title")
                .text(function (d) {
                    return d;
                })
                .classed("tooltip",true);

            //Update
            _thresholds
                .classed("draggable", function (d) {
                    if (d === d3.min(points)
                        || d === d3.max(points)) {
                        return false;
                    }
                    return true;
                })
                .transition()
                .duration(1000)
                .ease("bounce")
                .attr("transform", function (d) {
                    return "translate(" + (pointsScale(d) + that.options.margin.left - that.options._thresholdPadding) + ",3)";
                })
                //.select("path")
                //.attr("d", function (d) {
                //    if (d === d3.max(points)) {
                //        return "M 0 0 L 4 0 L 4 9 L 0 0";
                //    } else if (d === d3.min(points)) {
                //        return "M 4 0 L 9 0 L 4 9 L 4 0";
                //    }
                //    return "M 0 0 L 9 0 L 4 9 L 0 0";
                //})
                .select(".tooltip")
                .text(function (d) {
                    return d;
                });

            _thresholds
                .selectAll("path")
                .attr("d", function (d) {
                    if (d === d3.max(points)) {
                        return "M 0 0 L 4 0 L 4 9 L 0 0";
                    } else if (d === d3.min(points)) {
                        return "M 4 0 L 9 0 L 4 9 L 4 0";
                    }
                    return "M 0 0 L 9 0 L 4 9 L 0 0";
                })

            //Exit
            _thresholds.exit().remove();
        },

        _pointsAsValue: function (points) {
            var _points = [];
            $.each(points, function (i, point) {
                _points.push(parseInt(point));
            });
            return _points;
        },

        /**
        Funciona como setter y getter
        */
        points: function (points) {
            if (points === undefined) {
                return this.options.points;
            }
            this.options.points = this._pointsAsValue(points);
            this._updateGradient();
            this._updateThresholds();
            this._updateScale();
        },

        colors: function (colors) {
            if (colors === undefined) {
                return this.options.colors;
            }
            this.options.colors = colors;
            this._updateGradient();
        },
        minorTicks: function (minorTicks) {
            if (minorTicks === undefined) {
                return this.options.minorTicks;
            }
            this.options.minorTicks = minorTicks;
            this._updateScale();
        }
    });