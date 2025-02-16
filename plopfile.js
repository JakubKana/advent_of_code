export default function (plop) {
    // create your generators here
    plop.setGenerator('basics', {
        description: 'Advent task template', prompts: [
            {type: 'input', name: 'path', message: 'path please'},
            {type: 'input', name: 'name', message: 'file name please'}],
        actions: [
            {
                type: 'add',
                path: 'src/{{path}}/{{name}}.ts',
                templateFile: 'templates/advent.ts.hbs'
            }]
    });
};