import React, { CSSProperties } from "react";
import PropTypes from "prop-types";
import "./expander.scss";

interface Props {
    children: JSX.Element;
    maxHeight?: string;
}

interface State {
    open: boolean;
}

export default class Expander extends React.Component<Props, State> {
    public static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]).isRequired,
        maxHeight: PropTypes.string,
    };

    public static defaultProps = {
        maxHeight: "",
    };

    public constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    public onClick(): void {
        const { open } = this.state;
        this.setState({ open: !open });
    }

    public render(): JSX.Element {
        const { children, maxHeight } = this.props;
        const { open } = this.state;

        let triggerClass;
        const style: CSSProperties = {};

        if (open) {
            triggerClass = "open";
            if (maxHeight) {
                style.maxHeight = maxHeight;
            }
        } else {
            triggerClass = "";
        }

        return (
            <div className={`expander ${triggerClass}`}>
                <div className="content" style={style}>
                    {children}
                </div>
                <span className="icon" onClick={this.onClick.bind(this)}>
                    <i className="fas fa-plus" />
                </span>
            </div>
        );
    }
}
