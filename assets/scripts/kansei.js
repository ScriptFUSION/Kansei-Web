(function() {
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

    var table = new Table($$('.table')[0]);
    table.createOpponents(9);

    addEvent('resize', table.refresh);
})();
