/**
 * Produces a function which uses template strings to do simple interpolation from objects.
 *
 * Usage:
 *    var makeMeKing = generateTemplateString('${name} is now the king of ${country}!');
 *
 *    console.log(makeMeKing({ name: 'Bryan', country: 'Scotland'}));
 *    // Logs 'Bryan is now the king of Scotland!'
 */

// eslint-disable-next-line @typescript-eslint/ban-types
const generateTemplateString = ((): Function => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const cache: IHash<Function> = {};

    // eslint-disable-next-line @typescript-eslint/ban-types
    return (template: string): Function => {
        // eslint-disable-next-line
        let fn = cache[template];

        if (!fn) {
            // Replace ${expressions} (etc) with ${map.expressions}.

            const sanitized = template
                .replace(/\$\{([\s]*[^;\s{]+[\s]*)\}/g, (_, match: string) => `$\{map.${match.trim()}}`)
                // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');

            // eslint-disable-next-line fp/no-mutation, @typescript-eslint/no-implied-eval
            fn = Function('map', `return \`${sanitized}\``);
        }

        return fn;
    };
})();

export default generateTemplateString;
