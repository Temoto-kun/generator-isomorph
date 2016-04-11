(function () {
    var Model = function Model(modelDef) {
        return {
            getName: function () {
                return modelDef.name;
            },
            
            isPaginated: function () {
                return modelDef.paginated;
            },
            
            getVisibleAttrs: function getVisibleAttrs() {
                return modelDef.attrs.filter(function (attr) {
                    return !attr.characteristics.hidden;
                });
            }
        }
    };
    
    module.exports = Model;
})();