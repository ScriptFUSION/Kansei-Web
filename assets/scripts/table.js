/**
 * Represents a table for Opponents to sit around.
 *
 * @param element DOM element acting as the table.
 * @constructor
 */
function Table(element) {
    var path, opponents = [];

    function construct() {
        this.refresh();
    }

    this.getPath = function() {
        return path;
    };

    this.getSize = function() {
        var box = path.getBoundingBox();
        box.x = box.x2 - box.x1;
        box.y = box.y2 - box.y1;

        return box;
    };

    this.getOrigin = function() {
        var size = element.getSize();
        size.x /= 2;

        return size;
    };

    this.refresh = function() {
        path = createTablePath();
        distributeOpponents();
    };

    this.createOpponents = function(n) {
        opponents = [];

        for (var i = 0, o; i < n; ++i) {
            opponents.push(o = new Opponent(this));
            element.grab(o.getElement());
        }

        distributeOpponents();

        return opponents;
    };

    function createTablePath() {
        var MARGIN = '92',
            size = element.getSize(),
            start = Object.merge({fn: 'start'}, size),
            path = PATH([start, {fn: 'ellipse', a: size.x / 2, b: size.y}]);

        //Scale path away from edges by margin amount.
        path.scale(
            //Remove margin twice in x axes for left and right edge.
            (size.x - MARGIN * 2) / size.x,
            //Remove margin once in y axes because only top edge is visible.
            (size.y - MARGIN) / size.y,
            {x: size.x / 2, y: size.y} //Faster than path.center().
        );

        //Remove lower half of path to leave a semicircle.
        path.points.splice(0, (path.points.length - 1) / 2 | 0);

        return path;
    }

    function distributeOpponents() {
        for (var i = 0, point; i < opponents.length; ++i) {
            // Divide path into players+1 segments and discard the first.
            point = path.step(1 / (opponents.length + 1) * (i + 1));
            opponents[i].setPosition(point.x, point.y);
        }
    }

    construct.call(this);
}
