var _ = require('lodash');

function canDiscard(assetPath, discardPatterns) {
    if (!_.isArray(discardPatterns)) {
        discardPatterns = [discardPatterns];
    }
    return _.some(discardPatterns, function(discardPattern) {
        if (_.isString(discardPattern)) {
            return _.endsWith(assetPath, discardPattern);
        } else if (_.isRegExp(discardPattern)) {
            return discardPattern.exec(assetPath);
        } else if (_.isFunction(discardPattern)) {
            return discardPattern(assetPath);
        } else {
            return false;
        }
    });
}

/**
 * # DiscardAssetPlugin
 *
 * Throws certain emitted assets into the garbage when you just don't care about them. This can be
 * useful if you're generating CSS files using the ExtractTextPlugin and there is nothing to put in
 * the JS part of bundle.
 *
 * @param {RegExp|Array} discardPatterns - RegExp pattern(s) to ignore
 */
function DiscardAssetPlugin(discardPatterns) {
    // this.discardPatterns = options.discardPatterns;
    this.discardPatterns = discardPatterns;
}

DiscardAssetPlugin.prototype.apply = function(compiler) {
    var discardPatterns = this.discardPatterns;

    compiler.plugin('emit', function(compilation, callback) {
        var assets = compilation.assets;
        for (var assetPath in assets) {
            if (canDiscard(assetPath, discardPatterns)) {
                delete assets[assetPath];
            }
        }
        callback();
    });
};

module.exports = DiscardAssetPlugin;