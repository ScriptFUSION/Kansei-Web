(function() {
    function createTablePath() {
        var margin = '92',
            table = $$('.table')[0],
            size = table.getSize(),
            start = Object.merge({fn: 'start'}, size),
            path = PATH([start, {fn: 'ellipse', a: size.x / 2, b: size.y}]);

        //Scale path away from edges by margin amount.
        path.scale(
            //Remove margin twice in x axes for left and right edge.
            (size.x - margin * 2) / size.x,
            //Remove margin once in y axes because only top edge is visible.
            (size.y - margin) / size.y,
            {x: size.x / 2, y: size.y} //Faster than path.center().
        );

        //Remove lower half of path to leave a semicircle.
        path.points.splice(0, (path.points.length - 1) / 2 | 0);

        return path;
    }

    function plotPath(path) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        $(svg).setStyles({
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        });

        PATH.adapter.drawSVG(svg, path);

        $$('body').grab(svg);

        return svg;
    }

    function distributePlayersByFixedMargin(path) {
        path = path || createTablePath();

        var playerImage = $$('.player')[0],
            margin = 15,
            width = Math.round(playerImage.getBBox().width),
            players = new Array(10),
            extent = players.length * width + (players.length - 1) * margin,
            offset = path.first().x + path.width() / 2 - extent / 2;

        for (var i = 0; i < players.length; ++i)
            players[i] = i * width + i * margin + offset;

        return players;
    }

    function distributeOpponents(opponents, path) {
        for (var i = 0, point; i < opponents.length; ++i) {
            // Divide path into players+1 segments and discard the first.
            point = path.step(1 / (opponents.length + 1) * (i + 1));

            opponents[i].setPosition(point.x, point.y);
        }
    }

    function createOpponents(n) {
        var opponents = [], parent = $$('.table')[0];

        for (var i = 0; i < n; ++i)
            opponents.push(new Opponent(parent));

        return opponents;
    }

    function drawTable() {
        distributeOpponents(opponents, createTablePath());
    }

    plotPath(createTablePath());
    var opponents = createOpponents(9);

    window.addEvents({
        domready: drawTable,
        resize: drawTable
    });
})();
