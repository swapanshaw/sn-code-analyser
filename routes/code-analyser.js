var esprima = require('esprima');
var estraverse = require('estraverse');

module.exports = codeParser;
/**
 *  Constructor funtion 
 * @param {code} program 
 */
function codeParser(program) {
    this.program = program;
};


codeParser.prototype.parse = function () {
    return esprima.parse(this.program);
}

codeParser.prototype.analyse = function (ast) {
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration')
                return estraverse.VisitorOption.Skip;
        },
        leave: function (node, parent) {
            if (node.type == 'VariableDeclarator')
                console.log(node.id.name + " = " + JSON.stringify(node));
            if(parent)
                console.log(parent.id + " = " + JSON.stringify(parent));
        }
    });
}
