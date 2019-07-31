// Type definitions for react-simple-timefield 2.0
// Project: https://github.com/antonfisher/react-simple-timefield#readme
declare module "react-simple-timefield" {
    import * as React from "react";

    export function formatTimeItem(value: any): any;

    export function isNumber(value: any): any;

    export function validateTimeAndCursor(...args: any[]): any;

    interface Props {
        value: string;
        onChange: (time: string) => void;
        showSeconds?: boolean;
        input?: JSX.Element;
        colon?: string;
        style?: object;
    }

    interface State {
        value: string;
    }

    // eslint-disable-next-line react/prefer-stateless-function
    export default class TimeField extends React.Component<Props, State> {
    }

}
