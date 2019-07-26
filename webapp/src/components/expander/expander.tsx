import React, { CSSProperties } from "react";
import PropTypes from "prop-types";
import "./expander.scss";
import Icon from "../icon";

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
        let icon: string;
        const style: CSSProperties = {};

        if (open) {
            triggerClass = "open";
            icon = "fa-minus";

            if (maxHeight) {
                style.maxHeight = maxHeight;
            }
        } else {
            triggerClass = "";
            icon = "fa-plus";
        }

        return (
            <div className={`expander ${triggerClass}`}>
                <div className="content" style={style}>
                    {children}
                </div>
                <button type="button" onClick={this.onClick.bind(this)}>
                    <Icon name={icon} />
                </button>
            </div>
        );
    }
}
