import { ComponentType } from "react";

export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
    defaultProps: DP,
    Component: ComponentType<P>
) => {
    type PropsExcludingDefault = Pick<P, Exclude<keyof P, keyof DP>>;
    type RecomposeProps = Partial<DP> & PropsExcludingDefault;

    Component.defaultProps = defaultProps;
    return Component as ComponentType<RecomposeProps>;
}