export function ParameterDecorator(
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number,
) {
    console.log(
        `Decorating parameter ${String(propertyKey)}` +
        ` (index ${parameterIndex})` +
        ` from ${target.constructor.name}`,
    );
}