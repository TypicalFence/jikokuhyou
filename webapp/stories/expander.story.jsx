import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
import Expander from "../src/components/expander";

storiesOf("Expander", module)
    .add("default", () => (
        <Expander>
            <h1>Hello World</h1>
        </Expander>
    ));
