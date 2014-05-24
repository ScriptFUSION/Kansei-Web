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

    this.getHand = function() {
        return element.getElement('.hand');
    };

    this.getAvatarSize = function() {
        return this.getAvatar().getBBox();
    };

    /**
     * Sets the position about the origin using the specified coordinates.
     *
     * @param x Horizontal coordinate.
     * @param y Vertical coordinate.
     */
    this.setPosition = function(x, y) {
        var origin = getRelativeOrigin();

        element.setStyles({
            left: Math.round(x - origin.x) + 'px',
            top: Math.round(y - origin.y) + 'px'
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

    function updateHandPosition() {
        var o1 = self.getOrigin(), o2 = table.getOrigin(),
            ro = getRelativeOrigin(),
            rad = Math.atan2(o2.y - o1.y, o2.x - o1.x),
            cos = Math.cos(rad), sin = Math.sin(rad),
            d = 16,
            hand = self.getHand();

        hand.setStyles({
            left: Math.round(ro.x + cos * d * 2 - hand.getSize().x / 2) + 'px',
            top: Math.round(ro.y + sin * d) + 'px',
            transform: 'rotate(' + (rad + 1.57) + 'rad)'
        });
    }

    construct.call(this);
}
