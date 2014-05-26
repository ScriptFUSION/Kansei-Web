/**
 * Represents an opponent player comprised of a DOM element containing an
 * avatar and their hand of cards.
 *
 * @param table Table instance.
 * @constructor
 */
function Opponent(table) {
    var element, self = this;

    function construct() {
        element = new Element('.opponent');
        element.innerHTML = '<svg>' +
            '<circle cx="29.347" cy="17.217" r="17.217"/>' +
            '<path d="M58.691,57.649c-0.001-12.154-9.886-22.042-22.044-22.04' +
            '2H22.041C9.889,35.607,0,45.495,0,57.649l0.045,18.148c0,0,10.823' +
            ',5.219,31.203,5.219c17.703,0,27.322-5.498,27.322-5.498"/>';
        element.grab(new Element('.hand'));
    }

    this.getElement = function() {
        return element;
    };

    this.getAvatar = function() {
        return element.getElement('svg');
    };

    this.getBody = function() {
        return element.getElement('path');
    };

    this.getBodyCentre = function() {
        var pos = this.getPosition(),
            body = getRelativeBodyCentre();

        return {x: pos.x + body.x, y: pos.y + body.y};
    };

    this.getHand = function() {
        return element.getElement('.hand');
    };

    this.getAvatarSize = function() {
        return this.getAvatar().getBBox();
    };

    this.getPosition = function() {
        return element.getPosition();
    };

    /**
     * Sets the position about the origin using the specified coordinates.
     *
     * @param pos Position object.
     */
    this.setPosition = function(pos) {
        var origin = getRelativeOrigin();

        element.setStyles({
            left: Math.round(pos.x - origin.x) + 'px',
            top: Math.round(pos.y - origin.y) + 'px'
        });

        updateHandPosition();
    };

    /**
     * Gets the origin. The origin is the centre of the base of the avatar.
     *
     * @returns {{x: number, y: number}}
     */
    this.getOrigin = function() {
        var pos = element.getPosition(),
            origin = getRelativeOrigin();

        pos.x += origin.x;
        pos.y += origin.y;

        return pos;
    };

    function getRelativeOrigin() {
        var size = self.getAvatarSize();

        return {x: size.width / 2, y: size.height};
    }

    function getBodySize() {
        return self.getBody().getBBox();
    }

    function getRelativeBodyCentre() {
        var size = getBodySize();

        return {x: size.x + size.width / 2, y: size.y + size.height / 2};
    }

    function updateHandPosition() {
        var o1 = self.getBodyCentre(), o2 = table.getOrigin(),
            rel = getRelativeBodyCentre(),
            size = table.getSize(), rot,
            //Semi-major/minor axes.
            a = size.x / 2, b = size.y,
            //Normal angle.
            n = Math.atan2((o2.y - o1.y) * a/b, (o2.x - o1.x) * b/a),
            //Delta (distance to move).
            d = 42,
            //Delta x/y.
            dx = Math.cos(n) * d, dy = Math.sin(n) * d,
            hand = self.getHand();

        hand.setStyles({
            left: Math.round(rel.x + dx - hand.getSize().x / 2) + 'px',
            top: Math.round(rel.y + dy) + 'px',
            transform: rot = 'rotate(' + (n + 1.57) + 'rad)',
            '-webkit-transform': rot
        });
    }

    construct.call(this);
}
